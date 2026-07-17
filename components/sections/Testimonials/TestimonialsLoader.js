'use client';

import dynamic from 'next/dynamic';

// Testimonials pins on desktop and swaps stacked cards on a scrub timeline.
// Kept as a client-only dynamic import so the pin math never runs against a
// server-side layout, and so the section stays out of the initial bundle.
const Testimonials = dynamic(() => import('./Testimonials'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '100vh', background: 'var(--paper)' }} />,
});

export default function TestimonialsLoader() {
  return <Testimonials />;
}
