'use client';

import React, { useEffect } from 'react';
import { ReservationPayload } from '@/types';
import { LogoEmblem } from '../branding/LogoEmblem';
import { X, Calendar, Clock, Users, AlertCircle, Printer, Utensils } from 'lucide-react';
import { CAFE_INFO } from '@/data/cafeData';

interface BookingModalProps {
  reservation: ReservationPayload | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ reservation, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (reservation) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [reservation, onClose]);

  if (!reservation) return null;

  const confirmationCode = `LL-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Table Reservation Confirmation"
    >
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Sharp Brutalist Ticket Pass */}
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-obsidian border-2 border-gold-illuminated p-6 sm:p-8 md:p-10 z-10 shadow-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-graphite-light font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gold-illuminated inline-block" />
            <span className="text-gold-illuminated font-bold">VIP TABLE BOARDING PASS</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-graphite-light text-ivory hover:bg-gold-illuminated hover:text-obsidian hover:border-gold-illuminated transition-none focus-visible:ring-2 focus-visible:ring-gold-illuminated"
            aria-label="Close pass"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Simulation Notice Banner */}
        <div className="my-5 p-3.5 bg-graphite/60 border border-gold-illuminated/40 font-mono text-[11px] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-gold-illuminated shrink-0 mt-0.5" />
          <p className="text-ivory-dim leading-relaxed">
            <strong className="text-gold-champagne uppercase block">
              FRONTEND DEMONSTRATION ONLY
            </strong>
            This is a simulated VIP table pass. No real database record or reservation integration exists.
          </p>
        </div>

        {/* Pass Brand Header */}
        <div className="flex items-center justify-between pb-6 border-b border-graphite-light">
          <div className="flex items-center gap-3">
            <LogoEmblem size={38} glow={false} />
            <div>
              <span className="font-serif font-black text-lg tracking-tight uppercase text-ivory block">
                LA LETIZIA
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-gold-champagne/70">
                BALLYGUNGE, KOLKATA • ZEROONE
              </span>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[9px] uppercase tracking-widest text-ivory-dim block">
              PASS REF
            </span>
            <span className="text-sm font-bold text-gold-illuminated">
              {confirmationCode}
            </span>
          </div>
        </div>

        {/* Pass Details Grid */}
        <div className="py-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-ivory-dim uppercase tracking-widest">GUEST NAME</span>
            <span className="font-serif font-bold text-base text-ivory uppercase">
              {reservation.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2 border-b border-white/5">
            <div>
              <span className="text-[10px] text-gold-champagne uppercase tracking-widest block mb-0.5">
                DATE
              </span>
              <span className="font-bold text-ivory">{reservation.date}</span>
            </div>

            <div>
              <span className="text-[10px] text-gold-champagne uppercase tracking-widest block mb-0.5">
                TIME SLOT
              </span>
              <span className="font-bold text-ivory">{reservation.time}</span>
            </div>

            <div>
              <span className="text-[10px] text-gold-champagne uppercase tracking-widest block mb-0.5">
                PARTY SIZE
              </span>
              <span className="font-bold text-ivory">
                {reservation.guests} {reservation.guests === 1 ? 'GUEST' : 'GUESTS'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-gold-champagne uppercase tracking-widest block mb-0.5">
                CORNER
              </span>
              <span className="font-bold text-gold-illuminated truncate block">
                {reservation.cornerPreference}
              </span>
            </div>
          </div>

          {/* Selected Dishes from Tasting Board if any */}
          {reservation.selectedDishes && reservation.selectedDishes.length > 0 && (
            <div className="py-2 border-b border-white/5">
              <span className="text-[10px] text-gold-champagne uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                <Utensils className="w-3 h-3 text-gold-illuminated" />
                <span>PRE-SELECTED TASTING DISHES ({reservation.selectedDishes.length})</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {reservation.selectedDishes.map((dish, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-graphite border border-graphite-light text-[10px] text-ivory-muted"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-ivory-dim pt-1">
            <span>OCCASION: <strong className="text-ivory uppercase">{reservation.occasion}</strong></span>
            <span>CONTACT: <strong className="text-ivory">{reservation.phone}</strong></span>
          </div>
        </div>

        {/* Simulated Magnetic Barcode Strip */}
        <div className="pt-4 border-t border-graphite-light flex flex-col items-center gap-2 text-center">
          <div className="w-full h-7 flex items-center justify-center gap-1 opacity-70">
            {Array.from({ length: 44 }).map((_, i) => (
              <div
                key={i}
                className="bg-gold-champagne h-full"
                style={{
                  width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 2)}px`,
                  opacity: i % 4 === 0 ? 0.9 : 0.6,
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-gold-champagne/60 uppercase">
            * LA-LETIZIA-VIP-SIMULATED-TICKET *
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 font-mono text-xs">
          <button
            onClick={() => window.print()}
            className="border border-graphite-light px-4 py-2.5 text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none flex items-center gap-1.5 uppercase tracking-widest"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT PASS</span>
          </button>

          <button
            onClick={onClose}
            className="border border-gold-illuminated bg-gold-illuminated text-obsidian px-6 py-2.5 uppercase tracking-widest font-black hover:bg-gold-hover transition-none"
          >
            [ DISMISS ]
          </button>
        </div>
      </div>
    </div>
  );
};
