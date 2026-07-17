'use client';

import styles from './Marquee.module.css';

/**
 * Seamless infinite marquee. Content is duplicated once and the track animates
 * a transform of -50% — one full copy width — so the seam is invisible.
 *
 * CSS-animated on purpose: transform-only, natively respects
 * `prefers-reduced-motion`, pauses on hover / focus-within with zero JS.
 */
export default function Marquee({
  items,
  duration = 45,
  gap = 32,
  reverse = false,
  className = '',
  ariaLabel,
  renderItem,
}) {
  const doubled = [...items, ...items];
  const cls = [styles.marquee, reverse ? styles.reverse : '', className]
    .filter(Boolean)
    .join(' ');
  const style = {
    '--marquee-duration': `${duration}s`,
    '--marquee-gap': `${gap}px`,
  };

  return (
    <div className={cls} style={style} role="region" aria-label={ariaLabel}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className={styles.item}
            aria-hidden={i >= items.length ? 'true' : undefined}
          >
            {renderItem ? renderItem(item, i % items.length) : item}
          </div>
        ))}
      </div>
    </div>
  );
}
