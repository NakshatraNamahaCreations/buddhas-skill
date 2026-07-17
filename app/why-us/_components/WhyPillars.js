'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  FiBookOpen,
  FiUsers,
  FiCode,
  FiBriefcase,
  FiMessageCircle,
  FiMapPin,
  FiAward,
  FiArrowUpRight,
} from 'react-icons/fi';
import { whyChoose, whyChooseHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './WhyPillars.module.css';

const PILL_ICONS = [
  FiBookOpen,
  FiUsers,
  FiCode,
  FiBriefcase,
  FiMessageCircle,
  FiMapPin,
  FiAward,
];

function TitleWithAccent({ title, accent = 'outcomes.' }) {
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

export default function WhyPillars() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cards = gsap.utils.toArray('[data-pillar]', gridRef.current);

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 28 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: gridRef.current,
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
      id="pillars"
      aria-labelledby="why-pillars-title"
    >
      <div className={styles.bgDecor} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>
              {whyChooseHeader.eyebrow}
            </Eyebrow>
            <h2 id="why-pillars-title" className={styles.title}>
              <TitleWithAccent title={whyChooseHeader.title} accent="outcomes." />
            </h2>
          </div>
          <p className={styles.lede}>{whyChooseHeader.lede}</p>
        </header>

        <ul ref={gridRef} className={styles.grid}>
          {whyChoose.map((p, i) => {
            const Icon = PILL_ICONS[i] || FiAward;
            // Featured pillar (index 0) spans wider on desktop and uses
            // the crimson-filled treatment.
            const featured = i === 0;
            return (
              <li
                key={p.index}
                className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
                data-pillar
              >
                <div className={styles.cardHead}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon />
                  </span>
                  <span className={styles.step}>
                    {p.index}
                    <span className={styles.stepOf}>/ 07</span>
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardCopy}>{p.body}</p>
                </div>

                <div className={styles.cardFoot}>
                  <span className={styles.rule} aria-hidden="true" />
                  <span className={styles.footTag}>
                    Pillar {p.index}
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
