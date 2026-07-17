'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiArrowUpRight,
} from 'react-icons/fi';
import { brand, contactPage } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './ContactHero.module.css';

const ICON_MAP = {
  phone: FiPhone,
  mail: FiMail,
  whatsapp: FiMessageCircle,
  pin: FiMapPin,
};

const digits = (v) => String(v || '').replace(/\D/g, '');

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

// Resolve each channel's live value + href from the brand block.
// Keeping this in the component (not content) so brand stays the
// single source of truth for phone / email / whatsapp / address.
function channelTarget(key) {
  switch (key) {
    case 'call': {
      const num = brand.phones?.[0] || brand.phone;
      return { display: num, href: `tel:${digits(num) || num}` };
    }
    case 'whatsapp': {
      const num = digits(brand.whatsapp);
      return {
        display: `+${num}`,
        href: `https://wa.me/${num}`,
        external: true,
      };
    }
    case 'email':
      return { display: brand.email, href: `mailto:${brand.email}` };
    case 'visit':
      return { display: brand.address, href: '#contact' };
    default:
      return { display: '', href: '#' };
  }
}

export default function ContactHero() {
  const rootRef = useRef(null);
  const hero = contactPage.hero;

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
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.09,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-labelledby="contact-hero-title"
    >
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.blobA} />
        <div className={styles.blobB} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow tone="ink" className={styles.eyebrow} data-fade>
            {hero.eyebrow}
          </Eyebrow>
          <h1 id="contact-hero-title" className={styles.title} data-fade>
            <TitleWithAccent title={hero.title} accent={hero.titleAccent} />
          </h1>
          <p className={styles.lede} data-fade>{hero.lede}</p>
        </header>

        <ul className={styles.channels} data-fade>
          {contactPage.channels.map((c) => {
            const Icon = ICON_MAP[c.icon] || FiPhone;
            const { display, href, external } = channelTarget(c.key);
            return (
              <li key={c.key} className={styles.channel}>
                <a
                  className={styles.channelLink}
                  data-channel={c.key}
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className={styles.channelIcon} aria-hidden="true">
                    <Icon />
                  </span>

                  <div className={styles.channelBody}>
                    <span className={styles.channelLabel}>{c.label}</span>
                    <span className={styles.channelValue}>{display}</span>
                    <span className={styles.channelHint}>{c.hint}</span>
                  </div>

                  <span className={styles.channelArrow} aria-hidden="true">
                    <FiArrowUpRight />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
