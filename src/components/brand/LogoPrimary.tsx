/**
 * MAHALAKSHMI TOUR & TRAVEL — PRIMARY STACKED LOGO LOCKUP
 * Uses the official brand logo with temple gopuram, soaring birds, and road journey motif.
 */

import React from 'react';
import Image from 'next/image';

interface LogoPrimaryProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LogoPrimary({
  variant = 'light',
  className = '',
  size = 'md',
}: LogoPrimaryProps) {
  const isDark = variant === 'dark';

  const widthDimensions = {
    sm: { width: 160, height: 100 },
    md: { width: 220, height: 140 },
    lg: { width: 320, height: 200 },
  };

  const dim = widthDimensions[size];

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div
        className="relative transition-all duration-300"
        style={{ width: dim.width, maxWidth: '100%' }}
      >
        <Image
          src={isDark ? '/brand/logo-stacked-dark.png' : '/brand/logo-stacked.png'}
          alt="Mahalakshmi Tours and Travels - Your Journey. Our Care."
          width={dim.width * 2}
          height={dim.height * 2}
          className="w-full h-auto object-contain transition-all duration-300"
          priority={size === 'lg'}
        />
      </div>
    </div>
  );
}

