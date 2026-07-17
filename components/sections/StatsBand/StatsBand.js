'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiGlobe, FiBriefcase, FiUsers, FiCalendar, FiAward } from 'react-icons/fi';
import { stats, statsHeader } from '@/lib/content';
import CountUp from '@/components/ui/CountUp';
import styles from './StatsBand.module.css';

// Icons mapped by index to `stats` in lib/content.js:
//   0 → Corporate Tie-Ups   (globe / network)
//   1 → Hiring Companies    (briefcase)
//   2 → Candidates Placed   (users)
//   3 → Placement Drives    (calendar)
//   4 → 8+ LPA Offers       (award / trophy)
const STAT_ICONS = [FiGlobe, FiBriefcase, FiUsers, FiCalendar, FiAward];

export default function StatsBand() {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const countRefs = useRef([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const items = itemRefs.current.filter(Boolean);
      const counters = countRefs.current.filter(Boolean);

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        counters.forEach((c) => c?.setProgress(1));
        return;
      }

      // Simple on-mount entrance: cells fade up in stagger and the
      // count-up numbers tween 0 → 1 once. No scroll trigger involved.
      gsap.set(items, { opacity: 0, y: 28 });
      counters.forEach((c) => c?.setProgress(0));

      const progress = { p: 0 };

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
        }, 0)
        .to(progress, {
          p: 1,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            counters.forEach((c) => c?.setProgress(progress.p));
          },
        }, 0.15);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-label={statsHeader.title || 'Placement outcomes by the numbers'}
    >
      <div className={styles.aura} aria-hidden="true" />

      <div className={styles.grid}>
        {stats.map((s, i) => {
          const Icon = STAT_ICONS[i] || FiAward;
          return (
            <div
              key={s.label}
              className={styles.item}
              ref={(node) => { itemRefs.current[i] = node; }}
            >
              <span className={styles.iconBadge} aria-hidden="true">
                <Icon />
              </span>
              <div className={styles.number}>
                <CountUp
                  ref={(node) => { countRefs.current[i] = node; }}
                  value={s.value}
                  className={styles.numberValue}
                />
                <span className={styles.numberSuffix}>{s.suffix}</span>
              </div>
              <div className={styles.label}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
