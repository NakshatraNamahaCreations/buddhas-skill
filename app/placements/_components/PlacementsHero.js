'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowRight } from 'react-icons/fi';
import { placementsPage } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './PlacementsHero.module.css';

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

export default function PlacementsHero() {
  const rootRef = useRef(null);
  const hero = placementsPage.hero;

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
      aria-labelledby="placements-hero-title"
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

          <h1 id="placements-hero-title" className={styles.title} data-fade>
            <TitleWithAccent title={hero.title} accent={hero.titleAccent} />
          </h1>

          <p className={styles.lede} data-fade>{hero.lede}</p>

          <div className={styles.actions} data-fade>
            <a href="#placements" className={styles.cta}>
              <span>See the numbers</span>
              <FiArrowRight aria-hidden="true" />
            </a>
            <a href="#lifecycle" className={styles.link}>How we get you there →</a>
          </div>

          <ul className={styles.stats} data-fade>
            {hero.stats.map((s) => (
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
              alt="Graduates celebrating signed offer letters"
              loading="eager"
            />
            <div className={styles.imgOverlay} aria-hidden="true" />
            <div className={styles.floatTag}>
              <span className={styles.floatTagDot} aria-hidden="true" />
              {hero.tag}
            </div>
          </div>
          <div className={styles.badge} aria-hidden="true">
            <div className={styles.badgeSince}>Placed</div>
            <div className={styles.badgeYear}>1200+</div>
          </div>
        </div>
      </div>
    </section>
  );
}
