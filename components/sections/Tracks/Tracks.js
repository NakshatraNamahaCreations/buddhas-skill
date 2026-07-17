'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { tracks, tracksHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import styles from './Tracks.module.css';

// Split the header title around its accent phrase so the second half can be
// crimson without hardcoding markup in content.js.
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

export default function Tracks() {
  const rootRef  = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const railRef  = useRef(null);
  const counterActiveRef = useRef(null);
  const cardRefs = useRef([]);
  // Nested per-card chip refs for the stagger reveal on active
  const chipRefs = useRef([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const cards = cardRefs.current.filter(Boolean);
      const chipsPerCard = chipRefs.current.map((set) => (set || []).filter(Boolean));

      if (reduced) {
        cards.forEach((c) => c.classList.add(styles.cardActive));
        gsap.set(railRef.current, { scaleX: 1 });
        chipsPerCard.flat().forEach((chip) => gsap.set(chip, { opacity: 1, y: 0 }));
        return;
      }

      // Chips start dim/lifted; the active card's chips get a stagger reveal.
      chipsPerCard.flat().forEach((chip) => gsap.set(chip, { opacity: 0, y: 10 }));
      // First card is active on load
      if (cards[0]) cards[0].classList.add(styles.cardActive);
      if (chipsPerCard[0]) {
        gsap.to(chipsPerCard[0], { opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: 'power2.out' });
      }

      const mm = gsap.matchMedia();

      // -------- Desktop: pin + horizontal scrub --------
      mm.add('(min-width: 1024px)', () => {
        const track    = trackRef.current;
        const stage    = stageRef.current;
        const railEl   = railRef.current;
        const counterN = counterActiveRef.current;

        // Recomputed on refresh so resize doesn't break the math
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        let currentActive = 0;

        const st = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const distance = getDistance();
              gsap.set(track,  { x: -distance * self.progress });
              gsap.set(railEl, { scaleX: self.progress });

              // Active card = whichever card's center is closest to viewport center
              const vwHalf = window.innerWidth / 2;
              let bestIdx = 0;
              let bestDist = Infinity;
              cards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                const center = rect.left + rect.width / 2;
                const d = Math.abs(center - vwHalf);
                if (d < bestDist) { bestDist = d; bestIdx = i; }
              });

              if (bestIdx !== currentActive) {
                cards[currentActive]?.classList.remove(styles.cardActive);
                cards[bestIdx].classList.add(styles.cardActive);
                // Reset chips on old, stagger-reveal chips on new
                if (chipsPerCard[currentActive]) {
                  gsap.to(chipsPerCard[currentActive], { opacity: 0, y: 10, duration: 0.25 });
                }
                if (chipsPerCard[bestIdx]) {
                  gsap.to(chipsPerCard[bestIdx], {
                    opacity: 1, y: 0, stagger: 0.04, duration: 0.5, ease: 'power2.out',
                  });
                }
                if (counterN) counterN.textContent = String(bestIdx + 1).padStart(2, '0');
                currentActive = bestIdx;
              }
            },
          },
        });

        return () => st.kill();
      });

      // -------- Mobile: stack + enter reveal --------
      mm.add('(max-width: 1023px)', () => {
        // Show all chips immediately (each card is a stack on mobile)
        chipsPerCard.flat().forEach((chip) => gsap.set(chip, { opacity: 1, y: 0 }));

        cards.forEach((card) => {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="tracks-title"
      id="programs"
    >
      <header className={styles.header}>
        <Eyebrow className={styles.eyebrow}>{tracksHeader.eyebrow}</Eyebrow>
        <h2 id="tracks-title" className={styles.title}>
          <TitleWithAccent title={tracksHeader.title} accent={tracksHeader.titleAccent} />
        </h2>
        <p className={styles.lede}>{tracksHeader.lede}</p>
      </header>

      <div ref={stageRef} className={styles.stage}>
        <div ref={trackRef} className={styles.track}>
          {tracks.map((t, i) => (
            <article
              key={t.id}
              ref={(node) => { cardRefs.current[i] = node; }}
              className={styles.card}
              aria-labelledby={`track-${t.id}-title`}
            >
              {t.image && (
                <div className={styles.media}>
                  <img
                    className={styles.mediaImg}
                    src={t.image}
                    alt=""
                    loading="lazy"
                    aria-hidden="true"
                  />
                  {t.badge && (
                    <span className={styles.mediaBadge}>
                      <span className={styles.mediaBadgeDot} aria-hidden="true" />
                      {t.badge}
                    </span>
                  )}
                  {t.stats && t.stats.length > 0 && (
                    <div className={styles.mediaStats} aria-hidden="true">
                      {t.stats.map((s, si) => (
                        <div key={si} className={styles.stat}>
                          <div className={styles.statValue}>{s.value}</div>
                          <div className={styles.statLabel}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className={styles.index}>{t.index} · Program</div>

              <h3 id={`track-${t.id}-title`} className={styles.cardTitle}>
                {t.title}
              </h3>
              <p className={styles.promise}>{t.promise}</p>

              <p className={styles.sectionLabel}>What you'll learn</p>
              <div className={styles.chips}>
                {t.learn.map((c, ci) => (
                  <span
                    key={c}
                    ref={(node) => {
                      if (!chipRefs.current[i]) chipRefs.current[i] = [];
                      chipRefs.current[i][ci] = node;
                    }}
                    className={styles.chip}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p className={styles.careers}>
                <strong>Career paths →</strong> {t.careers.join(' · ')}
              </p>

              <Button
                href="#contact"
                variant="primary"
                withArrow
                className={styles.enquire}
              >
                Enquire
              </Button>
            </article>
          ))}
        </div>

        <div className={styles.counter} aria-hidden="true">
          <span className={styles.active} ref={counterActiveRef}>01</span>
          <span> / 0{tracks.length}</span>
        </div>

        <div className={styles.railWrap} aria-hidden="true">
          <div className={styles.railTrack}>
            <div className={styles.rail} ref={railRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
