'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  FiBookOpen,
  FiUser,
  FiCode,
  FiBriefcase,
  FiMessageCircle,
  FiMapPin,
  FiAward,
} from 'react-icons/fi';
import { whyChoose, whyChooseHeader } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './WhyChoose.module.css';

// Split the title around its accent phrase so the accent word can be crimson.
function TitleWithAccent({ title, accent = 'outcomes' }) {
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

// Icons mapped by index to `whyChoose` in lib/content.js.
const PILL_ICONS = [
  FiBookOpen,       // Industry-Curated Curriculum
  FiUser,           // Corporate-Certified Trainers
  FiCode,           // Live Projects & Hands-On Training
  FiBriefcase,      // Placement Assistance
  FiMessageCircle,  // Mock Interviews
  FiMapPin,         // World-Class Infrastructure
  FiAward,          // Certification on Completion
];

export default function WhyChoose() {
  const rootRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const pills = gsap.utils.toArray('[data-why-pill]', listRef.current);

      if (reduced) {
        gsap.set(pills, { opacity: 1, x: 0 });
        return;
      }

      // Pills fly in from the right with stagger, echoing the zig-zag layout.
      gsap.set(pills, { opacity: 0, x: 40 });

      gsap.to(pills, {
        opacity: 1,
        x: 0,
        ease: 'power2.out',
        duration: 0.7,
        stagger: { each: 0.09, from: 'start' },
        scrollTrigger: {
          trigger: listRef.current,
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
      id="why"
      aria-labelledby="whychoose-title"
      data-nav-theme="light"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow tone="ink" className={styles.eyebrow}>
            {whyChooseHeader.eyebrow}
          </Eyebrow>
          <h2 id="whychoose-title" className={styles.title}>
            <TitleWithAccent title={whyChooseHeader.title} accent="outcomes." />
          </h2>
          <p className={styles.lede}>{whyChooseHeader.lede}</p>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.visualCurve} />
            <div className={styles.visualFrame}>
              <img
                className={styles.visualImg}
                src="/images/whychoose-img.png"
                alt=""
                loading="lazy"
              />
            </div>
            <div className={styles.visualBadge}>
              <span className={styles.visualBadgeDot} aria-hidden="true" />
              Live projects · Real mentors
            </div>
          </div>
        </header>

        <div ref={listRef} className={styles.list}>
          {/* Wavy dashed connector behind the pills */}
          <svg
            className={styles.connector}
            viewBox="0 0 200 800"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M40,20 C160,80 40,180 160,240 C40,300 160,400 40,460 C160,520 40,620 160,680 C40,740 100,780 100,800"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
          </svg>

          {whyChoose.map((item, i) => {
            const Icon = PILL_ICONS[i] || FiAward;
            return (
              <div
                key={item.index}
                className={styles.pill}
                data-why-pill
                aria-label={item.title}
              >
                <div className={styles.pillIcon} aria-hidden="true">
                  <Icon />
                </div>
                <span className={styles.pillLabel}>{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
