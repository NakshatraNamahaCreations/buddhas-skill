'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiFlag, FiAward, FiLayers, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { aboutPage } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './AboutMilestones.module.css';

const MILESTONE_ICONS = [FiFlag, FiAward, FiLayers, FiUsers, FiTrendingUp];

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

export default function AboutMilestones() {
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const { milestonesHeader, milestones } = aboutPage;
  const total = milestones.length;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const items = gsap.utils.toArray('[data-milestone]', listRef.current);
      const railFill = listRef.current?.querySelector('[data-rail-fill]');

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        if (railFill) gsap.set(railFill, { scaleX: 1, scaleY: 1 });
        return;
      }

      const isMobile = window.matchMedia('(max-width: 720px)').matches;

      // Cards fade + slide from their zigzag direction
      items.forEach((el) => {
        const isTop = el.dataset.side === 'top';
        gsap.set(el, { opacity: 0, y: isTop ? -24 : 24 });
      });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Rail fills along its axis on scroll — X on desktop, Y on mobile
      if (railFill) {
        gsap.fromTo(
          railFill,
          isMobile ? { scaleY: 0, scaleX: 1 } : { scaleX: 0, scaleY: 1 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 70%',
              end: 'bottom 70%',
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
      aria-labelledby="about-milestones-title"
    >
      <div className={styles.bgDecor} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>
              {milestonesHeader.eyebrow}
            </Eyebrow>
            <h2 id="about-milestones-title" className={styles.title}>
              <TitleWithAccent
                title={milestonesHeader.title}
                accent={milestonesHeader.titleAccent}
              />
            </h2>
          </div>
        </header>

        <div className={styles.scroller}>
          <ol ref={listRef} className={styles.list}>
            <div className={styles.rail} aria-hidden="true">
              <div className={styles.railFill} data-rail-fill />
            </div>

            {milestones.map((m, i) => {
              const Icon = MILESTONE_ICONS[i] || FiFlag;
              const isTop = i % 2 === 0;
              const isLast = i === total - 1;
              const sideClass = isTop ? styles.itemTop : styles.itemBot;
              return (
                <li
                  key={m.year}
                  className={`${styles.item} ${sideClass}`}
                  data-milestone
                  data-side={isTop ? 'top' : 'bot'}
                >
                  <article className={`${styles.card} ${isLast ? styles.cardActive : ''}`}>
                    <div className={styles.cardHead}>
                      <span className={styles.cardIcon} aria-hidden="true">
                        <Icon />
                      </span>
                      <span className={styles.cardStep}>
                        {String(i + 1).padStart(2, '0')}
                        <span className={styles.cardStepOf}>
                          / {String(total).padStart(2, '0')}
                        </span>
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{m.title}</h3>
                    <p className={styles.cardBody}>{m.body}</p>
                    <span className={styles.stem} aria-hidden="true" />
                  </article>

                  <div className={styles.node} aria-hidden="true">
                    <span className={`${styles.dot} ${isLast ? styles.dotActive : ''}`} />
                    <span className={`${styles.year} ${isLast ? styles.yearActive : ''}`}>
                      {m.year}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
