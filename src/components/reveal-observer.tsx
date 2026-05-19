'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const REVEAL_SELECTOR =
  '.anim-reveal-up, .anim-reveal-down, .anim-reveal-left, .anim-reveal-right, .anim-reveal-scale';

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let timer: number | null = null;
    let onLoad: (() => void) | null = null;

    const setup = () => {
      if (cancelled) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const supportsIO = typeof IntersectionObserver !== 'undefined';

      const reveal = (el: Element) => {
        el.classList.add('is-revealed');
      };

      const initial = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

      if (reduced || !supportsIO) {
        initial.forEach(reveal);
        return;
      }

      // IntersectionObserver fires once synchronously on observe() with the
      // current state, so elements already in viewport reveal themselves
      // without any manual getBoundingClientRect — and crucially, the
      // callback runs as a microtask AFTER the current render tick, avoiding
      // DOM mutations mid-hydration that cause SSR mismatches.
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -80px 0px', threshold: 0 },
      );

      const seen = new WeakSet<Element>();
      const register = (el: Element) => {
        if (seen.has(el) || el.classList.contains('is-revealed')) return;
        seen.add(el);
        io?.observe(el);
      };

      initial.forEach(register);

      mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
          m.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            if (node.matches(REVEAL_SELECTOR)) register(node);
            node.querySelectorAll(REVEAL_SELECTOR).forEach(register);
          });
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    };

    // Defer to a macrotask so React 19 Streaming SSR has flushed every
    // pending hydration microtask before we touch the DOM.
    const schedule = () => {
      timer = window.setTimeout(setup, 0);
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      onLoad = schedule;
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      cancelled = true;
      if (onLoad) window.removeEventListener('load', onLoad);
      if (timer !== null) clearTimeout(timer);
      io?.disconnect();
      mo?.disconnect();
      // Strip is-revealed before unmount so a subsequent re-hydration (Fast
      // Refresh, viewport-toolbar toggle, etc.) sees a DOM that matches the
      // server-rendered HTML again. Without this the observer-added class
      // persists on elements while the server still renders without it,
      // tripping React's hydration check.
      document
        .querySelectorAll('.is-revealed')
        .forEach((el) => el.classList.remove('is-revealed'));
    };
  }, [pathname]);

  return null;
}
