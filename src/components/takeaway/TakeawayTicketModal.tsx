'use client';

import React, { useEffect } from 'react';
import { TakeawayPayload } from '@/types';
import { LogoEmblem } from '../branding/LogoEmblem';
import { X, Clock, MapPin, AlertCircle, Printer, ShoppingBag } from 'lucide-react';
import { CAFE_INFO } from '@/data/cafeData';

interface TakeawayTicketModalProps {
  order: TakeawayPayload | null;
  onClose: () => void;
}

export const TakeawayTicketModal: React.FC<TakeawayTicketModalProps> = ({ order, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (order) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [order, onClose]);

  if (!order) return null;

  const tokenNumber = `TK-${Math.floor(100 + Math.random() * 900)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Takeaway Pickup Ticket"
    >
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Sharp Brutalist Ticket Pass */}
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-obsidian border-2 border-gold-illuminated p-4 sm:p-8 z-10 shadow-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-graphite-light font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-gold-illuminated" />
            <span className="text-gold-illuminated font-bold">
              EXPRESS COUNTER TAKEAWAY TOKEN
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-graphite-light text-ivory hover:bg-gold-illuminated hover:text-obsidian hover:border-gold-illuminated transition-none focus-visible:ring-2 focus-visible:ring-gold-illuminated"
            aria-label="Close ticket"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Simulation Notice Banner */}
        <div className="my-4 p-3 bg-graphite/60 border border-gold-illuminated/40 font-mono text-[11px] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-gold-illuminated shrink-0 mt-0.5" />
          <p className="text-ivory-dim leading-relaxed">
            <strong className="text-gold-champagne uppercase block">
              DEMONSTRATION COUNTER TOKEN
            </strong>
            This simulated pickup pass demonstrates frontend takeaway order validation. No payment was charged.
          </p>
        </div>

        {/* Token Brand Header */}
        <div className="flex items-center justify-between pb-5 border-b border-graphite-light">
          <div className="flex items-center gap-3">
            <LogoEmblem size={36} glow={false} />
            <div>
              <span className="font-serif font-black text-base tracking-tight uppercase text-ivory block">
                LA LETIZIA TAKEAWAY
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-gold-champagne/70">
                BALLYGUNGE, KOLKATA
              </span>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-[9px] uppercase tracking-widest text-ivory-dim block">
              ORDER TOKEN
            </span>
            <span className="text-lg font-black text-gold-illuminated">
              #{tokenNumber}
            </span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="py-5 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-ivory-dim uppercase tracking-widest">CUSTOMER</span>
            <span className="font-serif font-bold text-base text-ivory uppercase">
              {order.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2 border-b border-white/5">
            <div>
              <span className="text-[10px] text-gold-champagne uppercase tracking-widest block mb-0.5">
                ESTIMATED READY
              </span>
              <span className="font-bold text-ivory flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold-illuminated" />
                <span>{order.pickupTime}</span>
              </span>
            </div>

            <div>
              <span className="text-[10px] text-gold-champagne uppercase tracking-widest block mb-0.5">
                COLLECTION BAY
              </span>
              <span className="font-bold text-gold-illuminated uppercase">
                1st Floor Reception Counter
              </span>
            </div>
          </div>

          {/* Ordered Dishes List */}
          <div className="py-2 border-b border-white/5 space-y-2">
            <span className="text-[10px] text-gold-champagne uppercase tracking-widest block">
              PACKAGED ITEMS ({order.dishes.length})
            </span>
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {order.dishes.map((dish, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] text-ivory">
                  <span>• {dish}</span>
                  <span className="text-ivory-dim">Hot Packed</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-ivory-dim">ESTIMATED AMOUNT:</span>
            <span className="font-bold text-base text-gold-illuminated">
              ₹{order.totalAmount > 0 ? order.totalAmount : 'Calculated at counter'}
            </span>
          </div>
        </div>

        {/* Pickup Instruction */}
        <div className="p-3 bg-graphite/40 border border-graphite-light font-mono text-[11px] text-ivory-dim space-y-1">
          <div className="flex items-center gap-1.5 text-gold-champagne font-bold uppercase">
            <MapPin className="w-3.5 h-3.5 text-gold-illuminated" />
            <span>PICKUP INSTRUCTIONS</span>
          </div>
          <p className="leading-relaxed">
            Please proceed directly to the 1st Floor Reception Counter at 70, South Park Circus (Opposite Quest Mall Gate 5). Present this token number for instant order handover.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 font-mono text-xs">
          <button
            onClick={() => window.print()}
            className="border border-graphite-light px-4 py-2.5 text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none flex items-center gap-1.5 uppercase tracking-widest"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT TOKEN</span>
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
