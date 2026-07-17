'use client';

import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import styles from './BackToTop.module.css';

// Fixed-position pill that appears once the user has scrolled past ~40% of the
// viewport, and scrolls back to the top using the shared Lenis instance when
// present (so the motion matches the rest of the page).
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = () => window.innerHeight * 0.4;
    const onScroll = () => setVisible(window.scrollY > threshold());
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <FiArrowUp aria-hidden="true" />
    </button>
  );
}
