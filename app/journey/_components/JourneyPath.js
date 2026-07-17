'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  FiUserPlus,
  FiCode,
  FiLayers,
  FiMessageCircle,
  FiAward,
  FiArrowRight,
} from 'react-icons/fi';
import { journey, journeyHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './JourneyPath.module.css';

const STEP_ICONS = [FiUserPlus, FiCode, FiLayers, FiMessageCircle, FiAward];

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

export default function JourneyPath() {
  const rootRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cards = gsap.utils.toArray('[data-step-card]', listRef.current);

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 26 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="path"
      aria-labelledby="journey-path-title"
    >
      <div className={styles.bgDecor} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>
              {journeyHeader.eyebrow}
            </Eyebrow>
            <h2 id="journey-path-title" className={styles.title}>
              <TitleWithAccent
                title={journeyHeader.title}
                accent={journeyHeader.titleAccent}
              />
            </h2>
          </div>
          <p className={styles.lede}>{journeyHeader.lede}</p>
        </header>

        <div className={styles.scroller}>
          <ol ref={listRef} className={styles.grid}>
            <div className={styles.rail} aria-hidden="true" />

            {journey.map((s, i) => {
              const Icon = STEP_ICONS[i] || FiAward;
              const isLast = i === journey.length - 1;
              return (
                <li key={s.step} className={styles.item}>
                  <article
                    className={`${styles.card} ${isLast ? styles.cardActive : ''}`}
                    data-step-card
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.icon} aria-hidden="true">
                        <Icon />
                      </span>
                      <span className={styles.stepPill}>
                        <span className={styles.stepPillLabel}>Step</span>
                        <span className={styles.stepPillNum}>{s.step}</span>
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>{s.title}</h3>
                    <p className={styles.cardBody}>{s.body}</p>

                
                  </article>

                  {!isLast && (
                    <span className={styles.connector} aria-hidden="true">
                      <FiArrowRight />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
