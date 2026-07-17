'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import {
  FiGlobe,
  FiBriefcase,
  FiUsers,
  FiCalendar,
  FiAward,
  FiCheckCircle,
} from 'react-icons/fi';
import CountUp from '@/components/ui/CountUp';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './Placements.module.css';

/*
 * All five placement numbers from the 04/07/26 briefing note.
 * Split into three groups so the bento layout can treat each tier
 * with a different visual weight:
 *   - HERO: the flagship 1200+ Candidates Placed
 *   - MID:  the three volume metrics
 *   - BANNER: the "8+ LPA" achievement stat, given its own strip
 */
const HERO_STAT = {
  value: 1200,
  suffix: '+',
  label: 'Candidates Placed',
  Icon: FiUsers,
  body: 'Verified placements across every program. Offer letters on file.',
};

const MID_STATS = [
  {
    value: 1600,
    suffix: '+',
    label: 'Corporate Tie-Ups',
    Icon: FiGlobe,
    body: 'Companies in our active hiring network.',
  },
  {
    value: 300,
    suffix: '+',
    label: 'Hiring Companies',
    Icon: FiBriefcase,
    body: 'Partners hiring our graduates directly.',
  },
  {
    value: 400,
    suffix: '+',
    label: 'Placement Drives',
    Icon: FiCalendar,
    body: 'On-campus interview drives every year.',
  },
];

const BANNER_STAT = {
  value: 200,
  suffix: '+',
  label: '8+ LPA Offers',
  Icon: FiAward,
  body: 'Premium package offers earned per annum by our top learners.',
};

export default function Placements() {
  const rootRef = useRef(null);
  const heroCountRef = useRef(null);
  const bannerCountRef = useRef(null);
  const midCountRefs = useRef([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cells = gsap.utils.toArray('[data-place-cell]', rootRef.current);

      if (reduced) {
        heroCountRef.current?.setProgress(1);
        bannerCountRef.current?.setProgress(1);
        midCountRefs.current.forEach((c) => c?.setProgress(1));
        gsap.set(cells, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cells, { opacity: 0, y: 32 });
      gsap.to(cells, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.10,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Scroll-scrubbed count-up across the whole section
      heroCountRef.current?.setProgress(0);
      bannerCountRef.current?.setProgress(0);
      midCountRefs.current.forEach((c) => c?.setProgress(0));

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 85%',
        end: 'top 25%',
        scrub: 0.4,
        onUpdate: (self) => {
          heroCountRef.current?.setProgress(self.progress);
          bannerCountRef.current?.setProgress(self.progress);
          midCountRefs.current.forEach((c) => c?.setProgress(self.progress));
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="placements"
      aria-labelledby="placements-title"
    >
      <div className={styles.aura} aria-hidden="true" />
      <div className={styles.dots} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ---------- Header ---------- */}
        <header className={styles.header}>
          <div className={styles.headerCopy}>
            <Eyebrow tone="ink" className={styles.eyebrow}>Placements</Eyebrow>
            <h2 id="placements-title" className={styles.title}>
              Placements, <em>on the record.</em>
            </h2>
            <p className={styles.lede}>
              The only metric that matters is where our learners get hired. Every
              number below is backed by a signed offer letter.
            </p>
          </div>
         
        </header>

        {/* ---------- Bento grid ---------- */}
        <div className={styles.bento}>
          {/* HERO — spans the left half, full height */}
          <article
            className={`${styles.cell} ${styles.hero}`}
            data-place-cell
            aria-labelledby="placements-hero-label"
          >
            <div className={styles.heroBloom} aria-hidden="true" />
            <div className={styles.heroGrid} aria-hidden="true" />

            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} aria-hidden="true" />
              Flagship metric
            </div>

            <div className={styles.heroValue}>
              <CountUp
                ref={heroCountRef}
                value={HERO_STAT.value}
                className={styles.heroNumber}
              />
              <span className={styles.heroSuffix}>{HERO_STAT.suffix}</span>
            </div>

            <div id="placements-hero-label" className={styles.heroLabel}>
              {HERO_STAT.label}
            </div>
            <p className={styles.heroBody}>{HERO_STAT.body}</p>

            <div className={styles.heroFooter}>
              <div className={styles.heroFooterItem}>
                <div className={styles.heroFooterValue}>5</div>
                <div className={styles.heroFooterLabel}>Programs</div>
              </div>
              <span className={styles.heroFooterDivider} aria-hidden="true" />
              <div className={styles.heroFooterItem}>
                <div className={styles.heroFooterValue}>100%</div>
                <div className={styles.heroFooterLabel}>Verified</div>
              </div>
              <span className={styles.heroFooterDivider} aria-hidden="true" />
              <div className={styles.heroFooterItem}>
                <div className={styles.heroFooterValue}>10+</div>
                <div className={styles.heroFooterLabel}>Years</div>
              </div>
            </div>
          </article>

          {/* MID column — three stacked cards on the right */}
          <div className={styles.midColumn}>
            {MID_STATS.map((s, i) => (
              <article
                key={s.label}
                className={`${styles.cell} ${styles.midCard}`}
                data-place-cell
              >
                <div className={styles.midIcon} aria-hidden="true">
                  <s.Icon />
                </div>
                <div className={styles.midBody}>
                  <div className={styles.midValue}>
                    <CountUp
                      ref={(node) => { midCountRefs.current[i] = node; }}
                      value={s.value}
                      className={styles.midNumber}
                    />
                    <span className={styles.midSuffix}>{s.suffix}</span>
                  </div>
                  <div className={styles.midLabel}>{s.label}</div>
                  <p className={styles.midCopy}>{s.body}</p>
                </div>
              </article>
            ))}
          </div>

          {/* BANNER — full-width crimson strip highlighting the 8+ LPA stat */}
          <article
            className={`${styles.cell} ${styles.banner}`}
            data-place-cell
            aria-labelledby="placements-banner-label"
          >
            <div className={styles.bannerBloom} aria-hidden="true" />

            <div className={styles.bannerLeft}>
              <div className={styles.bannerIcon} aria-hidden="true">
                <BANNER_STAT.Icon />
              </div>
              <div>
                <div id="placements-banner-label" className={styles.bannerLabel}>
                  {BANNER_STAT.label}
                </div>
                <p className={styles.bannerBody}>{BANNER_STAT.body}</p>
              </div>
            </div>

            <div className={styles.bannerValue}>
              <CountUp
                ref={bannerCountRef}
                value={BANNER_STAT.value}
                className={styles.bannerNumber}
              />
              <span className={styles.bannerSuffix}>{BANNER_STAT.suffix}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
