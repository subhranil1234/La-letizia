'use client';

import React, { useState, useEffect } from 'react';
import { TakeawayPayload } from '@/types';
import { TakeawayTicketModal } from './TakeawayTicketModal';
import { OFFICIAL_MENU_ITEMS } from '@/data/menuData';
import {
  ShoppingBag,
  Clock,
  MapPin,
  ExternalLink,
  Phone,
  MessageCircle,
  Plus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  X,
} from 'lucide-react';

interface TakeawayHubProps {
  initialDishes?: string[];
}

export const TakeawayHub: React.FC<TakeawayHubProps> = ({ initialDishes = [] }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('In 25–30 Mins');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedDishNames, setSelectedDishNames] = useState<string[]>(
    initialDishes.length > 0
      ? initialDishes
      : ['Murgh Cheese Kebab', 'Letizia Special Pizza']
  );
  const [confirmedTakeaway, setConfirmedTakeaway] = useState<TakeawayPayload | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialDishes) {
      setSelectedDishNames(initialDishes);
    }
  }, [initialDishes]);

  const quickPicks = [
    'Murgh Cheese Kebab',
    'Letizia Special Pizza',
    'Mutton Daak Bangla',
    'Badshahi Falooda',
    'Drums Of Heaven',
    'Blueberry Pomegranate Mocktail',
    'Chicken Hakka Noodles',
    'Peri Peri Chicken Burger',
  ];

  const addDish = (dishName: string) => {
    if (!selectedDishNames.includes(dishName)) {
      setSelectedDishNames([...selectedDishNames, dishName]);
    }
  };

  const removeDish = (dishName: string) => {
    setSelectedDishNames(selectedDishNames.filter((d) => d !== dishName));
  };

  const calculateSubtotal = () => {
    return selectedDishNames.reduce((acc, name) => {
      const match = OFFICIAL_MENU_ITEMS.find((item) => item.name === name);
      const priceNum = match ? parseInt(match.price.replace(/[^\d]/g, ''), 10) || 0 : 350;
      return acc + priceNum;
    }, 0);
  };

  const handleTakeawaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      errs.name = 'Customer name required.';
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number required.';
    }
    if (selectedDishNames.length === 0) {
      errs.dishes = 'Select at least one dish for takeaway.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedTakeaway({
        name: customerName,
        phone: customerPhone,
        pickupTime,
        orderType: 'counter_takeaway',
        notes: specialInstructions,
        dishes: selectedDishNames,
        totalAmount: calculateSubtotal(),
      });
    }, 500);
  };

  return (
    <section
      id="takeaway"
      className="relative py-16 sm:py-24 md:py-36 scroll-mt-24 md:scroll-mt-28 bg-obsidian text-ivory border-b border-graphite-light overflow-hidden select-none"
    >
      {/* Decorative Oversized Index Watermark */}
      <div
        className="absolute top-12 right-4 sm:right-6 md:right-12 font-mono text-6xl sm:text-8xl md:text-[14rem] font-black text-graphite-light/20 leading-none pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        06
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-10 sm:space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-graphite-light">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-gold-champagne font-bold">
              <span>INDEX // 06</span>
              <span>—</span>
              <span>EXPRESS LOGISTICS & COUNTER PICKUP</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight900 uppercase text-ivory">
              ONLINE ORDER & <span className="headline-outline-gold">TAKEAWAYS</span>
            </h2>
          </div>

          <div className="border border-graphite-light p-2.5 sm:p-3 bg-graphite/30 font-mono text-[10px] sm:text-xs text-ivory-dim flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-illuminated shrink-0" />
            <span>0% WAIT TIME // 1ST FLOOR RECEPTION COUNTER PICKUP</span>
          </div>
        </div>

        {/* Delivery Partner & Direct Line Bar (2-Column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zomato Delivery */}
          <div className="border border-graphite-light p-6 bg-graphite/20 hover:border-gold-illuminated transition-none flex flex-col justify-between space-y-4">
            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-red-400 font-bold tracking-widest uppercase">ZOMATO DELIVERY</span>
                <span className="text-gold-illuminated">4.4 ★ (1.2K+ Reviews)</span>
              </div>
              <h3 className="font-serif font-black text-xl text-ivory uppercase">
                Order Direct via Zomato
              </h3>
              <p className="font-sans text-xs text-ivory-muted leading-relaxed">
                Live delivery tracking and doorstep drop, serving Ballygunge, Park Circus, Beckbagan, Alipore, and Central Kolkata.
              </p>
            </div>

            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-red-500/50 text-ivory hover:bg-red-500 hover:text-white px-5 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-none flex items-center justify-between"
            >
              <span>[ ORDER ON ZOMATO ]</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Direct Concierge WhatsApp Line */}
          <div className="border border-graphite-light p-6 bg-graphite/20 hover:border-gold-illuminated transition-none flex flex-col justify-between space-y-4">
            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-400 font-bold tracking-widest uppercase">DIRECT CONCIERGE</span>
                <span className="text-gold-illuminated">No Middleman Markup</span>
              </div>
              <h3 className="font-serif font-black text-xl text-ivory uppercase">
                WhatsApp Express Order
              </h3>
              <p className="font-sans text-xs text-ivory-muted leading-relaxed">
                Connect directly with our restro floor manager for custom takeaway packaging, bulk orders, or specific culinary requests.
              </p>
            </div>

            <a
              href="https://wa.me/919051877777?text=Hi%20La%20Letizia,%20I%20would%20like%20to%20place%20a%20direct%20counter%20takeaway%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500/50 text-ivory hover:bg-green-500 hover:text-obsidian px-5 py-3 font-mono text-xs uppercase tracking-widest font-bold transition-none flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span>[ WHATSAPP ORDER LINE ]</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Direct Counter Takeaway Ordering System */}
        <div className="border-2 border-graphite-light bg-graphite/20 p-6 sm:p-10 space-y-8">
          <div className="pb-6 border-b border-graphite-light font-mono text-xs space-y-1">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-gold-illuminated" />
              <span className="text-gold-illuminated font-bold uppercase tracking-widest text-sm">
                DIRECT COUNTER TAKEAWAY PROTOCOL
              </span>
            </div>
            <p className="text-ivory-dim">
              Order ahead to collect freshly prepared, hot sealed packages directly from our 1st-floor reception counter with zero wait time.
            </p>
          </div>

          <form onSubmit={handleTakeawaySubmit} className="space-y-6" noValidate>
            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                  CUSTOMER NAME *
                </label>
                <input
                  type="text"
                  placeholder="e.g. S. Mukherjee"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full px-4 py-3 bg-obsidian border text-ivory font-mono text-xs uppercase placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none ${
                    errors.name ? 'border-red-400' : 'border-graphite-light'
                  }`}
                />
                {errors.name && (
                  <span className="font-mono text-[10px] text-red-400 mt-1 block">{errors.name}</span>
                )}
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                  MOBILE NUMBER *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98300 00000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full px-4 py-3 bg-obsidian border text-ivory font-mono text-xs uppercase placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none ${
                    errors.phone ? 'border-red-400' : 'border-graphite-light'
                  }`}
                />
                {errors.phone && (
                  <span className="font-mono text-[10px] text-red-400 mt-1 block">{errors.phone}</span>
                )}
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                  PICKUP TIME ESTIMATION
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-4 py-3 bg-obsidian border border-graphite-light text-ivory font-mono text-xs uppercase focus:border-gold-illuminated focus:outline-none transition-none"
                >
                  <option value="In 20–25 Mins">In 20–25 Mins (Fast Track)</option>
                  <option value="In 25–30 Mins">In 25–30 Mins (Standard)</option>
                  <option value="In 45 Mins">In 45 Mins (Dinner Rush)</option>
                  <option value="In 60 Mins">In 1 Hour</option>
                  <option value="Schedule for 8:00 PM">8:00 PM Today</option>
                  <option value="Schedule for 9:30 PM">9:30 PM Today</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                  COLLECTION DESK
                </label>
                <input
                  type="text"
                  disabled
                  value="1ST FLOOR MAIN RECEPTION COUNTER"
                  className="w-full px-4 py-3 bg-graphite/40 border border-graphite-light text-ivory-dim font-mono text-xs uppercase"
                />
              </div>
            </div>

            {/* Selected Dishes for Takeaway */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-gold-champagne uppercase tracking-widest font-bold">
                  TAKEAWAY PACKAGE DISHES ({selectedDishNames.length})
                </span>
                <div className="flex items-center gap-3">
                  {selectedDishNames.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedDishNames([])}
                      className="text-ivory-dim hover:text-red-400 transition-none text-[11px] uppercase tracking-wider"
                    >
                      [ CLEAR ALL ]
                    </button>
                  )}
                  <span className="text-ivory-dim">
                    Estimated Subtotal: <strong className="text-gold-illuminated">₹{calculateSubtotal()}</strong>
                  </span>
                </div>
              </div>

              {/* Tag Cloud of Selected Dishes */}
              <div className="min-h-16 p-3 bg-obsidian border border-graphite-light flex flex-wrap gap-2 items-center">
                {selectedDishNames.length === 0 ? (
                  <span className="text-xs font-mono text-ivory-dim/60 italic">
                    No dishes selected yet. Click quick picks below or add from the Menu section above.
                  </span>
                ) : (
                  selectedDishNames.map((name, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-graphite border border-graphite-light text-xs font-mono uppercase text-ivory"
                    >
                      <span>{name}</span>
                      <button
                        type="button"
                        onClick={() => removeDish(name)}
                        className="text-ivory-dim hover:text-red-400 transition-none ml-1"
                        aria-label={`Remove ${name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
              {errors.dishes && (
                <span className="font-mono text-[10px] text-red-400 block">{errors.dishes}</span>
              )}

              {/* Quick Pick Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                <span className="text-ivory-dim uppercase tracking-widest">POPULAR QUICK ADDS:</span>
                {quickPicks.map((pick) => {
                  const isAdded = selectedDishNames.includes(pick);
                  return (
                    <button
                      key={pick}
                      type="button"
                      onClick={() => (isAdded ? removeDish(pick) : addDish(pick))}
                      className={`px-2.5 py-1 border transition-none flex items-center gap-1 ${
                        isAdded
                          ? 'border-gold-illuminated bg-gold-illuminated text-obsidian font-bold'
                          : 'border-graphite-light text-ivory-dim hover:border-gold-illuminated hover:text-gold-illuminated'
                      }`}
                    >
                      {isAdded ? '✓' : '+'} {pick}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-graphite-light font-mono text-xs">
              <div className="flex items-center gap-2 text-ivory-dim text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-gold-illuminated shrink-0" />
                <span>PICKUP AT: 1ST FLOOR RECEPTION, 70 SOUTH PARK CIRCUS (OPP QUEST MALL GATE 5)</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto border-2 border-gold-illuminated bg-gold-illuminated text-obsidian px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-black hover:bg-gold-hover transition-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>GENERATING PICKUP TOKEN...</span>
                ) : (
                  <>
                    <span>[ GENERATE COUNTER PICKUP TOKEN ]</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Simulated Takeaway Ticket Modal */}
      <TakeawayTicketModal
        order={confirmedTakeaway}
        onClose={() => setConfirmedTakeaway(null)}
      />
    </section>
  );
};
