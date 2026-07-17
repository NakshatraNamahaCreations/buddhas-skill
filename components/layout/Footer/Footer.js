import Image from 'next/image';
import { brand, nav } from '@/lib/content';
import styles from './Footer.module.css';

const socialLabels = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

// WhatsApp deep link — expects an E.164 slug (digits only).
const waDigits = (v) => String(v || '').replace(/\D/g, '');

export default function Footer() {
  const year = new Date().getFullYear();
  const waNum = waDigits(brand.whatsapp);

  return (
    <footer className={styles.footer} aria-labelledby="footer-title">
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <a href="#top" className={styles.logo} aria-label={`${brand.name} home`}>
            <Image
              src="/images/buddha-logo.jpeg"
              alt=""
              aria-hidden="true"
              width={76}
              height={76}
              className={styles.mark}
            />
            {/* <span className={styles.wordmark}>
              <strong>{brand.name}</strong>
              <span>{brand.tagline}</span>
            </span> */}
          </a>
         
        </div>

        <nav className={styles.linksCol} aria-label="Footer navigation">
          <h2 id="footer-title" className={styles.colTitle}>Explore</h2>
          <ul className={styles.linkList}>
            {nav.links.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.link}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contactCol}>
          <h2 className={styles.colTitle}>Contact</h2>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.metaLabel}>Phone</span>
              <span className={styles.phoneStack}>
                {(brand.phones && brand.phones.length ? brand.phones : [brand.phone]).map((p) => (
                  <a key={p} href={`tel:${waDigits(p) || p}`}>{p}</a>
                ))}
              </span>
            </li>
            <li>
              <span className={styles.metaLabel}>Email</span>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <span className={styles.metaLabel}>WhatsApp</span>
              {waNum ? (
                <a
                  href={`https://wa.me/${waNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +{waNum}
                </a>
              ) : (
                <span>{brand.whatsapp}</span>
              )}
            </li>
            <li>
              <span className={styles.metaLabel}>Address</span>
              <span>{brand.address}</span>
            </li>
          </ul>
        </div>

        <div className={styles.socialCol}>
          <h2 className={styles.colTitle}>Follow</h2>
          <ul className={styles.socialList}>
            {Object.entries(brand.socials).map(([key, href]) => (
              <li key={key}>
                <a
                  href={href}
                  className={styles.socialLink}
                  target={href && href !== '#' ? '_blank' : undefined}
                  rel={href && href !== '#' ? 'noopener noreferrer' : undefined}
                  aria-label={socialLabels[key] || key}
                >
                  {socialLabels[key] || key}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.baseline}>
        <p className={styles.copy}>© {year} {brand.name}. All rights reserved.</p>
        <p className={styles.credit}>
          Developed by{' '}
          <a
            href="https://www.nakshatranamahacreations.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creditLink}
          >
            Nakshatra Namaha Creations
          </a>
        </p>
      </div>
    </footer>
  );
}
