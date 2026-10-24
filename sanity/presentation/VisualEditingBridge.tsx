'use client';

import { VisualEditing } from 'next-sanity';
import { usePathname } from 'next/navigation';

export function VisualEditingBridge() {
  const pathname = usePathname();

  // Do not mount VisualEditing when directly browsing the Studio UI to avoid self-nesting
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return <VisualEditing />;
}
