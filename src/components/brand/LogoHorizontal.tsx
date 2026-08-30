/**
 * MAHALAKSHMI TOURS AND TRAVELS — AUTHENTIC HORIZONTAL LOGO LOCKUP
 * High-visibility brand logo presentation for header and footer.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoHorizontalProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LogoHorizontal({
  variant = 'light',
  className = '',
  size = 'md',
}: LogoHorizontalProps) {
  const isDark = variant === 'dark';

  const heightClasses = {
    sm: 'h-[48px] sm:h-[54px] w-auto',
    md: 'h-[62px] sm:h-[72px] md:h-[82px] w-auto',
    lg: 'h-[76px] sm:h-[90px] md:h-[104px] w-auto',
    xl: 'h-[90px] sm:h-[108px] md:h-[124px] w-auto',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center group focus-visible:outline-none transition-transform hover:opacity-95 shrink-0 ${className}`}
      aria-label="Mahalakshmi Tours and Travels Home"
    >
      <div className={`relative ${heightClasses[size]} flex items-center shrink-0`}>
        <Image
          src={isDark ? '/brand/logo-horizontal-dark.png' : '/brand/logo-horizontal.png'}
          alt="Mahalakshmi Tours and Travels - Your Journey. Our Care."
          width={500}
          height={160}
          className="h-full w-auto object-contain transition-all duration-300"
          priority
        />
      </div>
    </Link>
  );
}

