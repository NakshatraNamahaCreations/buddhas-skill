'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiArrowRight } from 'react-icons/fi';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './WhyPromise.module.css';

export default function WhyPromise() {
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
      aria-labelledby="why-promise-title"
    >
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={styles.inner}>
        <Eyebrow tone="paper" withDot={false} className={styles.eyebrow} data-fade>
          Our promise
        </Eyebrow>

        <p className={styles.mark} aria-hidden="true" data-fade>&ldquo;</p>

        <h2 id="why-promise-title" className={styles.quote} data-fade>
          We don&rsquo;t just train.
          <br />
          <em>We transform your career.</em>
        </h2>

        <div className={styles.rule} aria-hidden="true" data-fade />

        <div className={styles.attribution} data-fade>
          <div className={styles.name}>Buddha&rsquo;s Skill Academy</div>
          <div className={styles.tag}>Est. 2015 · Bangalore</div>
        </div>

        <div className={styles.actions} data-fade>
          <a href="/#contact" className={styles.cta}>
            <span>Talk to a mentor</span>
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
