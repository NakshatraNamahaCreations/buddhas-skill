'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiCheck, FiCode, FiTerminal, FiBarChart2, FiShield, FiCheckSquare } from 'react-icons/fi';
import { tracks } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './ProgramsCompare.module.css';

const PROGRAM_ICONS = {
  'java-fullstack':   FiCode,
  'python-fullstack': FiTerminal,
  'data-science-ai':  FiBarChart2,
  'cyber-security':   FiShield,
  'software-testing': FiCheckSquare,
};

// Rows for the compare grid. Each function receives the program and
// returns the cell contents (string or React node).
const ROWS = [
  { label: 'Duration',       get: (p) => p.stats.find((s) => s.label === 'Duration')?.value || '—' },
  { label: 'Focus',          get: (p) => p.badge },
  { label: 'Hands-on',       get: (p) => p.stats[1] ? `${p.stats[1].value} ${p.stats[1].label}` : '—' },
  { label: 'Modules',        get: (p) => `${p.learn.length}` },
  { label: 'Career roles',   get: (p) => `${p.careers.length}` },
  { label: 'Mentorship',     get: () => '1-on-1' },
  { label: 'Placement help', get: () => 'Until offer' },
  { label: 'Certification',  get: () => 'Industry-recognised' },
];

export default function ProgramsCompare() {
  const rootRef = useRef(null);
  const [hoveredCol, setHoveredCol] = useState(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const rows = gsap.utils.toArray('[data-compare-row]', rootRef.current);

      if (reduced) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(rows, { opacity: 0, y: 20 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
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
      aria-labelledby="compare-title"
    >
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>Compare · Side by side</Eyebrow>
            <h2 id="compare-title" className={styles.title}>
              Five programs. <em>One table.</em>
            </h2>
          </div>
          <p className={styles.lede}>
            The signals hiring managers actually check — laid out cleanly so you
            can pick the program that fits your goal.
          </p>
        </header>

        <div className={styles.tableWrap}>
          <div
            className={styles.table}
            role="table"
            aria-label="Compare programs"
            style={{ '--cols': tracks.length }}
          >
            {/* Column headers */}
            <div className={styles.headRow} role="row" data-compare-row>
              <div className={`${styles.cell} ${styles.rowLabel} ${styles.headCell}`} role="columnheader">
                <span className={styles.rowLabelText}>Attribute</span>
              </div>
              {tracks.map((t, i) => {
                const Icon = PROGRAM_ICONS[t.id];
                return (
                  <a
                    key={t.id}
                    href={`#program-${t.id}`}
                    role="columnheader"
                    className={`${styles.cell} ${styles.headCell} ${styles.headProgram} ${hoveredCol === i ? styles.colHover : ''}`}
                    onMouseEnter={() => setHoveredCol(i)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    <span className={styles.progIcon} aria-hidden="true">
                      {Icon ? <Icon /> : null}
                    </span>
                    <div>
                      <div className={styles.progIndex}>{t.index}</div>
                      <div className={styles.progName}>{t.title}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Data rows */}
            {ROWS.map((row) => (
              <div key={row.label} className={styles.row} role="row" data-compare-row>
                <div className={`${styles.cell} ${styles.rowLabel}`} role="rowheader">
                  <span className={styles.rowLabelText}>{row.label}</span>
                </div>
                {tracks.map((t, i) => (
                  <div
                    key={t.id}
                    role="cell"
                    className={`${styles.cell} ${styles.dataCell} ${hoveredCol === i ? styles.colHover : ''}`}
                    onMouseEnter={() => setHoveredCol(i)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    <span className={styles.cellValue}>{row.get(t)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
