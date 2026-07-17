'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './WhyProof.module.css';

const PROOF = [
  { value: '1600', suffix: '+', label: 'Corporate tie-ups' },
  { value: '373',  suffix: '+', label: 'Hiring companies' },
  { value: '1314', suffix: '+', label: 'Candidates placed[in past 6 months]' },
  { value: '410',  suffix: '+', label: 'Placement drives' },
  { value: '150',  suffix: '+', label: '8+ LPA offers' },
];

export default function WhyProof() {
  const rootRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const items = gsap.utils.toArray('[data-proof-item]', listRef.current);

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 22 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
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
      aria-labelledby="why-proof-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow tone="ink" className={styles.eyebrow}>Proof · Not promises</Eyebrow>
          <h2 id="why-proof-title" className={styles.title}>
            Real outcomes. <em>On the record.</em>
          </h2>
        </header>

        <ul ref={listRef} className={styles.grid}>
          {PROOF.map((p, i) => (
            <li key={p.label} className={styles.item} data-proof-item>
              <div className={styles.itemIndex}>{String(i + 1).padStart(2, '0')}</div>
              <div className={styles.itemValue}>
                {p.value}
                <span>{p.suffix}</span>
              </div>
              <div className={styles.itemLabel}>{p.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
