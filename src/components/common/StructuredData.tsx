'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Add structured data to the document head
    const scripts = Array.isArray(data) ? data : [data];
    
    scripts.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      script.id = `structured-data-${Date.now()}-${Math.random()}`;
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup: remove scripts on unmount
      const structuredDataScripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      structuredDataScripts.forEach((script) => {
        if (script.id?.startsWith('structured-data-')) {
          script.remove();
        }
      });
    };
  }, [data]);

  return null;
}

