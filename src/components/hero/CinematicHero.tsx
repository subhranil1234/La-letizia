'use client';

import React from 'react';
import Image from 'next/image';
import { LogoEmblem } from '../branding/LogoEmblem';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '@/data/cafeData';

interface CinematicHeroProps {
  onOpenBooking: () => void;
  onOpenOrderModal?: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onOpenBooking,
  onOpenOrderModal,
}) => {
  return (
    <section className="relative min-h-screen w-full bg-obsidian text-ivory flex flex-col justify-between pt-24 sm:pt-28 md:pt-36 pb-10 sm:pb-12 px-4 sm:px-6 md:px-12 border-b border-graphite-light overflow-hidden select-none">
      {/* Decorative Oversized Index Watermark */}
      <div
        className="absolute top-16 right-4 sm:right-6 md:right-12 font-mono text-6xl sm:text-8xl md:text-[14rem] font-black text-graphite-light/20 sm:text-graphite-light/30 leading-none pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        01
      </div>

      {/* Top Metadata Bar */}
      <div className="relative z-10 max-w-[1500px] mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-6 sm:pb-8 border-b border-graphite-light">
        <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase">
          <span className="w-2 h-2 bg-electricTeal inline-block shrink-0" />
          <span className="text-ivory font-bold">SPATIAL INDEX // 01</span>
          <span className="text-graphite-light">•</span>
          <span className="text-gold-champagne truncate">ESTD. BALLYGUNGE, KOLKATA</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-ivory-dim">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-neonMagenta inline-block shrink-0" />
            <span>WATERFALL GLASSHOUSE</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span>HONEYCOMB LOUNGE</span>
          <span className="hidden sm:inline">•</span>
          <span>ROOFTOP BALCONY</span>
        </div>
      </div>

      {/* Main Exaggerated Minimalist Headline & Editorial Grid */}
      <div className="relative z-10 max-w-[1500px] mx-auto w-full py-6 sm:py-8 md:py-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Colossal Brand Typography */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <LogoEmblem size={40} glow={false} className="sm:hidden" />
              <LogoEmblem size={48} glow={false} className="hidden sm:inline-flex" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-editorial text-gold-illuminated font-bold">
                ZEROONE ARCHITECTURAL SHOWCASE
              </span>
            </div>

            {/* Solid Giant 900 Typography up to 12rem */}
            <h1 className="font-serif font-black text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] tracking-tight sm:tracking-tighter900 leading-[0.88] uppercase text-ivory break-words">
              LA LETIZIA
            </h1>

            {/* Outlined Headline Layer */}
            <div className="font-serif font-black text-sm xs:text-base sm:text-3xl md:text-4xl lg:text-5xl tracking-tight sm:tracking-tight900 uppercase headline-outline-gold pt-1 sm:pt-2">
              CAFÉ & RESTRO • KOLKATA
            </div>

            <p className="font-sans text-xs sm:text-sm md:text-base text-ivory-muted max-w-xl pt-2 sm:pt-4 leading-relaxed tracking-wide">
              An architectural nocturne defined by cascading water, obsidian-and-gold geometric honeycomb relief, suspended wisteria flora, and curated restro gastronomy.
            </p>
          </div>

          {/* Sharp Real Photograph Showcase Window */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <div className="w-full max-w-sm border border-graphite-light p-2.5 sm:p-3 bg-graphite/40 space-y-2.5 sm:space-y-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-graphite-light">
                <Image
                  src="/images/waterfall-atrium.jpg"
                  alt="La Letizia Waterfall Glasshouse Conservatory"
                  fill
                  priority
                  className="object-cover filter contrast-105"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 sm:py-1 bg-obsidian text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-gold-champagne border border-graphite-light">
                  PLATE 01 // REAL INTERIOR
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-ivory-dim">
                <span>WATERFALL CONSERVATORY</span>
                <span className="text-electricTeal">VERIFIED SPACE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sharp Action CTAs with Instant Inversion Hovers */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-8 md:pt-14">
          <button
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto border-2 border-gold-illuminated bg-gold-illuminated text-obsidian px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs uppercase tracking-widest font-black hover:bg-gold-hover transition-none focus-visible:ring-2 focus-visible:ring-gold-illuminated flex items-center justify-center gap-2"
          >
            <span>[ 01 // DIRECT ONLINE ORDER ]</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto border border-gold-illuminated text-gold-illuminated bg-transparent px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs uppercase tracking-widest font-black hover:bg-gold-illuminated hover:text-obsidian transition-none focus-visible:ring-2 focus-visible:ring-gold-illuminated text-center justify-center"
          >
            [ 02 // RESERVE AN EVENING ]
          </button>

          <a
            href="#menu"
            className="w-full sm:w-auto border border-graphite-light text-ivory-muted bg-transparent px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs uppercase tracking-widest font-bold hover:border-gold-illuminated hover:text-gold-illuminated transition-none text-center justify-center"
          >
            [ 03 // TASTING MENU ]
          </a>
        </div>
      </div>

      {/* Bottom Architectural Index Bar */}
      <div className="relative z-10 max-w-[1500px] mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 pt-6 md:pt-8 border-t border-graphite-light font-mono text-xs text-ivory-dim">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
          <MapPin className="w-4 h-4 text-gold-illuminated shrink-0 mt-0.5 sm:mt-0" />
          <span>70 SOUTH PARK CIRCUS, BALLYGUNGE, KOLKATA (OPP. QUEST MALL GATE 5)</span>
        </div>

        <a
          href="#experience"
          className="flex items-center gap-2 text-gold-champagne hover:text-gold-illuminated transition-none uppercase tracking-widest text-[11px] sm:text-xs"
          aria-label="Scroll down to Section 02"
        >
          <span>SCROLL FOR SPATIAL DESIGN</span>
          <ArrowDown className="w-3.5 h-3.5 text-gold-illuminated" />
        </a>

        <div className="text-[11px] sm:text-xs">
          <span>HOURS: 12:00 PM – 12:30 AM DAILY</span>
        </div>
      </div>
    </section>
  );
};
