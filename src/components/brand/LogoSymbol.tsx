/**
 * MAHALAKSHMI TOUR & TRAVEL — BRAND EMBLEM & M-MARK SYMBOL
 * Uses the official M-Mark (Gopuram, Road motif, Sun) or circular brand seal.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoSymbolProps {
  size?: number | string;
  variant?: 'light' | 'dark' | 'white';
  type?: 'mark' | 'emblem';
  className?: string;
  href?: string;
}

export function LogoSymbol({
  size = 48,
  variant = 'light',
  type = 'mark',
  className = '',
  href = '/',
}: LogoSymbolProps) {
  const isDark = variant === 'dark' || variant === 'white';

  const imageSrc =
    type === 'emblem'
      ? '/brand/logo-emblem.png'
      : isDark
      ? '/brand/logo-mark-white.png'
      : '/brand/logo-mark.png';

  const isEmblem = type === 'emblem';
  const numSize = typeof size === 'number' ? size : parseInt(size, 10) || 48;
  const computedHeight = numSize;
  const computedWidth = isEmblem ? numSize : Math.round(numSize * 1.73);

  const content = (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${className}`}
      style={{
        height: `${computedHeight}px`,
        width: `${computedWidth}px`,
      }}
    >
      <Image
        src={imageSrc}
        alt="Mahalakshmi Tours and Travels — M Emblem"
        width={computedWidth * 2}
        height={computedHeight * 2}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );


  if (href) {
    return (
      <Link href={href} className="inline-flex items-center group focus-visible:outline-none" aria-label="Mahalakshmi Tours and Travels Home">
        {content}
      </Link>
    );
  }

  return content;
}

