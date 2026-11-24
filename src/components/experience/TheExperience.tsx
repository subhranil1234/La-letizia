'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';

export const TheExperience: React.FC = () => {
  const [activeZone, setActiveZone] = useState(0);

  const zones = [
    {
      id: 'waterfall',
      code: 'ZONE 01',
      title: 'THE WATERFALL ATRIUM',
      accentColor: '#CE4AAB',
      tag: 'CASCADING WATER WALL',
      image: '/images/waterfall-atrium.jpg',
      headline: 'LIVING WATER CASCADE & MAGENTA NEON REFLECTIONS',
      description:
        'A soaring glass conservatory centered around an indoor cascading water wall under vibrant magenta neon. Natural handwoven bell pendants hang over cognac velvet armchairs beneath a living botanical overhang, creating a sensory oasis in Ballygunge.',
      metrics: ['Continuous waterfall wall', 'Woven bell pendant lamps', 'Velvet armchair seating'],
      quote: 'Where rhythmic falling water replaces urban Kolkata soundscapes.',
    },
    {
      id: 'honeycomb',
      code: 'ZONE 02',
      title: 'THE HONEYCOMB LOUNGE',
      accentColor: '#E5AE4C',
      tag: 'GEOMETRIC GAME SALON',
      image: '/images/honeycomb-lounge.jpg',
      headline: 'BLACK & GOLD HEXAGONAL MOSAIC & TABLE FOOSBALL',
      description:
        'A bold departure from conventional dining. Defined by bespoke obsidian-and-gold geometric honeycomb wall relief, booths with under-seat illuminated hexagonal bases, a black velvet high-back throne, and a custom foosball table for spirited evening games.',
      metrics: ['Hexagonal relief architecture', 'Championship foosball table', 'Illuminated booth pedestals'],
      quote: 'Where geometric precision meets unpretentious social play.',
    },
    {
      id: 'balcony',
      code: 'ZONE 03',
      title: 'THE BOTANICAL BALCONY',
      accentColor: '#244D38',
      tag: 'ROOFTOP OPEN-AIR VERANDA',
      image: '/images/botanical-balcony.jpg',
      headline: 'TRAILING IVY, SKYLINE BREEZES & FAIRY LIGHTS',
      description:
        'Perched above South Park Circus, this open-air terrace is draped in trailing ivy garlands, warm fairy light constellations, and woven rattan armchairs. Designed for romantic dinners and late-night dessert conversations beneath open Kolkata skies.',
      metrics: ['Open-air rooftop veranda', 'Panoramic skyline breezes', 'Handwoven rattan seating'],
      quote: 'Al fresco twilight dining above the South Kolkata avenues.',
    },
    {
      id: 'bar',
      code: 'ZONE 04',
      title: 'THE MIRROR BAR',
      accentColor: '#F5D99B',
      tag: 'FILAMENT CRAFT STATION',
      image: '/images/bar-edison-bottles.jpg',
      headline: 'SUSPENDED ROPE FILAMENTS & MIRRORED GLASS',
      description:
        'Framed by an expansive mirrored bottle showcase and suspended rustic nautical rope Edison bulbs. Our mixologists shake botanical mocktails, cold brew infusions, and signature fruit reductions tableside.',
      metrics: ['Suspended nautical rope bulbs', 'Curated botanical coolers', 'Fluted under-bar lighting'],
      quote: 'Handcrafted mocktails brewed with house syrups and citrus oils.',
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 md:py-36 scroll-mt-24 md:scroll-mt-28 bg-obsidian text-ivory border-b border-graphite-light overflow-hidden select-none"
    >
      {/* Massive Decorative Index Number */}
      <div
        className="absolute top-12 right-6 md:right-12 font-mono text-8xl md:text-[14rem] font-black text-graphite-light/20 leading-none pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        02
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-graphite-light">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-gold-champagne font-bold">
              <span>INDEX // 02</span>
              <span>—</span>
              <span>SPATIAL ARCHITECTURE</span>
            </div>
            <h2 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight900 uppercase text-ivory">
              THE <span className="headline-outline-gold">EXPERIENCE</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-ivory-dim tracking-widest uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-illuminated" />
            <span>AUTHENTIC PHOTOGRAPHY ARCHIVE</span>
          </div>
        </div>

        {/* Sharp Tabular Zone Switcher */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-graphite-light">
          {zones.map((zone, idx) => {
            const isActive = activeZone === idx;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(idx)}
                className={`p-6 text-left border-r last:border-r-0 border-graphite-light transition-none relative flex flex-col justify-between h-36 ${
                  isActive
                    ? 'bg-gold-illuminated text-obsidian font-black'
                    : 'bg-graphite/40 text-ivory hover:bg-graphite hover:text-gold-illuminated'
                }`}
              >
                <div className="flex items-center justify-between w-full font-mono text-[11px] tracking-widest">
                  <span className={isActive ? 'text-obsidian font-bold' : 'text-gold-champagne/70'}>
                    {zone.code}
                  </span>
                  <span
                    className="w-2 h-2 inline-block"
                    style={{ backgroundColor: zone.accentColor }}
                  />
                </div>

                <div>
                  <span className="font-serif font-black text-sm md:text-base tracking-tight block uppercase leading-snug">
                    {zone.title}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-widest uppercase block mt-1 ${
                      isActive ? 'text-obsidian/80' : 'text-ivory-dim'
                    }`}
                  >
                    {zone.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Zone Editorial Presentation */}
        <div className="border border-graphite-light p-6 md:p-12 bg-graphite/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Real Photograph with Sharp High-Contrast Frame */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full border-2 border-graphite-light bg-obsidian overflow-hidden">
                <Image
                  src={zones[activeZone].image}
                  alt={zones[activeZone].title}
                  fill
                  className="object-cover filter contrast-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-obsidian text-gold-champagne font-mono text-[10px] uppercase tracking-widest border border-graphite-light">
                  REAL PHOTOGRAPH // {zones[activeZone].code}
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-gold-champagne uppercase tracking-widest font-bold block">
                  {zones[activeZone].tag}
                </span>
                <h3 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-ivory uppercase leading-tight">
                  {zones[activeZone].headline}
                </h3>
              </div>

              <p className="font-sans text-sm md:text-base text-ivory-muted leading-relaxed">
                {zones[activeZone].description}
              </p>

              {/* Architectural Metrics */}
              <div className="space-y-2 pt-2 border-t border-graphite-light">
                {zones[activeZone].metrics.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 font-mono text-xs text-ivory">
                    <span className="text-gold-illuminated font-bold">+</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>

              {/* Architectural Quote */}
              <div className="p-4 bg-obsidian border-l-2 border-gold-illuminated font-serif italic text-xs md:text-sm text-gold-champagne">
                &ldquo;{zones[activeZone].quote}&rdquo;
              </div>

              {/* Instant Inversion Jump Link */}
              <div className="pt-2">
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 border border-gold-illuminated text-gold-illuminated px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-gold-illuminated hover:text-obsidian transition-none"
                >
                  <span>[ VIEW IN PHOTO ARCHIVE ]</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
