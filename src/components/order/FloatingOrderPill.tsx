'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { OrderItem } from '@/types';

interface FloatingOrderPillProps {
  items: OrderItem[];
  onOpenOrderModal: () => void;
}

export const FloatingOrderPill: React.FC<FloatingOrderPillProps> = ({
  items,
  onOpenOrderModal,
}) => {
  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalSubtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  if (totalQuantity === 0) return null;

  return (
    <aside
      aria-label="Active order summary dock"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none animate-in slide-in-from-bottom-4 duration-200 max-w-[calc(100%-2rem)]"
    >
      <div className="bg-obsidian border-2 border-gold-illuminated shadow-2xl p-2.5 sm:p-3 flex items-center gap-3 sm:gap-4 font-mono">
        <div className="flex items-center gap-2 pl-2">
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-gold-illuminated" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-gold-illuminated text-obsidian text-[9px] font-black flex items-center justify-center">
              {totalQuantity}
            </span>
          </div>

          <div className="text-left hidden xs:block">
            <span className="text-[10px] uppercase tracking-widest text-gold-champagne block">
              ORDER BAG ({totalQuantity})
            </span>
            <span className="text-xs font-bold text-ivory">
              ₹{totalSubtotal}
            </span>
          </div>
        </div>

        <button
          onClick={onOpenOrderModal}
          className="border border-gold-illuminated bg-gold-illuminated text-obsidian px-4 py-2 font-mono text-[11px] uppercase tracking-widest font-black hover:bg-gold-hover transition-none flex items-center gap-1.5"
          aria-label="View order bag and proceed to checkout"
        >
          <span>[ CHECKOUT ]</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
