'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { journey, journeyHeader } from '@/lib/content';
import {
  FiUserPlus,
  FiCode,
  FiLayers,
  FiMessageCircle,
  FiAward,
  FiArrowDownRight,
} from 'react-icons/fi';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './Journey.module.css';

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

// Icons align 1:1 with `journey` items in content.js.
const STEP_ICONS = [FiUserPlus, FiCode, FiLayers, FiMessageCircle, FiAward];

export default function Journey() {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0, x: 0 });
        return;
      }

      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.set(card, { opacity: 0, y: 40, x: fromLeft ? -30 : 30 });
        gsap.to(card, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="journey-title"
      id="journey"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow className={styles.eyebrow}>{journeyHeader.eyebrow}</Eyebrow>
          <h2 id="journey-title" className={styles.title}>
            <TitleWithAccent title={journeyHeader.title} accent={journeyHeader.titleAccent} />
          </h2>
          <p className={styles.lede}>{journeyHeader.lede}</p>
        </header>

        <ol className={styles.ladder}>
          {journey.map((s, i) => {
            const Icon = STEP_ICONS[i] || FiAward;
            const side = i % 2 === 0 ? styles.left : styles.right;
            const isLast = i === journey.length - 1;
            return (
              <li key={s.step} className={`${styles.rung} ${side}`}>
                <article
                  ref={(node) => { cardRefs.current[i] = node; }}
                  className={styles.card}
                  aria-labelledby={`journey-${s.step}-title`}
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
                  <h3 id={`journey-${s.step}-title`} className={styles.cardTitle}>
                    {s.title}
                  </h3>
                  <p className={styles.cardBody}>{s.body}</p>

                  {!isLast && (
                    <span className={styles.arrow} aria-hidden="true">
                      <FiArrowDownRight />
                    </span>
                  )}
                </article>
                {/* <span className={styles.rungNumeral} aria-hidden="true">
                  {s.step}
                </span> */}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
