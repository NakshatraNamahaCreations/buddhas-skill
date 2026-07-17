'use client';

import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonials, testimonialsHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './Testimonials.module.css';

const AUTOPLAY_MS = 6500;

export default function Testimonials() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Auto-advance carousel unless user is hovering the slider region.
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="stories"
      aria-labelledby="testimonials-title"
    >
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.left}>
          <Eyebrow className={styles.eyebrow}>{testimonialsHeader.eyebrow}</Eyebrow>
          <h2 id="testimonials-title" className={styles.title}>
            {testimonialsHeader.title}
          </h2>
          <p className={styles.lede}>{testimonialsHeader.lede}</p>

          <div className={styles.highlight} aria-label="200 plus candidates placed at 8 LPA and above">
            <div className={styles.highlightBar} aria-hidden="true" />
            <div className={styles.highlightBody}>
              <div className={styles.highlightRow}>
                <span className={styles.highlightValue}>200+</span>
                <span className={styles.highlightSuffix}>at 8+ LPA</span>
              </div>
              <div className={styles.highlightLabel}>
                Candidates placed per annum
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={next}
              aria-label="Next testimonial"
            >
              <FiChevronRight />
            </button>
            <div className={styles.counter} aria-live="polite">
              <span className={styles.counterCurrent}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>
                {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        <div
          className={styles.slider}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className={styles.trackList}
            style={{ transform: `translateX(-${active * 100}%)` }}
            aria-live="polite"
          >
            {testimonials.map((t, i) => (
              <article
                key={i}
                className={styles.slide}
                aria-hidden={i !== active}
                aria-labelledby={`testimonial-${i}-name`}
              >
                <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
                <blockquote className={styles.quote}>{t.quote}</blockquote>
                <footer className={styles.attr}>
                  <div className={styles.attrText}>
                    <div className={styles.name} id={`testimonial-${i}-name`}>
                      {t.name}
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.track}>{t.track}</span>
                      <span className={styles.metaDot} aria-hidden="true">·</span>
                      <span className={styles.company}>{t.company}</span>
                    </div>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
