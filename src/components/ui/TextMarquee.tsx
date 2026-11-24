'use client';

import React from 'react';

interface TextMarqueeProps {
  items: string[];
  separator?: string;
  reverse?: boolean;
  speedSeconds?: number;
  outlined?: boolean;
  className?: string;
  badge?: string;
}

export const TextMarquee: React.FC<TextMarqueeProps> = ({
  items,
  separator = '★',
  reverse = false,
  speedSeconds = 35,
  outlined = false,
  className = 'text-2xl md:text-4xl font-serif font-black tracking-tight uppercase',
  badge,
}) => {
  const content = items.join(`  ${separator}  `) + `  ${separator}  `;

  return (
    <div
      className="relative w-full max-w-full overflow-hidden select-none py-3 border-y border-graphite-light bg-obsidian-deep"
      role="region"
      aria-label="Scrolling Text Marquee"
    >
      {badge && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-obsidian border border-gold-illuminated font-mono text-[9px] uppercase tracking-widest text-gold-illuminated">
          <span>{badge}</span>
        </div>
      )}

      <div
        className={`flex whitespace-nowrap will-change-transform ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        style={{
          animationDuration: `${speedSeconds}s`,
        }}
      >
        {/* Render repeated segments to guarantee smooth infinite loop */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <span
            key={idx}
            className={`inline-block pr-8 ${className} ${
              outlined ? 'headline-outline-gold' : 'text-ivory'
            }`}
          >
            {content}
          </span>
        ))}
      </div>
    </div>
  );
};
