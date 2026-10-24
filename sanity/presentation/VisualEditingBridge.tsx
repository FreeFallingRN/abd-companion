'use client';

import { VisualEditing } from 'next-sanity';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function VisualEditingBridge() {
  const pathname = usePathname();
  const [isStudioPreview, setIsStudioPreview] = useState(false);

  useEffect(() => {
    // Only activate Visual Editing if the page is currently being viewed:
    // 1. Inside an iframe (Sanity Studio Presentation Tool preview)
    // 2. In a popup window spawned by the Studio (window.opener)
    const inIframe = typeof window !== 'undefined' && window.self !== window.top;
    const fromOpener = typeof window !== 'undefined' && Boolean(window.opener);

    if (inIframe || fromOpener) {
      setIsStudioPreview(true);
    }
  }, []);

  if (!isStudioPreview || pathname?.startsWith('/studio')) {
    return null;
  }

  return <VisualEditing zIndex={99999} />;
}
