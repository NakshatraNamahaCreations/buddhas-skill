'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiTool, FiUsers, FiTrendingUp, FiArrowUpRight } from 'react-icons/fi';
import { aboutUs } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './AboutUs.module.css';

// Icons align 1:1 with `aboutUs.values` in content.js.
const VALUE_ICONS = { craft: FiTool, community: FiUsers, careers: FiTrendingUp };

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

export default function AboutUs() {
  const rootRef = useRef(null);
  const tileRefs = useRef([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const tiles = tileRefs.current.filter(Boolean);
      if (!tiles.length) return;

      if (reduced) {
        gsap.set(tiles, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(tiles, { opacity: 0, y: 30, scale: 0.96 });

      gsap.to(tiles, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { each: 0.08, from: 'start' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: rootRef }
  );

  const registerTile = (i) => (node) => { tileRefs.current[i] = node; };

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        {/* Tile 1 — big statement (spans 2 cols × 2 rows) */}
        <article
          ref={registerTile(0)}
          className={`${styles.tile} ${styles.tileStatement}`}
        >
          <Eyebrow tone="ink" className={styles.eyebrow}>
            {aboutUs.eyebrow}
          </Eyebrow>
          <h2 id="about-title" className={styles.title}>
            <TitleWithAccent title={aboutUs.title} accent={aboutUs.titleAccent} />
          </h2>
          <p className={styles.body}>{aboutUs.body}</p>
        </article>

        {/* Tile 2 — photo (col 3, rows 1-2) */}
        <article
          ref={registerTile(1)}
          className={`${styles.tile} ${styles.tilePhoto}`}
          aria-hidden="true"
        >
          <img className={styles.photoImg} src={aboutUs.image} alt="" loading="lazy" />
          <div className={styles.photoOverlay} />
          <div className={styles.photoTag}>
            <span className={styles.photoTagDot} />
            Live cohorts. Real mentors.
          </div>
        </article>

        {/* Tile 3 — years-shaped red "since" card */}
        <article
          ref={registerTile(2)}
          className={`${styles.tile} ${styles.tileSince}`}
        >
          <div className={styles.sinceValue}>{aboutUs.since.value}</div>
          <div className={styles.sinceLabel}>{aboutUs.since.label}</div>
          <FiArrowUpRight className={styles.sinceArrow} aria-hidden="true" />
        </article>

        {/* Tile 4 — big promise quote (spans 2 cols) */}
        <article
          ref={registerTile(3)}
          className={`${styles.tile} ${styles.tilePromise}`}
        >
          <span className={styles.promiseMark} aria-hidden="true">&ldquo;</span>
          <p className={styles.promiseText}>{aboutUs.promise}</p>
          <div className={styles.promiseAttr}>Buddha&rsquo;s Skill Academy</div>
        </article>

        {/* Tile 5, 6, 7 — three value cards (one each column, bottom row) */}
        {/* {aboutUs.values.map((v, i) => {
          const Icon = VALUE_ICONS[v.key] || FiTool;
          return (
            <article
              key={v.key}
              ref={registerTile(4 + i)}
              className={`${styles.tile} ${styles.tileValue}`}
            >
              <span className={styles.valueIcon} aria-hidden="true">
                <Icon />
              </span>
              <div className={styles.valueLabel}>{v.label}</div>
              <p className={styles.valueBody}>{v.body}</p>
            </article>
          );
        })} */}
      </div>
    </section>
  );
}
