'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  FiChevronDown,
  FiArrowRight,
  FiCode,
  FiTerminal,
  FiBarChart2,
  FiShield,
  FiCheckSquare,
} from 'react-icons/fi';
import { tracks } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './ProgramsHero.module.css';

const PROGRAM_ICONS = {
  'java-fullstack':   FiCode,
  'python-fullstack': FiTerminal,
  'data-science-ai':  FiBarChart2,
  'cyber-security':   FiShield,
  'software-testing': FiCheckSquare,
};

const HERO_STATS = [
  { value: '5',    suffix: '',  label: 'Programs' },
  { value: '1200', suffix: '+', label: 'Careers placed' },
  { value: '300',  suffix: '+', label: 'Hiring partners' },
  { value: '12',   suffix: '+', label: 'Years shaping careers' },
];

export default function ProgramsHero() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = gsap.utils.toArray('[data-fade]', rootRef.current);
      const cards = gsap.utils.toArray('[data-deck-card]', rootRef.current);

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0, rotate: (i) => (i - 2) * 4 });
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

      gsap.set(cards, { opacity: 0, y: 40, rotate: 0 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotate: (i) => (i - 2) * 4,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.15,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-labelledby="programs-hero-title"
    >
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.blobA} />
        <div className={styles.blobB} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.metaRow} data-fade>
            <Eyebrow tone="ink" className={styles.eyebrow}>
              Programs 
            </Eyebrow>
          </div>

          <h1 id="programs-hero-title" className={styles.title} data-fade>
            Choose your <em>program.</em>
      
            We take it from there.
          </h1>

          <p className={styles.lede} data-fade>
            Every program is a full career path curriculum, mentorship, live
            projects, mock interviews, and dedicated placement support.
            Pick the one that maps to the career you want.
          </p>

          <div className={styles.actions} data-fade>
            <a href="#catalog" className={styles.cta}>
              <span>Browse programs</span>
              <FiChevronDown aria-hidden="true" />
            </a>
            <a href="#compare" className={styles.link}>
              Compare all
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.deckWrap} aria-hidden="true">
          <div className={styles.deck}>
            {tracks.map((t, i) => {
              const Icon = PROGRAM_ICONS[t.id] || FiCode;
              return (
                <a
                  key={t.id}
                  href={`#program-${t.id}`}
                  className={styles.deckCard}
                  style={{ '--i': i, '--total': tracks.length }}
                  data-deck-card
                >
                  <div className={styles.deckHead}>
                    <span className={styles.deckIndex}>{t.index}</span>
                    <span className={styles.deckBadge}>{t.badge}</span>
                  </div>

                  <div className={styles.deckIcon} aria-hidden="true">
                    <Icon />
                  </div>

                  <div className={styles.deckBody}>
                    <h3 className={styles.deckTitle}>{t.title}</h3>
                    <ul className={styles.deckSkills}>
                      {t.learn.slice(0, 4).map((s) => (
                        <li key={s} className={styles.deckSkill}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.deckFoot}>
                    <span className={styles.deckMeta}>
                      {t.stats[0].value} · {t.stats[0].label}
                    </span>
                    <span className={styles.deckArrow} aria-hidden="true">
                      <FiArrowRight />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
