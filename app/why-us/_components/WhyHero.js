'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowRight, FiChevronDown, FiCheck } from 'react-icons/fi';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './WhyHero.module.css';

const HERO_STATS = [
  { value: '1200', suffix: '+', label: 'Careers built' },
  { value: '300',  suffix: '+', label: 'Hiring partners' },
  { value: '12',   suffix: '+', label: 'Years of impact' },
];

export default function WhyHero() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = gsap.utils.toArray('[data-fade]', rootRef.current);

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 26 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-labelledby="why-hero-title"
    >
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.blobA} />
        <div className={styles.blobB} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.metaRow} data-fade>
            <Eyebrow tone="ink" className={styles.eyebrow}>
              Made for careers
            </Eyebrow>
            <span className={styles.metaSep} aria-hidden="true" />
          </div>

          <h1 id="why-hero-title" className={styles.title} data-fade>
            Beyond certification, we help you build your dream <em>career.</em>
          </h1>

          <p className={styles.lede} data-fade>
            Every learning experience is built around one purpose: preparing you to earn your next opportunity.
          </p>

          <div className={styles.actions} data-fade>
            <a href="#pillars" className={styles.cta}>
              <span>See how we deliver</span>
              <FiChevronDown aria-hidden="true" />
            </a>
            <a href="#compare" className={styles.link}>
              Compare with typical training
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <ul className={styles.stats} data-fade>
            {HERO_STATS.map((s) => (
              <li key={s.label} className={styles.stat}>
                <div className={styles.statValue}>
                  {s.value}
                  <span>{s.suffix}</span>
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual} data-fade>
          <div className={styles.accent} aria-hidden="true" />
          <div className={styles.imageWrap}>
            <img
              className={styles.mainImg}
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80&auto=format&fit=crop"
              alt="Learners in a live cohort at Buddha's Skill Academy"
              loading="eager"
            />
            <div className={styles.imgOverlay} aria-hidden="true" />
            <div className={styles.floatTag}>
              <span className={styles.floatTagDot} aria-hidden="true" />
              Live cohorts · Corporate mentors
            </div>
          </div>
          <div className={styles.badge} aria-hidden="true">
            <div className={styles.badgeIcon}>
              <FiCheck />
            </div>
            <div className={styles.badgeLabel}>
              Career-first
              <br />
              commitment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
