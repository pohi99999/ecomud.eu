'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  children: ReactNode;
  /** Array of image paths for crossfade slideshow */
  images?: string[];
  /** Video path for video background (overrides images) */
  video?: string;
  /** Interval between slides in ms (default: 5000) */
  interval?: number;
  /** Extra height class (default: py-20 lg:py-28) */
  className?: string;
  /** Whether this is the large homepage hero */
  fullHeight?: boolean;
}

export default function HeroSection({
  children,
  images,
  video,
  interval = 5000,
  className = 'py-20 lg:py-28',
  fullHeight = false,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <section
      className={`relative overflow-hidden ${fullHeight ? 'min-h-[90vh] flex items-center' : ''} ${className}`}
    >
      {/* Video background */}
      {video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* Image slideshow background */}
      {!video && images && images.length > 0 && (
        <>
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                i === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              priority={i === 0}
              sizes="100vw"
            />
          ))}
        </>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1B4332]/70" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
