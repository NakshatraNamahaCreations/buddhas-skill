'use client';

import { forwardRef, useMemo } from 'react';
import styles from './PixelDissolve.module.css';

/**
 * Renders a bitmap as a CSS grid of fragment spans. Parents drive the assembly
 * animation via GSAP by querying `[data-frag]` inside the returned ref.
 * The component itself is deliberately motion-agnostic so it can be reused
 * for scroll-triggered reveals (WhyChoose grid) and event-driven ones (CTA success).
 */
const PixelDissolve = forwardRef(function PixelDissolve(
  {
    bitmap,
    gap = 3,
    snowPixels,
    className = '',
    ariaLabel,
    style,
    ...rest
  },
  ref
) {
  const cells = useMemo(() => {
    const rows = bitmap.length;
    const cols = bitmap[0]?.length || 0;
    const out = [];
    for (let r = 0; r < rows; r++) {
      const row = bitmap[r];
      for (let c = 0; c < cols; c++) {
        const bit = row[c];
        const on = bit === '1';
        const snow = snowPixels?.has(`${r},${c}`);
        out.push({ key: `${r}-${c}`, on, snow });
      }
    }
    return out;
  }, [bitmap, snowPixels]);

  const rows = bitmap.length;
  const cols = bitmap[0]?.length || 0;

  const wrapStyle = {
    '--px-cols': cols,
    '--px-rows': rows,
    '--px-gap': `${gap}px`,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${className}`}
      style={wrapStyle}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      {...rest}
    >
      {cells.map(({ key, on, snow }) => (
        <span
          key={key}
          className={`${styles.cell} ${on ? styles.on : ''} ${snow ? styles.snow : ''}`}
          data-frag={on ? '' : undefined}
        />
      ))}
    </div>
  );
});

export default PixelDissolve;
