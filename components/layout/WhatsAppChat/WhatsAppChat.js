'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { brand } from '@/lib/content';
import styles from './WhatsAppChat.module.css';

// WhatsApp expects digits only in the wa.me slug.
const waDigits = (v) => String(v || '').replace(/\D/g, '');

export default function WhatsAppChat({
  greeting = "Hi Buddha's Skill Academy, I'd like to know more about your programs.",
}) {
  const number = waDigits(brand.whatsapp);
  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(greeting)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Chat with us on WhatsApp"
    >
      <span className={styles.tooltip} aria-hidden="true">
        <span className={styles.tooltipTitle}>Chat with us</span>
        <span className={styles.tooltipSub}>We usually reply in minutes</span>
      </span>
      <span className={styles.pulse} aria-hidden="true" />
      <FaWhatsapp className={styles.icon} aria-hidden="true" />
    </a>
  );
}
