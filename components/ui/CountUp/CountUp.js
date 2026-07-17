'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './CountUp.module.css';

/**
 * Progress-driven counter. Parent (usually a section with a ScrollTrigger)
 * calls `setProgress(0..1)` on this ref each tick — no timers, no internal state,
 * so the count stays perfectly in sync with scroll position.
 *
 * Initial JSX renders the final value so if JS never runs, the number is still
 * correct. On mount, the parent snaps it back to 0 (or leaves it for reduced-motion).
 */
const CountUp = forwardRef(function CountUp(
  { value = 0, prefix = '', suffix = '', className = '' },
  ref
) {
  const spanRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      setProgress(p) {
        const clamped = Math.max(0, Math.min(1, p));
        const n = Math.round(value * clamped);
        if (spanRef.current) {
          spanRef.current.textContent = `${prefix}${n.toLocaleString()}${suffix}`;
        }
      },
      setValue(v) {
        if (spanRef.current) {
          spanRef.current.textContent = `${prefix}${v.toLocaleString()}${suffix}`;
        }
      },
    }),
    [value, prefix, suffix]
  );

  return (
    <span ref={spanRef} className={`${styles.count} ${className}`}>
      {`${prefix}${value.toLocaleString()}${suffix}`}
    </span>
  );
});

export default CountUp;
