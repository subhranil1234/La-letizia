'use client';

import React, { useState, useCallback } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { CinematicHero } from '@/components/hero/CinematicHero';
import { TheExperience } from '@/components/experience/TheExperience';
import { FindYourCorner } from '@/components/gallery/FindYourCorner';
import { ExploreFlavours } from '@/components/menu/ExploreFlavours';
import { ReservationRequest } from '@/components/reservation/ReservationRequest';
import { TakeawayHub } from '@/components/takeaway/TakeawayHub';
import { BookingModal } from '@/components/reservation/BookingModal';
import { LocationContact } from '@/components/contact/LocationContact';
import { Footer } from '@/components/contact/Footer';
import { TextMarquee } from '@/components/ui/TextMarquee';
import { MarqueeIntro } from '@/components/intro/MarqueeIntro';
import { DirectOrderModal } from '@/components/order/DirectOrderModal';
import { FloatingOrderPill } from '@/components/order/FloatingOrderPill';
import { ReservationPayload, OrderItem, MenuItem } from '@/types';

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [siteRevealed, setSiteRevealed] = useState<boolean>(false);
  const [introKey, setIntroKey] = useState<number>(0);
  const [selectedCornerForBooking, setSelectedCornerForBooking] = useState<string>('');
  const [selectedDishesForBooking, setSelectedDishesForBooking] = useState<string[]>([]);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationPayload | null>(null);

  // Global Direct Order State
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  const handleCurtainOpen = useCallback(() => {
    setSiteRevealed(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setSiteRevealed(true);
    setShowIntro(false);
  }, []);

  const handleOpenBooking = () => {
    const el = document.getElementById('reservation');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleAddDishToOrder = (dish: MenuItem) => {
    const priceNum = parseInt(dish.price.replace(/[^\d]/g, ''), 10) || 350;
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: dish.id,
          name: dish.name,
          price: priceNum,
          priceDisplay: dish.price,
          quantity: 1,
          dietary: dish.dietary,
          category: dish.category,
        },
      ];
    });
  };

  const handleAddDishesToOrder = (dishes: MenuItem[]) => {
    dishes.forEach((dish) => handleAddDishToOrder(dish));
  };

  const handleUpdateOrderQuantity = (id: string, delta: number) => {
    setOrderItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[];
    });
  };

  const handleRemoveOrderItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const totalOrderCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSelectCornerFromGallery = (cornerTitle: string) => {
    setSelectedCornerForBooking(cornerTitle);
    const el = document.getElementById('reservation');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectDishesFromMenu = (dishNames: string[]) => {
    setSelectedDishesForBooking(dishNames);
  };

  const handleBookingSuccess = (reservation: ReservationPayload) => {
    setConfirmedReservation(reservation);
  };

  const heroMarqueeItems = [
    'LA LETIZIA CAFÉ & RESTRO',
    '70 SOUTH PARK CIRCUS BALLYGUNGE',
    'WATERFALL GLASSHOUSE ATRIUM',
    'HONEYCOMB GAME SALON',
    'BOTANICAL ROOFTOP BALCONY',
    'ARTISAN MOCKTAILS & CRAFT KEBABS',
    'OPEN DAILY 12:00 PM – 12:30 AM',
    'KOLKATA • ZEROONE',
  ];

  const architecturalMarqueeItems = [
    '// SENSORY ARCHITECTURAL NOCTURNE //',
    'EXAGGERATED MINIMALISM',
    '// BALLYGUNGE DESTINATION //',
    'AUTHENTIC PHOTOGRAPHY ARCHIVE',
    '// ROYAL SHEESHA LOUNGE //',
    'CASCADE WATER WALL',
    '// CHAMPIONSHIP FOOSBALL //',
  ];

  const platesMarqueeItems = [
    'PLATE 01 WATERFALL ATRIUM',
    'PLATE 02 HONEYCOMB LOUNGE',
    'PLATE 03 BOTANICAL BALCONY',
    'PLATE 04 ARTISAN BAR',
    'PLATE 05 HANGING GARDENS',
    'PLATE 06 TEAL MATRIX',
    'PLATE 07 AMBER RESTRO',
    'PLATE 08 WHITE PERGOLA',
    'PLATE 09 BANQUET DECK',
    'PLATE 10 INDIGO TWILIGHT',
    'PLATE 11 GOLDEN THRESHOLD',
  ];

  const reservationMarqueeItems = [
    'VIP TABLE RESERVATION PROTOCOL',
    'WALK-INS WELCOME',
    'COMPLIMENTARY VALET SERVICE',
    'PEAK DINING COMMENCES 7:30 PM',
    'DIRECTLY OPPOSITE QUEST MALL GATE 5',
    'ZEROONE SANCTUARY',
  ];

  const takeawayMarqueeItems = [
    'EXPRESS COUNTER TAKEAWAY',
    'DIRECT PICKUP FROM 1ST FLOOR RECEPTION',
    'HOT THERMAL SEALED PACKAGING',
    'ZOMATO PRO DELIVERY PARTNER',
    'DIRECT WHATSAPP CONCIERGE ORDERING',
    'ZERO WAITING TIME',
    'CHEF PREPARED FRESH IN 25 MINS',
  ];

  const preFooterMarqueeItems = [
    'LA LETIZIA',
    'CAFÉ & RESTRO',
    'BALLYGUNGE',
    'KOLKATA',
    'UNDER ZEROONE',
  ];

  return (
    <main className="min-h-screen bg-obsidian text-ivory antialiased selection:bg-gold-illuminated selection:text-obsidian relative">
      {/* 00. Kinetic Marquee Convergence Intro & Bespoke Cafe Loader */}
      {showIntro && (
        <MarqueeIntro
          key={introKey}
          onCurtainOpen={handleCurtainOpen}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Dynamic Animated Site Wrapper */}
      <div
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          siteRevealed || !showIntro
            ? 'scale-100 opacity-100 filter-none'
            : 'scale-[0.96] opacity-90 blur-[1px]'
        }`}
      >
        {/* 01. Global Minimalist Navigation */}
        <Navbar
          onOpenBooking={handleOpenBooking}
          onOpenOrderModal={handleOpenOrderModal}
          orderCount={totalOrderCount}
        />

        {/* 02. Spatial Hero Section */}
        <CinematicHero
          onOpenBooking={handleOpenBooking}
          onOpenOrderModal={handleOpenOrderModal}
        />

      {/* Looping Marquee Tickers (Passing-By Animation) */}
      <div className="space-y-0">
        <TextMarquee
          items={heroMarqueeItems}
          separator="★"
          speedSeconds={32}
          className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight uppercase"
        />
        <TextMarquee
          items={architecturalMarqueeItems}
          separator="•"
          speedSeconds={38}
          reverse
          outlined
          className="text-lg sm:text-xl md:text-2xl font-mono uppercase tracking-widest"
        />
      </div>

      {/* 03. Section 02: The Experience */}
      <TheExperience />

      {/* Plates Marquee Loop */}
      <TextMarquee
        items={platesMarqueeItems}
        separator="//"
        speedSeconds={40}
        outlined
        className="text-lg md:text-2xl font-mono uppercase tracking-widest text-gold-champagne"
        badge="SPATIAL PLATES"
      />

      {/* 04. Section 03: Find Your Corner (11 Real Photographs Gallery) */}
      <FindYourCorner onSelectCornerForBooking={handleSelectCornerFromGallery} />

      {/* 05. Section 04: The Menu (12 Real Menu Cards + Interactive Gastronomy) */}
      <ExploreFlavours
        onOpenBooking={handleOpenBooking}
        onSelectDishesForBooking={handleSelectDishesFromMenu}
        orderItems={orderItems}
        onAddDishToOrder={handleAddDishToOrder}
        onAddDishesToOrder={handleAddDishesToOrder}
        onUpdateOrderQuantity={handleUpdateOrderQuantity}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Reservation Marquee Loop */}
      <TextMarquee
        items={reservationMarqueeItems}
        separator="★"
        speedSeconds={34}
        reverse
        className="text-lg md:text-2xl font-mono uppercase tracking-widest text-ivory"
      />

      {/* 06. Section 05: Reservation Request UI */}
      <ReservationRequest
        selectedCornerFromGallery={selectedCornerForBooking}
        selectedDishesFromMenu={selectedDishesForBooking}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Express Takeaway Marquee Loop */}
      <TextMarquee
        items={takeawayMarqueeItems}
        separator="⚡"
        speedSeconds={30}
        outlined
        className="text-lg md:text-2xl font-mono uppercase tracking-widest text-gold-champagne"
        badge="COUNTER PICKUP"
      />

      {/* 07. Section 06: Online Order & Takeaway Hub */}
      <TakeawayHub initialDishes={selectedDishesForBooking} />

      {/* 08. Section 07: Location, Contact & Real Facade */}
      <LocationContact />

      {/* Pre-Footer Massive Outlined Looping Marquee */}
      <TextMarquee
        items={preFooterMarqueeItems}
        separator="•"
        speedSeconds={28}
        outlined
        className="text-5xl md:text-8xl font-serif font-black tracking-tighter900 uppercase"
      />

        {/* 08. Colossal Oversized Editorial Footer */}
        <Footer
          onReplayIntro={() => {
            setSiteRevealed(false);
            setIntroKey((prev) => prev + 1);
            setShowIntro(true);
          }}
        />
      </div>

      {/* 09. Simulated VIP Boarding Pass Confirmation Modal */}
      <BookingModal
        reservation={confirmedReservation}
        onClose={() => setConfirmedReservation(null)}
      />

      {/* 10. Persistent Floating Order Dock */}
      <FloatingOrderPill
        items={orderItems}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* 11. Direct Online Ordering & Digital Kitchen Token Modal */}
      <DirectOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateOrderQuantity}
        onRemoveItem={handleRemoveOrderItem}
        onClearOrder={handleClearOrder}
        onOpenMenu={() => {
          const el = document.getElementById('menu');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </main>
  );
}
