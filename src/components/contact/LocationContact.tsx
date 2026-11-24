'use client';

import React from 'react';
import Image from 'next/image';
import { CAFE_INFO } from '@/data/cafeData';
import { LogoEmblem } from '../branding/LogoEmblem';
import { MapPin, Clock, Phone, Navigation, Car, ExternalLink } from 'lucide-react';

export const LocationContact: React.FC = () => {
  return (
    <section
      id="location"
      className="relative py-16 sm:py-24 md:py-36 scroll-mt-24 md:scroll-mt-28 bg-obsidian text-ivory border-b border-graphite-light overflow-hidden select-none"
    >
      {/* Decorative Oversized Index Watermark */}
      <div
        className="absolute top-12 right-4 sm:right-6 md:right-12 font-mono text-6xl sm:text-8xl md:text-[14rem] font-black text-graphite-light/20 leading-none pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        07
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-10 sm:space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-graphite-light">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-gold-champagne font-bold">
              <span>INDEX // 07</span>
              <span>—</span>
              <span>DESTINATION & CONCIERGE</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight900 uppercase text-ivory">
              THE <span className="headline-outline-gold">DESTINATION</span>
            </h2>
          </div>

          <div className="font-mono text-[10px] sm:text-xs text-ivory-dim tracking-widest uppercase">
            <span>[ 70 SOUTH PARK CIRCUS, BALLYGUNGE ]</span>
          </div>
        </div>

        {/* Real Signage Facade Photo & Spatial Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Real Facade Signage Photo with Sharp Border */}
          <div className="lg:col-span-6">
            <div className="border-2 border-graphite-light p-3 bg-graphite/30 space-y-3">
              <div className="relative aspect-[4/3] w-full border border-graphite-light overflow-hidden bg-obsidian">
                <Image
                  src="/images/signage-facade.jpg"
                  alt="La Letizia Cafe and Restro Illuminated Exterior Signage, Ballygunge, Kolkata"
                  fill
                  className="object-cover filter contrast-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-obsidian border border-graphite-light font-mono text-[10px] text-gold-champagne uppercase tracking-widest">
                  EXTERIOR SIGNAGE // BALLYGUNGE
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-ivory-dim pt-1">
                <span>FACADE SIGN & GEOMETRIC EMBLEM</span>
                <span className="text-gold-illuminated">OPP. QUEST MALL GATE 5</span>
              </div>
            </div>
          </div>

          {/* Location Technical Specs */}
          <div className="lg:col-span-6 space-y-6 font-mono">
            {/* Address */}
            <div className="border border-graphite-light p-6 bg-graphite/20 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-bold block">
                EXACT LANDMARK ADDRESS
              </span>
              <h3 className="font-serif font-black text-xl md:text-2xl text-ivory uppercase tracking-tight">
                70, SOUTH PARK CIRCUS, BALLYGUNGE
              </h3>
              <p className="font-sans text-xs md:text-sm text-ivory-muted leading-relaxed">
                Kolkata, West Bengal 700017 (Directly opposite Quest Mall Gate 5).
              </p>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=La+Letizia+Cafe+Restro+70+South+Park+Circus+Ballygunge+Kolkata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gold-illuminated text-gold-illuminated px-5 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-gold-illuminated hover:text-obsidian transition-none"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>[ GET DRIVING DIRECTIONS ]</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="border border-graphite-light p-6 bg-graphite/20 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-bold block">
                HOSPITALITY PROTOCOL
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs text-ivory">
                <div>
                  <span className="text-ivory-dim block">WEEKDAYS</span>
                  <span className="font-bold">{CAFE_INFO.hours.weekdays}</span>
                </div>
                <div>
                  <span className="text-ivory-dim block">WEEKENDS</span>
                  <span className="font-bold">{CAFE_INFO.hours.weekends}</span>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-graphite-light p-4 bg-graphite/20 space-y-1">
                <span className="text-[10px] uppercase text-gold-champagne block">VALET SERVICE</span>
                <span className="text-xs font-bold text-ivory">COMPLIMENTARY GUEST PARKING</span>
              </div>

              <div className="border border-graphite-light p-4 bg-graphite/20 space-y-1">
                <span className="text-[10px] uppercase text-gold-champagne block">CONCIERGE</span>
                <span className="text-xs font-bold text-ivory">{CAFE_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
