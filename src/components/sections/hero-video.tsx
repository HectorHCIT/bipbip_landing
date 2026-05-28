'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  readonly src: string;
}

type ConnectionInfo = {
  saveData?: boolean;
  effectiveType?: string;
};

type BatteryManager = {
  charging: boolean;
  level: number;
};

type NavigatorWithExtras = Navigator & {
  connection?: ConnectionInfo;
  getBattery?: () => Promise<BatteryManager>;
};

const SLOW_CONNECTIONS = new Set(['slow-2g', '2g', '3g']);
const LOW_BATTERY_THRESHOLD = 0.2;

// Module-level flag: persists across SPA navigations (same JS instance) but
// resets on full page reload. sessionStorage would over-persist and silently
// skip the video on every reload in the same tab.
let hasMountedThisVisit = false;

export function HeroVideo({ src }: HeroVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let cancelled = false;

    const evaluate = async () => {
      // The <video> is only visible on mobile (md:hidden). Skip mounting on
      // desktop so the browser never even fetches the file there — display:none
      // is not a reliable load-blocker across browsers when combined with
      // autoplay.
      if (!window.matchMedia('(max-width: 767px)').matches) return;

      // Users who asked the OS for less motion shouldn't pay for a decorative
      // background video they won't see.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const nav = navigator as NavigatorWithExtras;
      const conn = nav.connection;
      if (conn?.saveData) return;
      if (conn?.effectiveType && SLOW_CONNECTIONS.has(conn.effectiveType)) return;

      // Low battery: don't drain the user further for a decorative loop. Only
      // skip when actively discharging — if plugged in, no harm done.
      if (typeof nav.getBattery === 'function') {
        try {
          const battery = await nav.getBattery();
          if (!battery.charging && battery.level < LOW_BATTERY_THRESHOLD) return;
        } catch {
          // Some browsers throw or return undefined — fall through and load.
        }
      }

      // Already mounted earlier in this visit (e.g. user navigated to
      // /drivers and back to /). Skips a redundant network request from the
      // browser cache without bleeding into reloads.
      if (hasMountedThisVisit) return;

      if (cancelled) return;
      hasMountedThisVisit = true;
      setShouldLoad(true);
    };

    void evaluate();

    return () => {
      cancelled = true;
    };
  }, []);

  // Pause playback when the video is off-screen or the tab is hidden. Doesn't
  // reduce bytes (already downloaded) but stops decode work — meaningful for
  // mobile battery on long pages.
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const safePlay = () => {
      const result = video.play();
      if (result && typeof result.catch === 'function') {
        result.catch(() => {
          // Autoplay can be rejected by the browser when the tab regains
          // focus — swallow it, the next interaction will resume.
        });
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) safePlay();
          else video.pause();
        }
      },
      { threshold: 0 },
    );
    io.observe(video);

    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else safePlay();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover md:hidden"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      {/* Belt-and-suspenders native gate: in browsers that support
          prefers-reduced-data (Chrome), if the user opted in, no source
          matches and the video doesn't load. */}
      <source src={src} type="video/mp4" media="(prefers-reduced-data: no-preference)" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
