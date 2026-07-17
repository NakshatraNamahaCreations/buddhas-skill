'use client';

import dynamic from 'next/dynamic';

// Tracks is heavy (horizontal pin, per-card refs, chip staggers) and lives
// below the fold, so we defer it. ssr:false requires a client-component parent —
// hence this thin wrapper — and prevents the horizontal-scroll math from
// running against a server-side layout where window.innerWidth is undefined.
const Tracks = dynamic(() => import('./Tracks'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '100vh', background: 'var(--obsidian)' }} />,
});

export default function TracksLoader() {
  return <Tracks />;
}
