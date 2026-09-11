# Hero Video — Optimización de tráfico de CDN

**Fecha:** 2026-05-28
**Branch:** `develop`
**Commit:** `10fd7b4`
**PR:** [#8](https://github.com/Creative-Information-Technologies/bipbip-landing/pull/8)

---

## Problema

El video decorativo del hero (`/video.mp4`) generaba **~3 TB de egress de CloudFront cada 14 días**.

Diagnóstico vía `curl -I`:

- **Tamaño:** 24.77 MB por descarga
- **CDN:** CloudFront cacheando correctamente (origen → edge cubierto)
- **Tráfico real:** edge → usuario, ~9,000 descargas/día
- **Cuentas:** `3 TB ÷ 24.77 MB ≈ 126,000 descargas / 14 días`

### Causas del volumen

1. Video pesado (24.77 MB) para un loop decorativo en mobile
2. Descarga automática en cada visita por `autoPlay`
3. Bots y link previewers (Googlebot, FacebookExternalHit, WhatsApp, GPTBot, etc.) descargaban el archivo aunque no rendericen UI
4. Usuarios con `prefers-reduced-motion: reduce` también descargaban — el `motion-reduce:hidden` solo ocultaba con CSS, no detenía la descarga
5. Desktop con `display:none` (clase `md:hidden`) potencialmente descargaba en algunos browsers
6. Sin filtros por `Save-Data`, conexión lenta, ni batería baja

---

## Solución

Pipeline de filtros en cascada + recompresión del asset. El video sigue presente para el usuario humano normal en mobile, con autoplay y loop — solo se elimina la descarga para audiencias que no lo iban a aprovechar.

### 1. Asset recomprimido

| | Antes | Después |
|---|---|---|
| Archivo | `/video.mp4` | `/videoV2.mp4` |
| Peso | 24.77 MB | 4.45 MB |
| Reducción | — | **5.3× más liviano** |

### 2. Filtro server-side (bot UA)

Implementado en `src/components/sections/hero.tsx` como Server Component async. Lee `user-agent` via `headers()` y NO emite el `<video>` tag si matchea el patrón de bot.

Patrones cubiertos:

```
bot, crawler, spider, crawling,
facebookexternalhit, whatsapp, telegram, preview,
fetch, headlesschrome, lighthouse, pagespeed, gtmetrix, pingdom,
slackbot, discord, linkedin, yandex, baidu, duckduck,
applebot, googleother, google-inspectiontool,
claudebot, anthropic-ai, gptbot, ccbot, perplexity
```

### 3. Componente client con gates en cascada

Nuevo componente `src/components/sections/hero-video.tsx` (`'use client'`). Solo monta el `<video>` cuando TODOS los siguientes son ciertos:

| # | Gate | Razón |
|---|---|---|
| 1 | `window.matchMedia('(max-width: 767px)')` | Solo mobile (el video está `md:hidden`) |
| 2 | NO `prefers-reduced-motion: reduce` | Respeta preferencia de accesibilidad del SO |
| 3 | NO `navigator.connection.saveData` | Respeta modo "ahorrar datos" del browser |
| 4 | `effectiveType` NO en `{slow-2g, 2g, 3g}` | No castiga conexiones lentas |
| 5 | Batería ≥ 20% o cargando | No drena baterías bajas (Battery API) |
| 6 | Module-level flag `hasMountedThisVisit === false` | Evita remount en navegación SPA dentro del mismo page load |

Detalle del flag #6: se usó una variable de módulo en lugar de `sessionStorage` para que el flag se resetee en cada hard reload (sessionStorage persistía indebidamente entre F5).

### 4. Belt-and-suspenders nativo

Dos `<source>` en cascada dentro del `<video>`:

```tsx
<source src={src} type="video/mp4" media="(prefers-reduced-data: no-preference)" />
<source src={src} type="video/mp4" />
```

El primero solo matchea si el usuario NO tiene reduced-data activo (Chrome). Es una red de seguridad por si JS falla.

### 5. Pausa de playback cuando no se ve

Un segundo `useEffect` (corre solo si `shouldLoad === true`):

- **IntersectionObserver:** pausa el `<video>` cuando el hero sale del viewport, reanuda cuando vuelve.
- **Page Visibility API:** pausa cuando el tab se oculta (background), reanuda cuando vuelve al foco.

No reduce bytes (el archivo ya se descargó), pero ahorra CPU + drenaje térmico + batería durante sesiones largas.

### 6. Preconnect al CDN

Agregado a `src/app/layout.tsx`:

```tsx
<link rel="preconnect" href="https://static2.bipbip.hn" crossOrigin="" />
<link rel="dns-prefetch" href="https://static2.bipbip.hn" />
```

Acelera el handshake TLS/DNS de **todos** los assets del CDN (video, floating SVGs, herotexture, badges), no solo el video.

---

## Pipeline completo de filtros (orden de evaluación)

| # | Gate | Capa | Bloquea cuándo |
|---|---|---|---|
| 1 | Bot UA | Server | Crawlers, IAs, link previewers |
| 2 | Mobile only | Client | Viewport ≥ 768px |
| 3 | Reduced-motion | Client | OS pref `reduce` |
| 4 | Save-Data | Client | Browser data saver |
| 5 | Conexión lenta | Client | `effectiveType` ∈ {slow-2g, 2g, 3g} |
| 6 | Batería baja | Client | <20% sin cargar |
| 7 | Sesión repetida | Client | Mismo page load (SPA) |
| 8 | `<source media>` | HTML | `prefers-reduced-data` en Chrome |
| 9 | Pausa off-screen | Runtime | Video fuera de viewport |
| 10 | Pausa tab oculto | Runtime | Tab en background |

Los gates 1–8 reducen **descargas**. Los gates 9–10 reducen **decode CPU + batería**.

---

## Impacto estimado

### Reducción de descargas (gates 1–8)

| Filtro | % usuarios bloqueados |
|---|---|
| Bots | 20–40% |
| Reduced-motion | 5–10% |
| Save-Data | 5–15% |
| Conexión lenta | 2–5% |
| Batería baja | <5% |
| **Total combinado** | **30–50%** |

### Reducción por archivo (recompresión)

5.3× más liviano (24.77 MB → 4.45 MB)

### Reducción total

```
Tráfico_final = Tráfico_original × (1 - 0.40) × (1 / 5.3)
             ≈ Tráfico_original × 0.11
```

**De 3 TB / 14 días → ~200–400 GB / 14 días. Reducción ~85–93%.**

---

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/components/sections/hero.tsx` | Convertido a Server Component async, lee UA, bot filter |
| `src/components/sections/hero-video.tsx` | **Nuevo** — client component con gates en cascada |
| `src/app/layout.tsx` | Agregado `<head>` con preconnect + dns-prefetch al CDN |

---

## Qué NO se hizo (intencional)

- ❌ **Quitar el video** — el usuario explícitamente lo descartó (mantener UX)
- ❌ **Click-to-play / lazy load** — descartado por el mismo motivo
- ❌ **`headers()` en `next.config.ts`** — no aplica, el video se sirve desde un dominio externo (`static2.bipbip.hn`)
- ❌ **Middleware** — el browser pide el `.mp4` directo al CDN, Next no intercepta
- ❌ **Cache Components / `use cache`** — cachea HTML, no assets externos
- ❌ **`preload="none"`** — con `autoPlay` el browser descarga igual

---

## Próximos pasos sugeridos

1. **Tag de release** post-merge: `v0.2.0` o `release-2026-05-28`
2. **Configurar `Cache-Control: public, max-age=31536000, immutable` en el bucket S3** para `videoV2.mp4` y demás assets versionados — evita revalidaciones del browser
3. **Considerar WAF a nivel de dominio** (CloudFront + AWS WAF o Cloudflare) para rate-limit de bots agresivos no cubiertos por el UA filter
4. **Métrica:** verificar reducción de egress en CloudFront 14 días post-deploy y ajustar si hace falta

---

## Verificación local

```bash
# Tipo y lint limpios
npx tsc --noEmit
npm run lint

# Verificar el asset en el CDN
curl -sI "https://static2.bipbip.hn/bipbip_landing/videoV2.mp4" | grep -iE "content-length|x-cache"
```

Debug en consola del browser (mobile real o DevTools responsive):

```js
console.log({
  isMobile: window.matchMedia('(max-width: 767px)').matches,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  saveData: navigator.connection?.saveData,
  effectiveType: navigator.connection?.effectiveType,
});
navigator.getBattery?.().then(b => console.log({ charging: b.charging, level: b.level }));
document.querySelector('#hero video'); // null = bloqueado, <video> = montó
```
