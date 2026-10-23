import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Absolute Beast Dominion — Codex & Sanctuary',
    short_name: 'ABD Codex',
    description:
      'Interactive companion, grimoire codex, and chapter-locked anti-spoiler beast tracker for Absolute Beast Dominion.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1320',
    theme_color: '#0f1320',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
