'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { placedStudents, placedStudentsHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './PlacedStudents.module.css';

const AUTO_ADVANCE_MS = 3000;

function TitleWithAccent({ title, accent }) {
  if (!accent || !title.includes(accent)) return title;
  const [before, after] = title.split(accent);
  return (
    <>
      {before}
      <em>{accent}</em>
      {after}
    </>
  );
}

export default function PlacedStudents() {
  const { eyebrow, title, titleAccent, lede } = placedStudentsHeader;
  const total = placedStudents.length;

  const [active, setActive] = useState(0);
  const hoveredRef = useRef(false);

  // Signed shortest distance from `i` to `active` on a wrapped ring.
  // Returns e.g. -2, -1, 0, 1, 2 — used both for stacking and rendering.
  const offsetFor = useCallback(
    (i) => {
      let d = i - active;
      if (d > total / 2) d -= total;
      if (d < -total / 2) d += total;
      return d;
    },
    [active, total]
  );

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  );

  // Auto-advance, paused when the stage is hovered/focused.
  useEffect(() => {
    if (total < 2) return;
    const id = setInterval(() => {
      if (!hoveredRef.current) next();
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [next, total]);

  return (
    <section
      className={styles.section}
      aria-labelledby="placed-students-title"
    >
      <header className={styles.header}>
        <Eyebrow tone="ink" className={styles.eyebrow}>{eyebrow}</Eyebrow>
        <h2 id="placed-students-title" className={styles.title}>
          <TitleWithAccent title={title} accent={titleAccent} />
        </h2>
        {lede && <p className={styles.lede}>{lede}</p>}
      </header>

      <div
        className={styles.carousel}
        onMouseEnter={() => (hoveredRef.current = true)}
        onMouseLeave={() => (hoveredRef.current = false)}
        onFocus={() => (hoveredRef.current = true)}
        onBlur={() => (hoveredRef.current = false)}
      >
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={prev}
          aria-label="Previous student"
        >
          <FiChevronLeft />
        </button>

        <div className={styles.stage} aria-roledescription="carousel">
          {placedStudents.map((src, i) => {
            const offset = offsetFor(i);
            const abs = Math.abs(offset);
            // Only render the active card + one on each side; the rest sit
            // hidden so DOM stays small and transitions stay crisp.
            if (abs > 1) return null;
            return (
              <button
                type="button"
                key={i}
                className={styles.slide}
                data-position={offset}
                aria-hidden={offset !== 0}
                aria-label={
                  offset === 0
                    ? `Placed student ${i + 1} of ${total}`
                    : `Show placed student ${i + 1}`
                }
                tabIndex={offset === 0 ? 0 : -1}
                onClick={() => setActive(i)}
              >
                <img
                  className={styles.photo}
                  src={encodeURI(src)}
                  alt={`Placed student ${i + 1}`}
                  loading="lazy"
                  draggable="false"
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={next}
          aria-label="Next student"
        >
          <FiChevronRight />
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Choose a student">
        {placedStudents.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to student ${i + 1}`}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
