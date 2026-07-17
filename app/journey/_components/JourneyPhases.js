'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  FiUserPlus,
  FiBookOpen,
  FiCode,
  FiMessageCircle,
  FiBriefcase,
  FiAward,
} from 'react-icons/fi';
import { studentLifeCycle, studentLifeCycleHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './JourneyPhases.module.css';

const ICON_MAP = {
  userPlus:  FiUserPlus,
  book:      FiBookOpen,
  code:      FiCode,
  message:   FiMessageCircle,
  briefcase: FiBriefcase,
  award:     FiAward,
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

export default function JourneyPhases() {
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const total = studentLifeCycle.length;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const items = gsap.utils.toArray('[data-phase]', listRef.current);
      const railFill = listRef.current?.querySelector('[data-rail-fill]');

      if (reduced) {
        gsap.set(items, { opacity: 1, x: 0 });
        if (railFill) gsap.set(railFill, { scaleY: 1 });
        return;
      }

      gsap.set(items, { opacity: 0, x: -24 });
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      if (railFill) {
        gsap.fromTo(
          railFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        );
      }
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="phases"
      aria-labelledby="journey-phases-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>
              {studentLifeCycleHeader.eyebrow}
            </Eyebrow>
            <h2 id="journey-phases-title" className={styles.title}>
              <TitleWithAccent
                title={studentLifeCycleHeader.title}
                accent={studentLifeCycleHeader.titleAccent}
              />
            </h2>
          </div>
          <p className={styles.lede}>{studentLifeCycleHeader.lede}</p>
        </header>

        <ol ref={listRef} className={styles.list}>
          <div className={styles.rail} aria-hidden="true">
            <div className={styles.railFill} data-rail-fill />
          </div>

          {studentLifeCycle.map((p, i) => {
            const Icon = ICON_MAP[p.icon] || FiAward;
            const isLast = i === total - 1;
            return (
              <li key={p.phase} className={styles.item} data-phase>
                <div className={styles.node} aria-hidden="true">
                  <span className={`${styles.dot} ${isLast ? styles.dotActive : ''}`} />
                  <span className={styles.duration}>{p.duration}</span>
                </div>

                <article
                  className={`${styles.card} ${isLast ? styles.cardActive : ''}`}
                >
                  <div className={styles.cardHead}>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon />
                    </span>
                    <span className={styles.phaseTag}>
                      Phase {p.phase}
                      <span className={styles.phaseTagOf}>
                        {' '}/ {String(total).padStart(2, '0')}
                      </span>
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardBody}>{p.body}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
