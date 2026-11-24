'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MenuCardPage } from '@/types';
import { X, ChevronLeft, ChevronRight, BookOpen, Download } from 'lucide-react';

interface PhysicalMenuModalProps {
  pages: MenuCardPage[];
  initialPageIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PhysicalMenuModal: React.FC<PhysicalMenuModalProps> = ({
  pages,
  initialPageIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPageIndex);

  useEffect(() => {
    setCurrentPage(initialPageIndex);
  }, [initialPageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentPage, onClose]);

  if (!isOpen || pages.length === 0) return null;

  const current = pages[currentPage];

  const next = () => setCurrentPage((p) => (p + 1) % pages.length);
  const prev = () => setCurrentPage((p) => (p - 1 + pages.length) % pages.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Physical Dine In Menu Card Viewer"
    >
      <div
        className="absolute inset-0 bg-obsidian/95 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl max-h-[92vh] bg-obsidian border-2 border-gold-illuminated p-5 sm:p-8 z-10 flex flex-col justify-between shadow-2xl overflow-y-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-graphite-light font-mono text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold-illuminated" />
            <span className="text-gold-illuminated font-bold">
              OFFICIAL DINE IN MENU CARD // {current.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-ivory-dim">
              PAGE {String(current.pageNumber).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 border border-graphite-light text-ivory hover:bg-gold-illuminated hover:text-obsidian hover:border-gold-illuminated transition-none focus-visible:ring-2 focus-visible:ring-gold-illuminated"
              aria-label="Close menu card viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Menu Card Display */}
        <div className="relative my-4 aspect-[3/4] max-h-[65vh] w-full max-w-lg mx-auto border border-graphite-light bg-obsidian-deep overflow-hidden">
          <Image
            src={current.image}
            alt={`La Letizia Menu Page ${current.pageNumber} - ${current.title}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Thumbnail Selector & Bottom Controls */}
        <div className="pt-4 border-t border-graphite-light flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="border border-graphite-light px-3 py-2 text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none flex items-center gap-1 uppercase tracking-widest"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>[ PREV ]</span>
            </button>

            <button
              onClick={next}
              className="border border-graphite-light px-3 py-2 text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none flex items-center gap-1 uppercase tracking-widest"
              aria-label="Next Page"
            >
              <span>[ NEXT ]</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
            {pages.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentPage(idx)}
                className={`w-7 h-7 text-[10px] font-mono border transition-none flex items-center justify-center ${
                  currentPage === idx
                    ? 'border-gold-illuminated bg-gold-illuminated text-obsidian font-bold'
                    : 'border-graphite-light text-ivory-dim hover:text-gold-illuminated hover:border-gold-illuminated'
                }`}
                title={p.title}
              >
                {p.pageNumber}
              </button>
            ))}
          </div>

          <a
            href={current.image}
            download={`la-letizia-menu-page-${current.pageNumber}.jpg`}
            target="_blank"
            rel="noreferrer"
            className="border border-gold-illuminated bg-gold-illuminated text-obsidian px-4 py-2 font-bold uppercase tracking-widest hover:bg-gold-hover transition-none flex items-center gap-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>[ OPEN FULL RES ]</span>
          </a>
        </div>
      </div>
    </div>
  );
};
