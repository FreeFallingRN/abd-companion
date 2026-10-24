'use client';

import { VisualEditing } from 'next-sanity';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function VisualEditingBridge() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname?.startsWith('/studio')) {
    return null;
  }

  return <VisualEditing />;
}
