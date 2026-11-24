'use client';

import React from 'react';

interface CafeCustomLoaderProps {
  progress?: number;
  statusText?: string;
  compact?: boolean;
}

/**
 * Custom bespoke loading icon tailored exclusively for La Letizia Café & Restro:
 * - Outer isometric honeycomb hex ring tracing in illuminated gold
 * - Concentric counter-rotating silver geometric alignment rings
 * - Core pulsing warm Edison filament halo
 * - Staged spatial calibration ticker & real-time percentage meter
 */
export const CafeCustomLoader: React.FC<CafeCustomLoaderProps> = ({
  progress = 100,
  statusText,
  compact = false,
}) => {
  // Staged spatial status messages mapped to the café's authentic architecture
  const resolvedStatus =
    statusText ||
    (progress < 28
      ? '01 // CALIBRATING WATERFALL GLASSHOUSE ATRIUM'
      : progress < 55
      ? '02 // RENDERING HONEYCOMB RELIEF GAME SALON'
      : progress < 82
      ? '03 // ILLUMINATING BOTANICAL ROOFTOP BALCONY'
      : '04 // HARMONIZING ARTISAN RESTRO NOCTURNE');

  const roundedPct = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className={`flex flex-col items-center justify-center select-none font-mono ${compact ? 'space-y-4' : 'space-y-6'}`}>
      {/* Bespoke Concentric Geometric Hexagonal Ring Loader */}
      <div className={`relative flex items-center justify-center ${compact ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-36 h-36 sm:w-44 sm:h-44'}`}>
        {/* Warm Ambient Filament Glow Flare */}
        <div
          className="absolute inset-0 bg-gold-illuminated/15 blur-2xl animate-filament pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer Rotating SVG Honeycomb & Gold Geometry */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full animate-hex-cw pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Dashed Gold Hexagon */}
          <polygon
            points="100,10 178,55 178,145 100,190 22,145 22,55"
            stroke="#E5AE4C"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-hex-trace"
          />

          {/* 6 Corner Node Ticks in Illuminated Gold */}
          <circle cx="100" cy="10" r="4" fill="#F5D99B" />
          <circle cx="178" cy="55" r="4" fill="#F5D99B" />
          <circle cx="178" cy="145" r="4" fill="#F5D99B" />
          <circle cx="100" cy="190" r="4" fill="#F5D99B" />
          <circle cx="22" cy="145" r="4" fill="#F5D99B" />
          <circle cx="22" cy="55" r="4" fill="#F5D99B" />
        </svg>

        {/* Inner Counter-Rotating Silver Ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full animate-hex-ccw pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="100,28 162,64 162,136 100,172 38,136 38,64"
            stroke="#CFD6E2"
            strokeWidth="1.5"
            strokeDasharray="16 12"
            strokeOpacity="0.75"
          />
          {/* Subtle Electric Teal Registration Pip */}
          <circle cx="100" cy="28" r="3" fill="#13C6BA" />
          <circle cx="100" cy="172" r="3" fill="#13C6BA" />
        </svg>

        {/* Central Core: Golden Honeycomb Diamond Node */}
        <div className="w-4 h-4 rotate-45 bg-gold-illuminated/30 border border-gold-illuminated flex items-center justify-center animate-filament">
          <span className="w-1.5 h-1.5 bg-gold-champagne shadow-[0_0_8px_#E5AE4C]" />
        </div>
      </div>

      {/* Technical Status & Calibrated Progress Meter */}
      <div className="text-center space-y-2.5 max-w-md px-4">
        {/* Active Spatial Milestone Status */}
        <div className="flex items-center justify-center gap-2 text-gold-champagne text-[10px] sm:text-[11px] uppercase tracking-widest font-bold">
          <span className="w-1.5 h-1.5 bg-gold-illuminated animate-ping shrink-0" />
          <span>{resolvedStatus}</span>
        </div>

        {/* High-Precision Horizontal Progress Gauge */}
        <div className="w-48 sm:w-72 max-w-[85vw] mx-auto space-y-1">
          <div className="w-full h-1 bg-graphite border border-graphite-light overflow-hidden">
            <div
              className="h-full bg-gold-illuminated transition-all duration-150 ease-out shadow-[0_0_8px_#E5AE4C]"
              style={{ width: `${roundedPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[8px] sm:text-[10px] text-ivory-dim tracking-widest">
            <span className="text-gold-illuminated font-bold">{roundedPct}%</span>
            <span className="truncate ml-2">70 SOUTH PARK CIRCUS</span>
          </div>
        </div>

        {/* Pulsing Status Pips */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 inline-block transition-colors ${
                (i + 1) * 16 <= roundedPct ? 'bg-gold-illuminated' : 'bg-graphite-light'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
