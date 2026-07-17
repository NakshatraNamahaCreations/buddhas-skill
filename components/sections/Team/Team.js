'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowRight } from 'react-icons/fi';
import { team, teamHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './Team.module.css';

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

// Perspective tilt for the coverflow row. Cards left of center rotate right
// (positive rotateY), cards to the right rotate left. Adjust STEP to widen or
// tighten the curve.
const TILT_STEP = 14;

export default function Team() {
  const rootRef = useRef(null);
  const rowRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = gsap.utils.toArray('[data-fade]', rootRef.current);
      const cards = gsap.utils.toArray('[data-team-card]', rowRef.current);

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 30 });

      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
        .to(targets, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 0)
        .to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'center' },
        }, 0.2);
    },
    { scope: rootRef }
  );

  const total = team.length;
  const centerIndex = (total - 1) / 2;

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="team"
      aria-labelledby="team-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow tone="ink" className={styles.eyebrow} data-fade>
            {teamHeader.eyebrow}
          </Eyebrow>
          <h2 id="team-title" className={styles.title} data-fade>
            <TitleWithAccent title={teamHeader.title} accent={teamHeader.titleAccent} />
          </h2>
          <p className={styles.lede} data-fade>
            {teamHeader.lede}
          </p>
          <a href="#contact" className={styles.cta} data-fade>
            <span>Talk to a mentor</span>
            <FiArrowRight aria-hidden="true" />
          </a>
        </header>
      </div>

      {/* Coverflow row — sits outside .inner so edge cards can clip off-screen */}
      <div ref={rowRef} className={styles.row} role="list" aria-label="Team members">
        {team.map((m, i) => {
          const offset = i - centerIndex;
          const rotate = -offset * TILT_STEP;
          return (
            <article
              key={m.name}
              className={styles.card}
              data-team-card
              role="listitem"
              style={{ '--tilt': `${rotate}deg` }}
            >
              <div className={styles.photoWrap}>
                <img
                  className={styles.photo}
                  src={m.avatar}
                  alt={`Portrait of ${m.name}`}
                  loading="lazy"
                />
              </div>
              <div className={styles.caption}>
                <div className={styles.name}>{m.name}</div>
                <div className={styles.role}>{m.role}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
