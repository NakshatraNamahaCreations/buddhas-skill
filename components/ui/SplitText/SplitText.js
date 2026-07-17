'use client';

import { forwardRef, useMemo } from 'react';
import styles from './SplitText.module.css';

/**
 * Splits a plain string into `<span data-word>` (words) and `<span data-space>`
 * (whitespace) pieces so a parent can drive per-word GSAP tweens. Preserves the
 * original whitespace so lines wrap naturally and text-select stays clean.
 *
 * SSR-safe: split runs during render, not in an effect, so hydration matches.
 * Accessibility: full sentence exposed via aria-label; individual spans hidden
 * from AT so a screen reader hears a single natural sentence.
 */
const SplitText = forwardRef(function SplitText(
  { text, as: Tag = 'span', className = '', ariaLabel },
  ref
) {
  const parts = useMemo(() => {
    if (!text) return [];
    // Split on runs of whitespace, keep the separators as their own entries.
    return text.split(/(\s+)/).filter((s) => s.length > 0);
  }, [text]);

  return (
    <Tag
      ref={ref}
      className={`${styles.split} ${className}`}
      aria-label={ariaLabel || text}
    >
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) {
          return (
            <span key={i} className={styles.space} aria-hidden="true" data-space>
              {part}
            </span>
          );
        }
        return (
          <span key={i} className={styles.word} aria-hidden="true" data-word>
            {part}
          </span>
        );
      })}
    </Tag>
  );
});

export default SplitText;
