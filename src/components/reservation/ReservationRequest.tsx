'use client';

import React, { useState, useEffect } from 'react';
import { ReservationPayload } from '@/types';
import { ArrowRight, MapPin, Clock, ShieldAlert } from 'lucide-react';
import { CAFE_INFO } from '@/data/cafeData';

interface ReservationRequestProps {
  selectedCornerFromGallery?: string;
  selectedDishesFromMenu?: string[];
  onBookingSuccess: (reservation: ReservationPayload) => void;
}

export const ReservationRequest: React.FC<ReservationRequestProps> = ({
  selectedCornerFromGallery = '',
  selectedDishesFromMenu = [],
  onBookingSuccess,
}) => {
  const [formData, setFormData] = useState<ReservationPayload>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '19:30',
    guests: 2,
    cornerPreference: selectedCornerFromGallery || 'Waterfall Glasshouse Atrium',
    occasion: 'Romantic Evening',
    specialRequests: '',
    selectedDishes: selectedDishesFromMenu,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedCornerFromGallery) {
      setFormData((prev) => ({
        ...prev,
        cornerPreference: selectedCornerFromGallery,
      }));
    }
  }, [selectedCornerFromGallery]);

  useEffect(() => {
    if (selectedDishesFromMenu && selectedDishesFromMenu.length > 0) {
      setFormData((prev) => ({
        ...prev,
        selectedDishes: selectedDishesFromMenu,
      }));
    }
  }, [selectedDishesFromMenu]);

  const cornerOptions = [
    'Waterfall Glasshouse Atrium',
    'Honeycomb Game Lounge (Foosball)',
    'Botanical Rooftop Balcony',
    'Artisan Mirror Bar Counter',
    'Wisteria Hanging Gardens',
    'White Pergola Celebration Terrace',
    'Amber Ember Restro Hall',
    'Any Available Prime Table',
  ];

  const occasionOptions = [
    'Romantic Evening',
    'Birthday Celebration',
    'Casual Social Gathering',
    'Foosball Match & Restro Bites',
    'Business / Creative Discussion',
    'Private Banquet Celebration',
  ];

  const timeSlots = [
    '12:30 PM',
    '01:30 PM',
    '03:00 PM',
    '05:00 PM',
    '06:30 PM',
    '07:30 PM',
    '08:30 PM',
    '09:30 PM',
    '10:30 PM',
    '11:30 PM',
  ];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name.';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email address required.';
    }
    const todayStr = new Date().toISOString().split('T')[0];
    if (!formData.date) {
      errs.date = 'Select reservation date.';
    } else if (formData.date < todayStr) {
      errs.date = 'Select today or a future reservation date.';
    }
    if (!formData.time) {
      errs.time = 'Select reservation time.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onBookingSuccess(formData);
    }, 500);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section
      id="reservation"
      className="relative py-16 sm:py-24 md:py-36 scroll-mt-24 md:scroll-mt-28 bg-obsidian text-ivory border-b border-graphite-light overflow-hidden select-none"
    >
      {/* Decorative Oversized Index Watermark */}
      <div
        className="absolute top-12 right-4 sm:right-6 md:right-12 font-mono text-6xl sm:text-8xl md:text-[14rem] font-black text-graphite-light/20 leading-none pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        05
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-10 sm:space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-graphite-light">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-gold-champagne font-bold">
              <span>INDEX // 05</span>
              <span>—</span>
              <span>TABLE INQUIRY PROTOCOL</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight900 uppercase text-ivory">
              RESERVE AN <span className="headline-outline-gold">EVENING</span>
            </h2>
          </div>

          <div className="border border-graphite-light p-2.5 sm:p-3 bg-graphite/30 font-mono text-[10px] sm:text-[11px] text-ivory-dim flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-illuminated shrink-0" />
            <span>FRONTEND SIMULATION // NO REAL DATA COLLECTED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Spatial Ethos & Landmark Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-graphite-light p-6 bg-graphite/20 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-gold-champagne font-bold block">
                SPATIAL SPECIFICATION
              </span>
              <p className="font-sans text-sm md:text-base text-ivory-muted leading-relaxed">
                Whether seeking the acoustic lull of the Waterfall Atrium or an open-air table on the Botanical Balcony, every seat is assigned with architectural intention.
              </p>
            </div>

            <div className="border border-graphite-light p-6 bg-graphite/20 space-y-3 font-mono text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-illuminated shrink-0 mt-0.5" />
                <div>
                  <span className="text-gold-champagne block font-bold uppercase tracking-wider">
                    LANDMARK LOCATION
                  </span>
                  <span className="text-ivory-dim">
                    70, South Park Circus, Ballygunge, Kolkata 700017 (Directly opposite Quest Mall Gate 5).
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-graphite-light p-6 bg-graphite/20 space-y-3 font-mono text-xs">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-illuminated shrink-0 mt-0.5" />
                <div>
                  <span className="text-gold-champagne block font-bold uppercase tracking-wider">
                    OPERATING PROTOCOL
                  </span>
                  <span className="text-ivory-dim">
                    Daily 12:00 PM – 12:30 AM. Peak table sittings begin at 7:30 PM. Walk-ins accommodated based on capacity.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sharp Brutalist Form */}
          <div className="lg:col-span-7">
            <div className="border-2 border-graphite-light p-4 sm:p-6 md:p-10 bg-graphite/20">
              <div className="pb-6 mb-6 border-b border-graphite-light font-mono text-xs uppercase tracking-widest text-gold-champagne flex items-center justify-between">
                <span>[ TABLE INQUIRY FORM ]</span>
                <span className="text-ivory-dim">* REQUIRED FIELDS</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                      GUEST NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Joydeep Sen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 bg-obsidian border text-ivory font-mono text-sm placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none ${
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 bg-obsidian border text-ivory font-mono text-sm placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none ${
                        errors.phone ? 'border-red-400' : 'border-graphite-light'
                      }`}
                    />
                    {errors.phone && (
                      <span className="font-mono text-[10px] text-red-400 mt-1 block">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Email & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      placeholder="joydeep@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 bg-obsidian border text-ivory font-mono text-sm placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none ${
                        errors.email ? 'border-red-400' : 'border-graphite-light'
                      }`}
                    />
                    {errors.email && (
                      <span className="font-mono text-[10px] text-red-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                      PARTY SIZE
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-obsidian border border-graphite-light text-ivory font-mono text-sm focus:border-gold-illuminated focus:outline-none transition-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num} className="bg-obsidian text-ivory">
                          {num} {num === 1 ? 'GUEST' : 'GUESTS'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                      DATE *
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full px-4 py-3 bg-obsidian border text-ivory font-mono text-sm focus:border-gold-illuminated focus:outline-none transition-none ${
                        errors.date ? 'border-red-400' : 'border-graphite-light'
                      }`}
                    />
                    {errors.date && (
                      <span className="font-mono text-[10px] text-red-400 mt-1 block">{errors.date}</span>
                    )}
                  </div>

                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                      TIME SLOT *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 bg-obsidian border border-graphite-light text-ivory font-mono text-sm focus:border-gold-illuminated focus:outline-none transition-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-obsidian text-ivory">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Corner & Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                      CORNER PREFERENCE
                    </label>
                    <select
                      value={formData.cornerPreference}
                      onChange={(e) => setFormData({ ...formData, cornerPreference: e.target.value })}
                      className="w-full px-4 py-3 bg-obsidian border border-graphite-light text-ivory font-mono text-sm focus:border-gold-illuminated focus:outline-none transition-none"
                    >
                      {cornerOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-obsidian text-ivory">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                      OCCASION
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-4 py-3 bg-obsidian border border-graphite-light text-ivory font-mono text-sm focus:border-gold-illuminated focus:outline-none transition-none"
                    >
                      {occasionOptions.map((occ) => (
                        <option key={occ} value={occ} className="bg-obsidian text-ivory">
                          {occ}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-gold-champagne block mb-2 font-bold">
                    SPECIAL REQUESTS (OPTIONAL)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Quiet corner table, near foosball area..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 bg-obsidian border border-graphite-light text-ivory font-mono text-sm placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none resize-none"
                  />
                </div>

                {/* Submit Button with Instant Inversion */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 border-2 border-gold-illuminated text-gold-illuminated bg-transparent font-mono text-xs uppercase tracking-widest font-black hover:bg-gold-illuminated hover:text-obsidian transition-none flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold-illuminated"
                  >
                    {isSubmitting ? (
                      <span>GENERATING VIP BOARDING PASS...</span>
                    ) : (
                      <>
                        <span>[ 05 // CONFIRM & GENERATE TABLE PASS ]</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
