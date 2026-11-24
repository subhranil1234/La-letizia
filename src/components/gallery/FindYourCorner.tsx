'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { CORNER_GALLERY } from '@/data/cafeData';
import { CornerItem } from '@/types';
import { CornerModal } from './CornerModal';
import { ArrowUpRight } from 'lucide-react';

interface FindYourCornerProps {
  onSelectCornerForBooking: (cornerName: string) => void;
}

export const FindYourCorner: React.FC<FindYourCornerProps> = ({
  onSelectCornerForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalCorner, setActiveModalCorner] = useState<CornerItem | null>(null);

  const categories = [
    { id: 'all', label: 'ALL CORNERS', count: CORNER_GALLERY.length },
    {
      id: 'glasshouse',
      label: 'WATERFALL GLASSHOUSE',
      count: CORNER_GALLERY.filter((c) => c.category === 'glasshouse').length,
    },
    {
      id: 'lounge',
      label: 'HONEYCOMB LOUNGE',
      count: CORNER_GALLERY.filter((c) => c.category === 'lounge').length,
    },
    {
      id: 'terrace',
      label: 'BALCONY & PERGOLA',
      count: CORNER_GALLERY.filter((c) => c.category === 'terrace').length,
    },
    {
      id: 'bar',
      label: 'MIRROR BAR',
      count: CORNER_GALLERY.filter((c) => c.category === 'bar').length,
    },
  ];

  const filteredCorners = useMemo(() => {
    if (selectedCategory === 'all') return CORNER_GALLERY;
    return CORNER_GALLERY.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-36 scroll-mt-24 md:scroll-mt-28 bg-obsidian-deep text-ivory border-b border-graphite-light overflow-hidden select-none"
    >
      {/* Decorative Oversized Index Watermark */}
      <div
        className="absolute top-12 right-6 md:right-12 font-mono text-8xl md:text-[14rem] font-black text-graphite-light/20 leading-none pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        03
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-graphite-light">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-gold-champagne font-bold">
              <span>INDEX // 03</span>
              <span>—</span>
              <span>AUTHENTIC SPATIAL ARCHIVE</span>
            </div>
            <h2 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight900 uppercase text-ivory">
              FIND YOUR <span className="headline-outline-gold">CORNER</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-ivory-dim tracking-widest uppercase">
            <span>[ 11 REAL PHOTOGRAPHS // ZERO STOCK ASSETS ]</span>
          </div>
        </div>

        {/* Sharp Category Filter Bar with Edge Fade Affordance */}
        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-3 font-mono text-xs uppercase tracking-widest border transition-none whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'border-gold-illuminated bg-gold-illuminated text-obsidian font-black'
                      : 'border-graphite-light bg-graphite/40 text-ivory-muted hover:border-gold-illuminated hover:text-gold-illuminated hover:bg-graphite'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={isActive ? 'text-obsidian' : 'text-gold-champagne/80'}>
                    [{cat.count}]
                  </span>
                </button>
              );
            })}
          </div>
          <div className="absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-obsidian-deep to-transparent pointer-events-none sm:hidden" />
        </div>

        {/* Sharp Asymmetrical Grid of Real Photographs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCorners.map((corner, index) => {
            const isFeatured = index === 0 && selectedCategory === 'all';
            return (
              <div
                key={corner.id}
                onClick={() => setActiveModalCorner(corner)}
                className={`group border border-graphite-light bg-graphite/20 p-3 hover:border-gold-illuminated hover:bg-graphite/60 transition-none cursor-pointer flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                {/* Photo Viewport */}
                <div className="relative w-full h-[75%] border border-graphite-light overflow-hidden bg-obsidian">
                  <Image
                    src={corner.image}
                    alt={corner.title}
                    fill
                    className="object-cover filter contrast-105 group-hover:scale-102 transition-transform duration-150"
                    sizes={isFeatured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                  />

                  {/* Top Photographic Metadata Tag */}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-obsidian border border-graphite-light font-mono text-[9px] uppercase tracking-widest text-gold-champagne">
                      PLATE {String(index + 1).padStart(2, '0')} // 11
                    </span>
                    <span
                      className="w-2 h-2 inline-block border border-black/40"
                      style={{ backgroundColor: corner.vibeColor }}
                      title={`Ambiance: ${corner.ambiance}`}
                    />
                  </div>

                  <div className="absolute top-2 right-2 p-1.5 bg-obsidian border border-graphite-light text-ivory opacity-0 group-hover:opacity-100 transition-none">
                    <ArrowUpRight className="w-4 h-4 text-gold-illuminated" />
                  </div>
                </div>

                {/* Bottom Content Bar */}
                <div className="pt-3 flex items-end justify-between gap-4 font-mono">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gold-champagne block">
                      {corner.subtitle}
                    </span>
                    <h3 className="font-serif font-black text-base md:text-lg tracking-tight text-ivory uppercase group-hover:text-gold-illuminated transition-none mt-0.5">
                      {corner.title}
                    </h3>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-ivory-dim shrink-0">
                    [ INSPECT ]
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Corner Inspection Modal */}
      <CornerModal
        corner={activeModalCorner}
        onClose={() => setActiveModalCorner(null)}
        onSelectForBooking={(title) => {
          onSelectCornerForBooking(title);
          const el = document.getElementById('reservation');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </section>
  );
};
