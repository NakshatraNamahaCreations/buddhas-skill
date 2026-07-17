'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowRight, FiCode, FiTerminal, FiBarChart2, FiShield, FiCheckSquare, FiBookOpen, FiBriefcase, FiClock } from 'react-icons/fi';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './ProgramDetail.module.css';

const PROGRAM_ICONS = {
  'java-fullstack':   FiCode,
  'python-fullstack': FiTerminal,
  'data-science-ai':  FiBarChart2,
  'cyber-security':   FiShield,
  'software-testing': FiCheckSquare,
};

export default function ProgramDetail({ program, order, total, band = 'paper' }) {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const Icon = PROGRAM_ICONS[program.id];
  const flipped = order % 2 === 1;

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = gsap.utils.toArray('[data-detail-fade]', rootRef.current);

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
        stagger: 0.06,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Parallax on the image
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -6, scale: 1.08 },
          {
            yPercent: 6,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
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
      id={`program-${program.id}`}
      className={`${styles.section} ${styles[band]} ${flipped ? styles.flipped : ''}`}
      aria-labelledby={`program-${program.id}-title`}
    >
      <div className={styles.inner}>
        {/* Media */}
        <div className={styles.mediaCol}>
          <div className={styles.mediaAccent} aria-hidden="true" />
          <div className={styles.mediaFrame} data-detail-fade>
            <img
              ref={imgRef}
              className={styles.mediaImg}
              src={program.image}
              alt=""
              loading="lazy"
            />
            <div className={styles.mediaOverlay} aria-hidden="true" />
            <div className={styles.mediaBadge}>
              <span className={styles.mediaBadgeDot} aria-hidden="true" />
              {program.badge}
            </div>
          </div>

          <div className={styles.floatStats} data-detail-fade>
            {program.stats.map((s, si) => (
              <div key={si} className={styles.floatStat}>
                <div className={styles.floatStatValue}>{s.value}</div>
                <div className={styles.floatStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy */}
        <div className={styles.copyCol}>
          <div className={styles.stepRow} data-detail-fade>
            <span className={styles.iconChip} aria-hidden="true">
              {Icon ? <Icon /> : null}
            </span>
            <Eyebrow tone="ink" withDot={false} className={styles.eyebrow}>
              Program {program.index} <span className={styles.eyebrowOf}>/ 0{total}</span>
            </Eyebrow>
          </div>

          <h2
            id={`program-${program.id}-title`}
            className={styles.title}
            data-detail-fade
          >
            {program.title}
          </h2>

          <p className={styles.promise} data-detail-fade>{program.promise}</p>

          <div className={styles.divider} aria-hidden="true" data-detail-fade />

          <div className={styles.block} data-detail-fade>
            <div className={styles.blockHead}>
              <FiBookOpen aria-hidden="true" />
              <span className={styles.blockLabel}>Curriculum</span>
              <span className={styles.blockCount}>{program.learn.length} modules</span>
            </div>
            <ul className={styles.chips}>
              {program.learn.map((c) => (
                <li key={c} className={styles.chip}>{c}</li>
              ))}
            </ul>
          </div>

          <div className={styles.block} data-detail-fade>
            <div className={styles.blockHead}>
              <FiBriefcase aria-hidden="true" />
              <span className={styles.blockLabel}>Career paths</span>
            </div>
            <ul className={styles.careers}>
              {program.careers.map((c) => (
                <li key={c} className={styles.career}>
                  <span className={styles.careerBullet} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.specStrip} data-detail-fade>
            <div className={styles.spec}>
              <FiClock aria-hidden="true" />
              <div>
                <div className={styles.specValue}>{program.stats[0].value}</div>
                <div className={styles.specLabel}>{program.stats[0].label}</div>
              </div>
            </div>
            <div className={styles.spec}>
              <span className={styles.specDot} aria-hidden="true" />
              <div>
                <div className={styles.specValue}>1-on-1</div>
                <div className={styles.specLabel}>Mentorship</div>
              </div>
            </div>
            <div className={styles.spec}>
              <span className={styles.specDot} aria-hidden="true" />
              <div>
                <div className={styles.specValue}>Industry</div>
                <div className={styles.specLabel}>Certification</div>
              </div>
            </div>
          </div>

          <div className={styles.actions} data-detail-fade>
            <a href="/#contact" className={styles.cta}>
              <span>Talk to a mentor</span>
              <FiArrowRight aria-hidden="true" />
            </a>
            <a href="#compare" className={styles.link}>Compare with others →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
