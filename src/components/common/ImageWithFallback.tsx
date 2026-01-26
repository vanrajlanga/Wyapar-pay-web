'use client';

import { useState } from 'react';
import Image from 'next/image';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  style?: React.CSSProperties;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  width,
  height,
  fill,
  style,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    if (!didError) {
      setDidError(true);
      setImgSrc(ERROR_IMG_SRC);
    }
  };

  // For external images, we need to configure Next.js to allow them
  // For now, use a regular img tag for external URLs
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={didError ? ERROR_IMG_SRC : imgSrc}
        alt={alt}
        className={className}
        style={
          fill
            ? { width: '100%', height: '100%', objectFit: 'cover', ...style }
            : style
        }
        onError={handleError}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        style={style}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      onError={handleError}
      style={style}
    />
  );
}
