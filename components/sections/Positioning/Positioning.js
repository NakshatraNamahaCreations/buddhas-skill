'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { positioning } from '@/lib/content';
import styles from './Positioning.module.css';

export default function Positioning() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const readRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cards = gsap.utils.toArray('[data-pillar]', cardsRef.current);

      if (reduced) {
        gsap.set([titleRef.current, readRef.current], { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set([titleRef.current, readRef.current], { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 24 });

      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0)
        .to(readRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.15)
        .to(cards, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, 0.3);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="positioning-title"
    >
      <img
        className={styles.bg}
        src="/images/training1.png"
        alt=""
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 ref={titleRef} id="positioning-title" className={styles.title}>
            <span>{positioning.titleTop}</span>
            <span className={styles.accent}>{positioning.titleAccent}</span>
          </h2>

          <p ref={readRef} className={styles.readAlong}>
            {positioning.readAlong}
          </p>
        </div>

        <div ref={cardsRef} className={styles.pillars}>
          {positioning.pillars.map((p) => (
            <article key={p.label} className={styles.pillarCard} data-pillar>
              <div className={styles.pillarIcon} aria-hidden="true">
                <span className={styles.pillarIconDot} />
              </div>
              <div className={styles.pillarText}>
                <div className={styles.pillarLabel}>{p.label}</div>
                <p className={styles.pillarBody}>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
