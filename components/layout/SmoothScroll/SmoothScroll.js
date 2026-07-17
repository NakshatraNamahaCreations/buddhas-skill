'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Skip smooth scroll for users who opt out of motion — native scroll is safer + less compute.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    // Expose the Lenis instance so isolated widgets (e.g. BackToTop) can drive
    // programmatic scrolls through Lenis instead of fighting it via window.scrollTo.
    window.__lenis = lenis;

    // Single RAF loop: hand scroll updates + lenis raf to the GSAP ticker
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const tickerCb = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Refresh once fonts + hero media settle (prevents pin-jump on first paint)
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener('load', refresh);

    // Extra refreshes to catch layout shifts from dynamic-imported sections
    // (TracksLoader, TestimonialsLoader) — their pins expand the flow via a
    // pin-spacer *after* window.load, which can leave earlier triggers with
    // stale positions and make sections appear to be "skipped" over.
    const timers = [
      setTimeout(refresh, 500),
      setTimeout(refresh, 1500),
    ];

    // Recalculate on resize (Lenis handles the scroll math; ST needs positions).
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(tickerCb);
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', onResize);
      timers.forEach(clearTimeout);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return children;
}
