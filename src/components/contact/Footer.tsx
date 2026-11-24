'use client';

import React from 'react';
import { LogoEmblem } from '../branding/LogoEmblem';
import { ArrowUp, Instagram, Facebook, Globe } from 'lucide-react';
import { CAFE_INFO } from '@/data/cafeData';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-obsidian-deep text-ivory pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 md:px-12 select-none">
      <div className="max-w-[1500px] mx-auto space-y-16">
        {/* Top Technical Metadata Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-graphite-light font-mono text-xs">
          {/* Brand Presentation */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <LogoEmblem size={44} glow={false} />
              <div>
                <span className="font-serif font-black text-xl tracking-tight uppercase text-ivory block">
                  LA LETIZIA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold-champagne/70 block">
                  CAFÉ & RESTRO • ZEROONE
                </span>
              </div>
            </div>

            <p className="font-sans text-xs md:text-sm text-ivory-muted leading-relaxed max-w-sm pt-2">
              An architectural nocturnal sanctuary in Kolkata. Defined by living water cascades, botanical canopies, honeycomb gaming, and artisan restro gastronomy.
            </p>

            <div className="inline-block border border-graphite-light px-3 py-1 text-[10px] uppercase tracking-widest text-gold-champagne">
              ZEROONE ARCHITECTURAL DEMO
            </div>
          </div>

          {/* Quick Index Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-bold block mb-2">
              SPATIAL DIRECTORY
            </span>
            <ul className="space-y-2 uppercase tracking-widest text-ivory-dim">
              <li>
                <a href="#experience" className="hover:text-gold-illuminated transition-none block">
                  01 // THE EXPERIENCE
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold-illuminated transition-none block">
                  02 // 11 REAL PHOTOGRAPHS
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold-illuminated transition-none block">
                  03 // TASTING MENU
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-gold-illuminated transition-none block">
                  04 // VIP TABLE PASS
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-gold-illuminated transition-none block">
                  05 // DESTINATION & MAP
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact Summary */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-bold block mb-2">
              DESTINATION & HOURS
            </span>
            <p className="text-ivory-dim leading-relaxed font-sans">
              70, South Park Circus, Ballygunge, Kolkata 700017 (Opposite Quest Mall Gate 5)
            </p>
            <div className="pt-2 text-ivory">
              <span className="text-gold-champagne block text-[10px] tracking-wider uppercase font-bold">
                OPERATING SCHEDULE
              </span>
              <span>DAILY: 12:00 PM – 12:30 AM</span>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.instagram.com/laletizia_kolkata"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-graphite-light flex items-center justify-center text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/laletizia.kolkata"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-graphite-light flex items-center justify-center text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=La+Letizia+Cafe+Restro+70+South+Park+Circus+Ballygunge+Kolkata"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-graphite-light flex items-center justify-center text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none"
                aria-label="Google Maps"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* COLOSSAL OVERSIZED EDITORIAL BRAND TYPOGRAPHY UP TO 12REM */}
        <div className="py-8 md:py-14 text-center overflow-hidden border-b border-graphite-light select-none">
          <h2 className="font-serif font-black text-[13vw] tracking-tighter900 leading-[0.8] uppercase headline-outline-gold hover:text-gold-illuminated transition-colors duration-150">
            LA LETIZIA
          </h2>
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-editorial text-gold-champagne/80 mt-4">
            EXAGGERATED MINIMALISM // BALLYGUNGE, KOLKATA // UNDER ZEROONE
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top with Instant Inversion */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-ivory-dim">
          <div>
            <span>© {new Date().getFullYear()} LA LETIZIA CAFÉ & RESTRO. ALL RIGHTS RESERVED.</span>
            <span className="block text-[10px] text-ivory-dim/60 mt-0.5">
              Frontend demonstration showcase built under ZeroOne. Sourced exclusively from verified café photographs.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="border border-graphite-light text-gold-champagne px-3 py-2 uppercase tracking-widest hover:border-gold-illuminated hover:text-gold-illuminated transition-none text-[10px]"
              >
                [ REPLAY INTRO (6.8S) ]
              </button>
            )}
            <button
              onClick={scrollToTop}
              className="border border-graphite-light text-ivory px-4 py-2 uppercase tracking-widest font-bold hover:bg-gold-illuminated hover:text-obsidian hover:border-gold-illuminated transition-none flex items-center gap-2"
            >
              <span>[ BACK TO TOP ]</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
