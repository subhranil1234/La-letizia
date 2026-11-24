import React from 'react';

interface LogoEmblemProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
  withText?: boolean;
}

/**
 * Reconstructed geometric interlocking gold & silver emblem based on the
 * official illuminated facade signage at La Letizia Café & Restro, Kolkata.
 * 
 * Features:
 * - Outer isometric hexagonal ribbon in illuminated warm gold
 * - Inner interlocking geometric 'L' polygon in brilliant polished silver/white
 * - Fully modular & editable SVG geometry
 */
export const LogoEmblem: React.FC<LogoEmblemProps> = ({
  className = '',
  size = 48,
  glow = true,
  withText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
        role="img"
        aria-label="La Letizia Interlocking Hexagonal Logo Emblem"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldRibbonGrad" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF3D6" />
            <stop offset="25%" stopColor="#F5D99B" />
            <stop offset="65%" stopColor="#E5AE4C" />
            <stop offset="100%" stopColor="#9E6E1D" />
          </linearGradient>

          {/* Gold Shadow / Deep Gradient */}
          <linearGradient id="goldDeepGrad" x1="40" y1="60" x2="120" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C88E2D" />
            <stop offset="100%" stopColor="#63410E" />
          </linearGradient>

          {/* Silver Monogram Gradient */}
          <linearGradient id="silverRibbonGrad" x1="45" y1="35" x2="115" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#EDF1F7" />
            <stop offset="70%" stopColor="#CFD6E2" />
            <stop offset="100%" stopColor="#8C94A0" />
          </linearGradient>

          {/* Warm Glow Filter */}
          {glow && (
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="10" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" opacity="0.3" />
                <feMergeNode in="blur1" opacity="0.5" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        <g filter={glow ? "url(#logoGlow)" : undefined}>
          {/* OUTER GOLD HEXAGONAL FACETED LOOP */}
          {/* Upper left & top outer corner */}
          <path
            d="M80 14L136 46V76L80 44L38 68L24 60L80 14Z"
            fill="url(#goldRibbonGrad)"
          />

          {/* Lower & Left outer bracket */}
          <path
            d="M24 60L38 68V106L80 130L80 146L24 114V60Z"
            fill="url(#goldDeepGrad)"
          />

          {/* Bottom right return anchor */}
          <path
            d="M80 146L136 114L136 98L80 130V146Z"
            fill="url(#goldRibbonGrad)"
          />

          {/* INNER INTERLOCKING SILVER / WHITE 'L' MONOGRAM */}
          {/* Vertical down spine of the L */}
          <path
            d="M74 38L92 28L92 108L74 118V38Z"
            fill="url(#silverRibbonGrad)"
          />

          {/* Horizontal base shelf of the L connecting through the hexagon */}
          <path
            d="M74 102L122 74L122 92L74 118V102Z"
            fill="url(#silverRibbonGrad)"
          />

          {/* Inner facet bevel line highlights for illuminated realism */}
          <path
            d="M80 18L132 48L132 72"
            stroke="#FFF9E6"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M90 32L90 106L120 88"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>
      </svg>

      {withText && (
        <div className="flex flex-col tracking-wider">
          <span className="font-serif text-lg font-bold tracking-[0.2em] text-ivory leading-none">
            LA LETIZIA
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-champagne font-sans font-light mt-1">
            Café & Restro • Kolkata
          </span>
        </div>
      )}
    </div>
  );
};
