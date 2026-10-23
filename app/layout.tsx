import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Absolute Beast Dominion — Companion Codex & Sanctuary',
  description:
    'Interactive companion and grimoire codex for Absolute Beast Dominion. Features chapter-locked anti-spoiler beast progression, pact master dossier, cognition stages, and embedded Sanity Studio CMS.',
  keywords: [
    'Absolute Beast Dominion',
    'Beast Tamer Codex',
    'Progression Fantasy',
    'Aurelius Leo',
    'Shyra Obsidian Panther',
    'Grimoire Sanctuary',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
