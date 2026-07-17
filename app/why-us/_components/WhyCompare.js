'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiCheck, FiX } from 'react-icons/fi';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './WhyCompare.module.css';

// Attribute rows for the head-to-head grid.
// buddha  → what Buddha's Skill Academy delivers
// typical → what most training institutes offer
const ROWS = [
  {
    attr: 'Curriculum',
    buddha: 'Industry-curated, updated every cohort',
    typical: 'Static syllabus, textbook-driven',
  },
  {
    attr: 'Trainers',
    buddha: 'Corporate-certified pros with live-project experience',
    typical: 'Freshers or lecturers, few production shipped',
  },
  {
    attr: 'Projects',
    buddha: 'Live builds reviewed by mentors — resume-worthy',
    typical: 'Toy demos & recycled tutorials',
  },
  {
    attr: 'Placement',
    buddha: 'Dedicated support until the offer letter is signed',
    typical: 'Job portal listing, then good luck',
  },
  {
    attr: 'Interviews',
    buddha: '1-on-1 mock interviews + salary-negotiation prep',
    typical: 'Group PDF handouts',
  },
  {
    attr: 'Infrastructure',
    buddha: 'Modern labs, tooling that mirrors real workplaces',
    typical: 'Basic classrooms, aging hardware',
  },
  {
    attr: 'Certification',
    buddha: 'Industry-recognised — accepted by hiring partners',
    typical: 'Generic printed certificate',
  },
];

export default function WhyCompare() {
  const rootRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const rows = gsap.utils.toArray('[data-compare-row]', listRef.current);

      if (reduced) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(rows, { opacity: 0, y: 20 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.05,
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
      id="compare"
      aria-labelledby="why-compare-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>Head-to-head</Eyebrow>
            <h2 id="why-compare-title" className={styles.title}>
              Us vs a <em>typical</em> training institute.
            </h2>
          </div>
          <p className={styles.lede}>
            The gap between a certificate you frame and a career you build.
            Row by row — what most places skip and what we refuse to.
          </p>
        </header>

        <div className={styles.tableWrap}>
          <div className={styles.table} role="table" aria-label="Compare Buddha's Skill Academy vs a typical institute">
            {/* Column headers */}
            <div className={`${styles.row} ${styles.headRow}`} role="row" data-compare-row>
              <div className={`${styles.cell} ${styles.attrCell} ${styles.headCell}`} role="columnheader">
                Attribute
              </div>
              <div className={`${styles.cell} ${styles.headCell} ${styles.headBuddha}`} role="columnheader">
                <span className={styles.headMark} aria-hidden="true">✓</span>
                Buddha&rsquo;s Skill Academy
              </div>
              <div className={`${styles.cell} ${styles.headCell} ${styles.headTypical}`} role="columnheader">
                <span className={styles.headMark} aria-hidden="true">✕</span>
                Typical institute
              </div>
            </div>

            {/* Body rows */}
            <div ref={listRef} className={styles.body}>
              {ROWS.map((row) => (
                <div key={row.attr} className={styles.row} role="row" data-compare-row>
                  <div className={`${styles.cell} ${styles.attrCell}`} role="rowheader">
                    <span className={styles.attrText}>{row.attr}</span>
                  </div>

                  <div className={`${styles.cell} ${styles.buddhaCell}`} role="cell">
                    <span className={styles.markGood} aria-hidden="true">
                      <FiCheck />
                    </span>
                    <span className={styles.cellText}>{row.buddha}</span>
                  </div>

                  <div className={`${styles.cell} ${styles.typicalCell}`} role="cell">
                    <span className={styles.markBad} aria-hidden="true">
                      <FiX />
                    </span>
                    <span className={styles.cellText}>{row.typical}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
