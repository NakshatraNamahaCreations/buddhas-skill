'use client';

import { hiringPartners } from '@/lib/content';
import Eyebrow from '@/components/ui/Eyebrow';
import Marquee from '@/components/ui/Marquee';
import styles from './HiringPartners.module.css';

export default function HiringPartners() {
  const { eyebrow, title, partners } = hiringPartners;

  const renderPartner = (name) => (
    <span className={styles.partner}>{name}</span>
  );

  return (
    <section
      className={styles.section}
      aria-labelledby="partners-title"
    >
      <header className={styles.header}>
        <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>
        <h2 id="partners-title" className={styles.title}>{title}</h2>
      </header>

      <div className={styles.rows}>
        {/* Row 1 — default direction, slightly slower */}
        <Marquee
          items={partners}
          duration={55}
          gap={20}
          ariaLabel="Hiring partners, row 1"
          renderItem={renderPartner}
        />
        {/* Row 2 — opposite direction, slightly quicker for organic offset */}
        <Marquee
          items={partners}
          duration={45}
          gap={20}
          reverse
          ariaLabel="Hiring partners, row 2"
          renderItem={renderPartner}
        />
      </div>
    </section>
  );
}
