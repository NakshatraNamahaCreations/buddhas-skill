'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowRight, FiChevronDown, FiCompass } from 'react-icons/fi';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './JourneyHero.module.css';

const HERO_META = [
  { label: 'Start',   value: 'First class' },
  { label: 'Middle',  value: 'Live projects' },
  { label: 'Finish',  value: 'Signed offer letter' },
];

export default function JourneyHero() {
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
      aria-labelledby="journey-hero-title"
    >
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.blobA} />
        <div className={styles.blobB} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.metaRow} data-fade>
            <Eyebrow tone="ink" className={styles.eyebrow}>The path</Eyebrow>
            <span className={styles.metaSep} aria-hidden="true" />
          </div>

          <h1 id="journey-hero-title" className={styles.title} data-fade>
            From your first class
            to your first <em>offer letter.</em>
          </h1>

          <p className={styles.lede} data-fade>
            A focused, step by step journey every phase mapped, every week
            accounted for. You know exactly where you are, what you&rsquo;re
            building, and what the next milestone looks like.
          </p>

          <div className={styles.actions} data-fade>
            <a href="#path" className={styles.cta}>
              <span>See the path</span>
              <FiChevronDown aria-hidden="true" />
            </a>
            <a href="#phases" className={styles.link}>
              See the weekly breakdown
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <ul className={styles.metaList} data-fade>
            {HERO_META.map((m, i) => (
              <li key={m.label} className={styles.metaItem}>
                <div className={styles.metaLabel}>{m.label}</div>
                <div className={styles.metaValue}>{m.value}</div>
                {i < HERO_META.length - 1 && (
                  <span className={styles.metaChev} aria-hidden="true">
                    <FiArrowRight />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual} data-fade>
          <div className={styles.accent} aria-hidden="true" />
          <div className={styles.imageWrap}>
            <img
              className={styles.mainImg}
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80&auto=format&fit=crop"
              alt="A learner working through the Buddha's Skill Academy journey"
              loading="eager"
            />
            <div className={styles.imgOverlay} aria-hidden="true" />
            <div className={styles.floatTag}>
              <span className={styles.floatTagDot} aria-hidden="true" />
              Every step, every week mapped
            </div>
          </div>
          <div className={styles.badge} aria-hidden="true">
            <div className={styles.badgeIcon}>
              <FiCompass />
            </div>
            <div className={styles.badgeLabel}>
              A guided
              <br />
              path
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
