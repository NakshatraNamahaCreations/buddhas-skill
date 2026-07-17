'use client';

import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Hero.module.css';

const AUTOPLAY_MS = 5000;

// One entry per slide. Edit copy or swap images here — the slider auto-adjusts.
const SLIDES = [
  {
    image: '/images/home-ban.png',
    badge: "Buddha's Skill Academy",
    titleTop: 'Skills that matter.',
    titleAccent: 'Careers that follow.',
    sub:
      "Industry ready training in code, data, and security, built on live projects, real mentorship, and placement support that stays with you until the offer letter is signed.",
    ctaLabel: 'Explore Programs',
    ctaHref: '#programs',
  },
  {
    image: '/images/training.png',
    badge: 'Learn by doing',
    titleTop: 'Live projects.',
    titleAccent: 'Real code.',
    sub:
      'Ship real applications with mentor review before you graduate. Every module ends with a hard problem and a real dataset, not a slide deck.',
    ctaLabel: 'See our programs',
    ctaHref: '#programs',
  },
  {
    image: '/images/abt-img.png',
    badge: 'Placement first',
    titleTop: 'Not just certified.',
    titleAccent: 'Placed.',
    sub:
      "Verified graduates across every program, backed by a placement team that stays on the call with you until the offer letter is signed.",
    ctaLabel: 'View placements',
    ctaHref: '#placements',
  },
];

export default function Hero() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);

  const total = SLIDES.length;
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Auto-advance — always runs (does not pause on hover). Still bows out
  // for users who prefer reduced motion.
  useEffect(() => {
    if (total <= 1) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [total]);

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-label="Buddha's Skill Academy: highlighted programs and outcomes"
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
          aria-hidden={i !== active}
        >
          <img
            className={styles.bg}
            src={s.image}
            alt=""
            aria-hidden="true"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className={styles.overlay} aria-hidden="true" />

          <div className={styles.grid}>
            <div className={styles.copy}>
              <div className={`${styles.learnBadge} ${styles.copyItem}`} style={{ '--delay': '0.1s' }}>
                {s.badge}
              </div>

              <h1 className={`${styles.title} ${styles.copyItem}`} style={{ '--delay': '0.2s' }}>
                <span className={styles.titleInk}>{s.titleTop}</span>
                <span className={styles.titleAccent}>{s.titleAccent}</span>
              </h1>

              <p className={`${styles.sub} ${styles.copyItem}`} style={{ '--delay': '0.35s' }}>
                {s.sub}
              </p>

              <div className={`${styles.coursePill} ${styles.copyItem}`} style={{ '--delay': '0.5s' }}>
                <a href={s.ctaHref}>{s.ctaLabel}</a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slider controls */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={prev}
        aria-label="Previous slide"
      >
        <FiChevronLeft />
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={next}
        aria-label="Next slide"
      >
        <FiChevronRight />
      </button>

      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}`}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
