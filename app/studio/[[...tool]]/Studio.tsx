'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export function Studio() {
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <NextStudio config={config} />
    </div>
  );
}
