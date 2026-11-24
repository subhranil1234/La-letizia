'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { CornerItem } from '@/types';
import { X, Check, ArrowRight, MapPin } from 'lucide-react';

interface CornerModalProps {
  corner: CornerItem | null;
  onClose: () => void;
  onSelectForBooking: (cornerTitle: string) => void;
}

export const CornerModal: React.FC<CornerModalProps> = ({
  corner,
  onClose,
  onSelectForBooking,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (corner) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [corner, onClose]);

  if (!corner) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
      role="dialog"
      aria-modal="true"
      aria-label={corner.title}
    >
      {/* Sharp dark backdrop */}
      <div
        className="absolute inset-0 bg-obsidian/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog Card with Sharp Brutalist Architecture */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-obsidian border-2 border-gold-illuminated p-4 sm:p-8 md:p-10 z-10 flex flex-col gap-6 shadow-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-graphite-light font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 inline-block"
              style={{ backgroundColor: corner.vibeColor }}
            />
            <span className="text-gold-champagne font-bold">
              PLATE INSPECTION // {corner.ambiance}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-graphite-light text-ivory hover:bg-gold-illuminated hover:text-obsidian hover:border-gold-illuminated transition-none focus-visible:ring-2 focus-visible:ring-gold-illuminated"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Photograph Frame */}
        <div className="relative aspect-[16/10] w-full border border-graphite-light overflow-hidden bg-obsidian-deep">
          <Image
            src={corner.image}
            alt={corner.title}
            fill
            className="object-cover filter contrast-105"
            priority
          />
          <div className="absolute top-3 left-3 px-3 py-1 bg-obsidian border border-graphite-light font-mono text-[10px] text-gold-champagne uppercase tracking-widest">
            AUTHENTIC KOLKATA PHOTOGRAPH
          </div>
        </div>

        {/* Narrative & Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
          <div className="md:col-span-7 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold-champagne font-bold block">
              {corner.subtitle}
            </span>
            <h3 className="font-serif font-black text-2xl md:text-3xl tracking-tight text-ivory uppercase">
              {corner.title}
            </h3>
            <p className="font-sans text-sm md:text-base text-ivory-muted leading-relaxed pt-2">
              {corner.description}
            </p>
          </div>

          <div className="md:col-span-5 p-5 bg-graphite/40 border border-graphite-light space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-gold-champagne font-bold">
              SPATIAL ATTRIBUTES
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-ivory">
              {corner.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold-illuminated shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-graphite-light font-mono text-xs">
          <div className="flex items-center gap-2 text-ivory-dim">
            <MapPin className="w-4 h-4 text-gold-illuminated shrink-0" />
            <span>LA LETIZIA, 70 SOUTH PARK CIRCUS, BALLYGUNGE</span>
          </div>

          <button
            onClick={() => {
              onSelectForBooking(corner.title);
              onClose();
            }}
            className="w-full sm:w-auto border-2 border-gold-illuminated text-gold-illuminated bg-transparent px-8 py-3.5 uppercase tracking-widest font-black hover:bg-gold-illuminated hover:text-obsidian transition-none flex items-center justify-center gap-2"
          >
            <span>[ RESERVE THIS CORNER ]</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
