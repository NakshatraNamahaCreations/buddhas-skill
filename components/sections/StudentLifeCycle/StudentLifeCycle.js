'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  FiUserPlus,
  FiBookOpen,
  FiCode,
  FiMessageSquare,
  FiBriefcase,
  FiAward,
  FiArrowRight,
} from 'react-icons/fi';
import { studentLifeCycle, studentLifeCycleHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './StudentLifeCycle.module.css';

// String keys from lib/content.js map to icon components here so the content
// file stays free of JSX imports.
const ICON_MAP = {
  userPlus: FiUserPlus,
  book: FiBookOpen,
  code: FiCode,
  message: FiMessageSquare,
  briefcase: FiBriefcase,
  award: FiAward,
};

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

export default function StudentLifeCycle() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = gsap.utils.toArray('[data-fade]', rootRef.current);

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 24 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  const lastIndex = studentLifeCycle.length - 1;

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="lifecycle"
      aria-labelledby="lifecycle-title"
    >
      <div className={styles.inner}>
        <header className={styles.header} data-fade>
          <Eyebrow tone="ink" className={styles.eyebrow}>
            {studentLifeCycleHeader.eyebrow}
          </Eyebrow>
          <h2 id="lifecycle-title" className={styles.title}>
            <TitleWithAccent
              title={studentLifeCycleHeader.title}
              accent={studentLifeCycleHeader.titleAccent}
            />
          </h2>
          <p className={styles.lede}>{studentLifeCycleHeader.lede}</p>
        </header>

        <ol className={styles.grid} aria-label="Student life cycle phases">
          {studentLifeCycle.map((phase, i) => {
            const Icon = ICON_MAP[phase.icon] || FiAward;
            return (
              <li key={phase.phase} className={styles.card} data-fade>
                <span className={styles.accentBar} aria-hidden="true" />
                {/* <span className={styles.watermark} aria-hidden="true">
                  {phase.phase}
                </span> */}

                <div className={styles.cardHead}>
                  <div className={styles.iconTile} aria-hidden="true">
                    <Icon />
                  </div>
                  <div className={styles.metaBlock}>
                    <span className={styles.phaseTag}>Phase {phase.phase}</span>
                    <span className={styles.duration}>{phase.duration}</span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{phase.title}</h3>
                <p className={styles.cardBody}>{phase.body}</p>

                {i !== lastIndex && (
                  <span className={styles.connector} aria-hidden="true">
                    <FiArrowRight />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
