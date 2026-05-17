'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const REVEAL_SELECTOR =
  '.anim-reveal-up, .anim-reveal-down, .anim-reveal-left, .anim-reveal-right, .anim-reveal-scale';

function isInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight + 80 && rect.bottom > -80;
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
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
        if (isInViewport(el)) {
          reveal(el);
        } else {
          io?.observe(el);
        }
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

    if (document.readyState === 'complete') {
      const raf = requestAnimationFrame(setup);
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        io?.disconnect();
        mo?.disconnect();
      };
    }

    onLoad = setup;
    window.addEventListener('load', onLoad, { once: true });

    return () => {
      cancelled = true;
      if (onLoad) window.removeEventListener('load', onLoad);
      io?.disconnect();
      mo?.disconnect();
    };
  }, [pathname]);

  return null;
}
