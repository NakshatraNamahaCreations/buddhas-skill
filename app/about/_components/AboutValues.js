'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiTool, FiUsers, FiTrendingUp, FiZap, FiArrowUpRight } from 'react-icons/fi';
import { aboutPage } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './AboutValues.module.css';

const VALUE_ICONS = {
  craft: FiTool,
  community: FiUsers,
  careers: FiTrendingUp,
  excellence: FiZap,
};

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

export default function AboutValues() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const { valuesHeader, values } = aboutPage;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cards = gsap.utils.toArray('[data-value-card]', gridRef.current);

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 28 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.1,
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
      aria-labelledby="about-values-title"
    >
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.blob} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>
              {valuesHeader.eyebrow}
            </Eyebrow>
            <h2 id="about-values-title" className={styles.title}>
              <TitleWithAccent title={valuesHeader.title} accent={valuesHeader.titleAccent} />
            </h2>
          </div>
          <p className={styles.lede}>{valuesHeader.lede}</p>
        </header>

        <ul ref={gridRef} className={styles.grid}>
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[v.key] || FiTool;
            const featured = i === 0;
            const num = String(i + 1).padStart(2, '0');
            return (
              <li
                key={v.key}
                className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
                data-value-card
              >
                {/* <div className={styles.bigNum} aria-hidden="true">{num}</div> */}

                <div className={styles.cardHead}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon />
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.label}>{v.label}</h3>
                  <p className={styles.body}>{v.body}</p>
                </div>

              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
