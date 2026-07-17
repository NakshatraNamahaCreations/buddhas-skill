'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowUpRight, FiCode, FiTerminal, FiBarChart2, FiShield, FiCheckSquare } from 'react-icons/fi';
import { tracks } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './ProgramsCatalog.module.css';

const PROGRAM_ICONS = {
  'java-fullstack':   FiCode,
  'python-fullstack': FiTerminal,
  'data-science-ai':  FiBarChart2,
  'cyber-security':   FiShield,
  'software-testing': FiCheckSquare,
};

export default function ProgramsCatalog() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const items = gsap.utils.toArray('[data-catalog-card]', gridRef.current);

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 28 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
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
      id="catalog"
      aria-labelledby="catalog-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>The catalog</Eyebrow>
            <h2 id="catalog-title" className={styles.title}>
              Five programs. <em>Five paths.</em>
            </h2>
          </div>
          <p className={styles.lede}>
            Browse the programs below. Click any one to see the full syllabus,
            job roles it prepares you for, and program details.
          </p>
        </header>

        <ol ref={gridRef} className={styles.grid}>
          {tracks.map((t, i) => {
            const Icon = PROGRAM_ICONS[t.id] || FiCode;
            return (
              <li key={t.id} data-catalog-card>
                <a href={`#program-${t.id}`} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.iconWrap} aria-hidden="true">
                      <Icon />
                    </span>
                    <span className={styles.index}>
                      {t.index}
                      <span className={styles.indexOf}>/ 0{tracks.length}</span>
                    </span>
                  </div>

                  <div className={styles.badge}>{t.badge}</div>

                  <h3 className={styles.cardTitle}>{t.title}</h3>

                  <ul className={styles.specs}>
                    {t.stats.slice(0, 2).map((s, si) => (
                      <li key={si} className={styles.spec}>
                        <span className={styles.specValue}>{s.value}</span>
                        <span className={styles.specLabel}>{s.label}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.cardFoot}>
                    <span>Read more</span>
                    <span className={styles.arrow} aria-hidden="true">
                      <FiArrowUpRight />
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
