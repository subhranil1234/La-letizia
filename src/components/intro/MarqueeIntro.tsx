'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LogoEmblem } from '../branding/LogoEmblem';
import { CafeCustomLoader } from './CafeCustomLoader';

interface MarqueeIntroProps {
  onComplete: () => void;
  onCurtainOpen?: () => void;
}

export const MarqueeIntro: React.FC<MarqueeIntroProps> = ({ onComplete, onCurtainOpen }) => {
  // Store callbacks in mutable refs so the timeline effect never re-runs or resets on parent re-renders
  const onCompleteRef = useRef(onComplete);
  const onCurtainOpenRef = useRef(onCurtainOpen);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onCurtainOpenRef.current = onCurtainOpen;
  });

  const [phase, setPhase] = useState<'streaming' | 'converging' | 'active_showcase' | 'curtain_open'>('streaming');
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCurtainOpenRef.current?.();
      onCompleteRef.current();
      return;
    }

    // Systematic, deterministic linear animation timeline
    // The unified Title Card + Custom Loader remains on screen TOGETHER for the full duration
    const timeline = [
      // 0ms -> Streaming at full velocity across 5 vectors (pace intact)
      // 800ms -> Marquees decelerate and magnetically collapse towards the center
      { time: 800, action: () => setPhase('converging') },

      // 1100ms -> UNIFIED TITLE CARD + BESPOKE LOADER REVEALS & REMAINS PERSISTENT TOGETHER
      { time: 1100, action: () => setPhase('active_showcase') },

      // 6000ms (Active showcase stays persistently from 1.1s to 6.0s = 4.9 full seconds!)
      // Dynamic Website Start! Architectural shutter split & horizontal laser beam
      {
        time: 6000,
        action: () => {
          setPhase('curtain_open');
          onCurtainOpenRef.current?.();
        },
      },

      // 6750ms -> Shutter animation complete, unmount cleanly and hand over full interactivity
      {
        time: 6750,
        action: () => {
          onCompleteRef.current();
        },
      },
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    const startTime = Date.now();
    const interval = setInterval(() => {
      const now = Date.now() - startTime;
      setElapsedMs(Math.min(6750, now));
    }, 25);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []); // Strictly empty dependency array: guaranteed to run once and only once per intro session!

  const handleSkip = () => {
    setPhase('curtain_open');
    onCurtainOpenRef.current?.();
    setTimeout(() => {
      onCompleteRef.current();
    }, 450);
  };

  const progressPercent = Math.min(100, (elapsedMs / 6750) * 100);
  const secondsDisplay = (elapsedMs / 1000).toFixed(1);

  // Live loader progress starts smoothly at 1100ms and finishes at 6000ms (4900ms duration)
  const loaderProgress = Math.min(
    100,
    Math.max(0, ((elapsedMs - 1100) / 4900) * 100)
  );

  return (
    <aside
      className="fixed inset-0 z-[100] overflow-hidden select-none pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-label="La Letizia Introductory Cinematic Kinetic Typography"
    >
      {/* =========================================================================
          DYNAMIC SHUTTER CURTAIN SPLIT (Top and Bottom Architectural Panels)
          ========================================================================= */}
      {/* Top Shutter Panel */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-obsidian-deep border-b border-gold-illuminated/40 z-20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === 'curtain_open' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-graphite/30 via-obsidian to-obsidian" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#20201E_1px,transparent_1px),linear-gradient(to_bottom,#20201E_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      </div>

      {/* Bottom Shutter Panel */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-obsidian-deep border-t border-gold-illuminated/40 z-20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === 'curtain_open' ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-graphite/30 via-obsidian to-obsidian" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#20201E_1px,transparent_1px),linear-gradient(to_bottom,#20201E_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      </div>

      {/* Central Luminous Gold Laser Dividing Line */}
      {phase === 'curtain_open' && (
        <div
          className="absolute top-1/2 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-illuminated to-transparent z-40 animate-laser pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* =========================================================================
          MAIN INTRO STAGE CONTENT (Fades out when shutter curtain opens)
          ========================================================================= */}
      <div
        className={`absolute inset-0 z-30 flex items-center justify-center p-4 transition-opacity duration-300 pointer-events-auto ${
          phase === 'curtain_open' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Corner Technical Registration Marks */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-champagne/70 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-electricTeal inline-block shrink-0" />
          <span className="hidden xs:inline">ZEROONE // SENSORY PROLOGUE</span>
          <span className="xs:hidden">ZEROONE</span>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 font-mono text-[10px] uppercase tracking-widest text-ivory-dim/60 hidden sm:block">
          <span>BALLYGUNGE 700017 • LAT 22.5392° N / LONG 88.3653° E</span>
        </div>

        {/* Top Right Skip CTA */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-40">
          <button
            onClick={handleSkip}
            className="border border-graphite-light text-ivory-dim hover:text-gold-illuminated hover:border-gold-illuminated px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest transition-none focus-visible:ring-2 focus-visible:ring-gold-illuminated"
            aria-label="Skip intro animation"
          >
            [ SKIP INTRO ]
          </button>
        </div>

        {/* STAGE 1: FAST MARQUEE STREAMS (Pace Intact across 5 Vectors) */}
        <div
          className={`absolute inset-0 pointer-events-none flex flex-col justify-around py-8 transition-all duration-700 ease-out ${
            phase !== 'streaming'
              ? 'scale-40 opacity-0 blur-lg translate-y-0'
              : 'scale-100 opacity-90 blur-0'
          }`}
          aria-hidden="true"
        >
          {/* Band 01: Angled -6deg, Left to Right, Gold Champagne Serif */}
          <div className="w-[180vw] -ml-[40vw] rotate-[-6deg] overflow-hidden whitespace-nowrap intro-stream-l">
            <div className="inline-block font-serif font-black text-3xl sm:text-5xl md:text-7xl uppercase tracking-tighter900 text-gold-champagne/80">
              WATERFALL ATRIUM ★ HONEYCOMB RELIEF ★ ZEROONE ARCHITECTURE ★ ARTISAN MOCKTAILS ★ WATERFALL ATRIUM ★ HONEYCOMB RELIEF ★
            </div>
          </div>

          {/* Band 02: Angled 7deg, Right to Left, Outlined Ivory Serif */}
          <div className="w-[180vw] -ml-[40vw] rotate-[7deg] overflow-hidden whitespace-nowrap intro-stream-r">
            <div className="inline-block font-serif font-black text-2xl sm:text-4xl md:text-6xl uppercase tracking-tight900 headline-outline-ivory opacity-75">
              // BALLYGUNGE 700017 // CRAFT KEBABS // BOTANICAL BALCONY // FOOSBALL SALON // BALLYGUNGE 700017 // CRAFT KEBABS //
            </div>
          </div>

          {/* Band 03: Angled -3deg, Left to Right, Electric Teal Monospace */}
          <div className="w-[180vw] -ml-[40vw] rotate-[-3deg] overflow-hidden whitespace-nowrap intro-stream-l">
            <div className="inline-block font-mono font-bold text-lg sm:text-2xl md:text-3xl uppercase tracking-widest text-electricTeal/90">
              CASSEROLE COFFEE • CASUAL LUXURY • OPPOSITE QUEST MALL GATE 5 • ZEROONE • CASSEROLE COFFEE • CASUAL LUXURY •
            </div>
          </div>

          {/* Band 04: Angled 5deg, Right to Left, Outlined Gold Serif */}
          <div className="w-[180vw] -ml-[40vw] rotate-[5deg] overflow-hidden whitespace-nowrap intro-stream-r">
            <div className="inline-block font-serif font-black text-2xl sm:text-4xl md:text-6xl uppercase tracking-tight900 headline-outline-gold opacity-80">
              WATER WALL CASCADE • EXAGGERATED MINIMALISM • ROYAL SHEESHA • OBSIDIAN NOIR • WATER WALL CASCADE •
            </div>
          </div>

          {/* Band 05: Angled -1deg, Left to Right, Neon Magenta Monospace */}
          <div className="w-[180vw] -ml-[40vw] rotate-[-1deg] overflow-hidden whitespace-nowrap intro-stream-l">
            <div className="inline-block font-mono font-bold text-base sm:text-xl md:text-2xl uppercase tracking-widest text-neonMagenta/85">
              LA LETIZIA CAFÉ & RESTRO • 12:00 PM – 12:30 AM DAILY • RESTRO GASTRONOMY • LA LETIZIA CAFÉ & RESTRO •
            </div>
          </div>
        </div>

        {/* STAGE 2: UNIFIED PERSISTENT TITLE CARD & BESPOKE CUSTOM LOADER
            STAYS ON SCREEN TOGETHER UNTIL FULL DURATION (From 1.1s to 6.0s) */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto overflow-hidden transition-all duration-700 ease-out select-none ${
            phase === 'active_showcase'
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute'
          }`}
        >
          {/* Architectural Framing Brackets Framing the Unified Showcase */}
          <div className="absolute -inset-3 sm:-inset-6 md:-inset-8 border border-gold-illuminated/30 pointer-events-none" />
          <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 md:-top-8 md:-left-8 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-l-2 border-gold-illuminated pointer-events-none" />
          <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 md:-top-8 md:-right-8 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-r-2 border-gold-illuminated pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 md:-bottom-8 md:-left-8 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-l-2 border-gold-illuminated pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 sm:-bottom-8 sm:-right-8 md:-bottom-8 md:-right-8 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-r-2 border-gold-illuminated pointer-events-none" />

          {/* Unified Brand Showcase: Logo Emblem + Colossal Title Card */}
          <div className="space-y-1.5 sm:space-y-3">
            <div className="flex items-center justify-center gap-2 font-mono text-[8px] sm:text-[10px] uppercase tracking-editorial text-gold-illuminated font-bold">
              <span className="w-1.5 h-[1px] bg-gold-illuminated" />
              <span>ZEROONE NOCTURNE DESTINATION</span>
              <span className="w-1.5 h-[1px] bg-gold-illuminated" />
            </div>

            {/* Emblem and Brand Monogram */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3">
              <div className="sm:hidden">
                <LogoEmblem size={38} glow={true} />
              </div>
              <div className="hidden sm:block">
                <LogoEmblem size={50} glow={true} />
              </div>
              <div className="text-left font-mono">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-champagne/80 block">
                  BALLYGUNGE, KOLKATA
                </span>
                <span className="text-[8px] sm:text-[9px] text-ivory-dim tracking-wider block">
                  ESTABLISHED 2024
                </span>
              </div>
            </div>

            {/* Colossal 900 Title with Traveling Gold Metallic Shimmer */}
            <h1 className="font-serif font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.88] uppercase tracking-tighter900 intro-title-slow drop-shadow-2xl">
              <span className="intro-shimmer">LA LETIZIA</span>
            </h1>

            {/* Outlined Subtitle */}
            <div className="font-serif font-black text-xs sm:text-xl md:text-2xl lg:text-3xl tracking-tight900 uppercase headline-outline-gold">
              CAFÉ & RESTRO
            </div>
          </div>

          {/* Gold Hairline Divider */}
          <div className="w-20 sm:w-36 h-[1px] bg-gradient-to-r from-transparent via-gold-illuminated to-transparent my-2 sm:my-4" />

          {/* Bespoke Honeycomb & Hexagonal Ring Loader (Co-existing seamlessly under the Title) */}
          <div className="w-full">
            <CafeCustomLoader
              progress={loaderProgress}
              compact={true}
            />
          </div>
        </div>

        {/* Bottom Time Progress Indicator */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-graphite-light">
          <div
            className="h-full bg-gold-illuminated transition-all ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="absolute bottom-3 right-6 font-mono text-[9px] uppercase tracking-widest text-gold-champagne">
          <span>{secondsDisplay}S // 6.8S</span>
        </div>
      </div>
    </aside>
  );
};
