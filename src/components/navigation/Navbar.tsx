'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogoEmblem } from '../branding/LogoEmblem';
import { Menu, X, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { CAFE_INFO } from '@/data/cafeData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenOrderModal?: () => void;
  orderCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenOrderModal,
  orderCount = 0,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { num: '01', label: 'EXPERIENCE', href: '#experience' },
    { num: '02', label: 'CORNERS', href: '#gallery' },
    { num: '03', label: 'FLAVOURS', href: '#menu' },
    { num: '04', label: 'RESERVATION', href: '#reservation' },
    { num: '05', label: 'TAKEAWAY', href: '#takeaway' },
    { num: '06', label: 'DESTINATION', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-150 pt-[env(safe-area-inset-top)] ${
          scrolled
            ? 'bg-obsidian/95 border-b border-graphite-light backdrop-blur-md py-3.5 sm:py-4'
            : 'bg-obsidian/80 border-b border-white/5 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Authentic Brand Monogram & Name */}
          <Link
            href="#"
            className="flex items-center gap-2.5 sm:gap-3.5 group focus-visible:ring-2 focus-visible:ring-gold-illuminated"
            aria-label="La Letizia Home"
          >
            <LogoEmblem size={32} glow={false} />
            <div className="flex flex-col">
              <span className="font-serif font-black text-base xs:text-lg md:text-xl tracking-tight900 uppercase text-ivory leading-none group-hover:text-gold-illuminated transition-colors">
                LA LETIZIA
              </span>
              <span className="font-mono text-[8px] xs:text-[9px] uppercase tracking-widest text-gold-champagne/70 mt-1">
                KOLKATA • ZEROONE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Numbered Indexes */}
          <nav
            className="hidden lg:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-ivory/80"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-1 hover:text-gold-illuminated transition-colors relative flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-gold-illuminated"
              >
                <span className="text-gold-illuminated/60 text-[9px] font-bold">{link.num}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Instant Inversion CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenOrderModal}
              className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest transition-none flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-gold-illuminated ${
                orderCount > 0
                  ? 'border border-gold-illuminated bg-gold-illuminated text-obsidian font-bold hover:bg-gold-hover'
                  : 'border border-graphite-light text-ivory-dim hover:border-gold-champagne hover:text-gold-champagne'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>[ ORDER DIRECT {orderCount > 0 ? `(${orderCount})` : ''} ]</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="border border-gold-illuminated text-gold-illuminated px-4 py-2 font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-gold-illuminated hover:text-obsidian transition-none focus-visible:ring-2 focus-visible:ring-gold-illuminated"
            >
              [ RESERVE TABLE ]
            </button>
          </div>

          {/* Mobile Order CTA & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenOrderModal}
              className={`min-h-[44px] min-w-[44px] px-2.5 py-2 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-1 transition-none border ${
                orderCount > 0
                  ? 'border-gold-illuminated bg-gold-illuminated text-obsidian font-bold'
                  : 'border-graphite-light text-ivory-dim bg-graphite/40'
              }`}
              aria-label="Direct order bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {orderCount > 0 && <span className="font-bold">{orderCount}</span>}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="min-h-[44px] min-w-[44px] p-2.5 border border-graphite-light bg-graphite/60 text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold-illuminated"
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sharp Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-all duration-150 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-obsidian/90 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-obsidian border-l border-graphite-light p-8 flex flex-col justify-between transition-transform duration-150 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-16 space-y-8">
            <div className="flex items-center gap-3">
              <LogoEmblem size={40} glow={false} />
              <div>
                <span className="font-serif font-black text-xl tracking-tight text-ivory block uppercase">
                  LA LETIZIA
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-champagne/70">
                  CAFÉ & RESTRO • ZEROONE
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-graphite-light w-full" />

            <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-3 border border-transparent hover:border-gold-illuminated hover:bg-graphite text-ivory hover:text-gold-illuminated transition-none flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-gold-illuminated/60 text-[10px]">{link.num}</span>
                    <span>{link.label}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold-champagne/60" />
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-graphite-light">
            <div className="text-[11px] font-mono text-ivory-muted space-y-1">
              <div>BALLYGUNGE, KOLKATA 700017</div>
              <div className="text-gold-champagne">DAILY: 12:00 PM – 12:30 AM</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenOrderModal?.();
                }}
                className={`py-3 text-center border font-mono text-[11px] uppercase tracking-widest transition-none ${
                  orderCount > 0
                    ? 'border-gold-illuminated bg-gold-illuminated text-obsidian font-bold'
                    : 'border-graphite-light text-ivory hover:border-gold-champagne'
                }`}
              >
                [ ORDER {orderCount > 0 ? `(${orderCount})` : ''} ]
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="py-3 text-center border border-gold-illuminated text-gold-illuminated bg-transparent font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-gold-illuminated hover:text-obsidian transition-none"
              >
                [ RESERVE ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
