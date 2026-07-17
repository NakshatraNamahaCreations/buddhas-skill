'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowRight } from 'react-icons/fi';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './JourneyPromise.module.css';

export default function JourneyPromise() {
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
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="journey-promise-title"
    >
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        <Eyebrow tone="paper" withDot={false} className={styles.eyebrow} data-fade>
          The finish line
        </Eyebrow>

        <p className={styles.mark} aria-hidden="true" data-fade>&ldquo;</p>

        <h2 id="journey-promise-title" className={styles.quote} data-fade>
          The journey ends the same way for every learner
          <br />
          — with a <em>signed offer letter.</em>
        </h2>

        <div className={styles.rule} aria-hidden="true" data-fade />

        <div className={styles.attribution} data-fade>
          <div className={styles.name}>The placement team stays on the call until it&rsquo;s done.</div>
          <div className={styles.tag}>Buddha&rsquo;s Skill Academy · Placement promise</div>
        </div>

        <div className={styles.actions} data-fade>
          <a href="/#contact" className={styles.cta}>
            <span>Start your journey</span>
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
