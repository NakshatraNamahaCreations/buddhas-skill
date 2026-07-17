'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FiTarget, FiCompass } from 'react-icons/fi';
import { aboutPage } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './AboutStory.module.css';

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

const STORY_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop';

export default function AboutStory() {
  const rootRef = useRef(null);
  const { story, mission, vision } = aboutPage;

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

  return (
    <section
      ref={rootRef}
      className={styles.section}
      id="story"
      aria-labelledby="about-story-title"
    >
      <div className={styles.bgDecor} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header} data-fade>
          <div className={styles.headerLead}>
            <Eyebrow tone="ink" className={styles.eyebrow}>
              {story.eyebrow}
            </Eyebrow>
            <h2 id="about-story-title" className={styles.title}>
              <TitleWithAccent title={story.title} accent={story.titleAccent} />
            </h2>
          </div>
          {/* <div className={styles.headerMeta}>
            <div className={styles.metaLabel}>Est.</div>
            <div className={styles.metaValue}>2015</div>
            <div className={styles.metaRule} aria-hidden="true" />
            <div className={styles.metaFoot}>Bangalore, India</div>
          </div> */}
        </header>

        <div className={styles.bento}>
          <article className={styles.narrative} data-fade>
            <div className={styles.mark} aria-hidden="true">&ldquo;</div>
            {story.paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </article>

          <div className={styles.photo} data-fade>
            <img
              src={STORY_IMAGE}
              alt="A cohort of learners in class"
              loading="lazy"
            />
            <div className={styles.photoOverlay} aria-hidden="true" />
            <div className={styles.photoTag}>
              <span className={styles.photoTagDot} aria-hidden="true" />
              Live cohorts. Real mentors.
            </div>
          </div>

          <article className={`${styles.mv} ${styles.mvPrimary}`} data-fade>
            <div className={styles.mvIcon} aria-hidden="true"><FiTarget /></div>
            <div className={styles.mvLabel}>{mission.label}</div>
            <p className={styles.mvText}>{mission.text}</p>
            <div className={styles.mvGlow} aria-hidden="true" />
          </article>

          <article className={styles.mv} data-fade>
            <div className={styles.mvIcon} aria-hidden="true"><FiCompass /></div>
            <div className={styles.mvLabel}>{vision.label}</div>
            <p className={styles.mvText}>{vision.text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
