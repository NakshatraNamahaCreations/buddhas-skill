'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowRight } from 'react-icons/fi';
import { aboutPage } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './AboutHero.module.css';

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

const HERO_STATS = [
  { value: '12', suffix: '+', label: 'Years of impact' },
  { value: '1200', suffix: '+', label: 'Careers built' },
  { value: '300', suffix: '+', label: 'Hiring partners' },
];

export default function AboutHero() {
  const rootRef = useRef(null);
  const hero = aboutPage.hero;

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
      aria-labelledby="about-hero-title"
    >
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.blobA} />
        <div className={styles.blobB} />
       
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <Eyebrow tone="ink" className={styles.eyebrow} data-fade>
            {hero.eyebrow}
          </Eyebrow>

          <h1 id="about-hero-title" className={styles.title} data-fade>
            <TitleWithAccent title={hero.title} accent={hero.titleAccent} />
          </h1>

          <p className={styles.lede} data-fade>{hero.lede}</p>

          <div className={styles.actions} data-fade>
            <a href="#story" className={styles.cta}>
              <span>Read our story</span>
              <FiArrowRight aria-hidden="true" />
            </a>
            <a href="/#programs" className={styles.link}>Explore programs →</a>
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
              src={hero.image}
              alt="Learners in a Buddha's Skill Academy cohort"
              loading="eager"
            />
            <div className={styles.imgOverlay} aria-hidden="true" />
            <div className={styles.floatTag}>
              <span className={styles.floatTagDot} aria-hidden="true" />
              {hero.tag}
            </div>
          </div>
          <div className={styles.badge} aria-hidden="true">
            <div className={styles.badgeSince}>Since</div>
            <div className={styles.badgeYear}>2015</div>
          </div>
        </div>
      </div>
    </section>
  );
}
