'use client';

import React, { useState, useMemo, useRef } from 'react';
import { OFFICIAL_MENU_ITEMS, PHYSICAL_MENU_PAGES } from '@/data/menuData';
import { MenuItem, DietaryType, OrderItem } from '@/types';
import { PhysicalMenuModal } from './PhysicalMenuModal';
import { TextMarquee } from '../ui/TextMarquee';
import {
  Check,
  Plus,
  Minus,
  BookOpen,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  Flame,
  Utensils,
  ShoppingBag,
} from 'lucide-react';

interface ExploreFlavoursProps {
  onOpenBooking: () => void;
  onSelectDishesForBooking?: (dishNames: string[]) => void;
  orderItems?: OrderItem[];
  onAddDishToOrder?: (dish: MenuItem) => void;
  onAddDishesToOrder?: (dishes: MenuItem[]) => void;
  onUpdateOrderQuantity?: (id: string, delta: number) => void;
  onOpenOrderModal?: () => void;
}

export const ExploreFlavours: React.FC<ExploreFlavoursProps> = ({
  onOpenBooking,
  onSelectDishesForBooking,
  orderItems = [],
  onAddDishToOrder,
  onAddDishesToOrder,
  onUpdateOrderQuantity,
  onOpenOrderModal,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDishes, setSelectedDishes] = useState<MenuItem[]>([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [selectedMenuPageIndex, setSelectedMenuPageIndex] = useState<number>(0);

  const menuContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'ALL CUISINES' },
    { id: 'kebabs', label: 'KEBABS & TANDOOR' },
    { id: 'continental', label: 'PIZZA & CONTINENTAL' },
    { id: 'burgers_sandwiches', label: 'BURGERS & CAFÉ' },
    { id: 'chinese', label: 'CHINESE & MOMOS' },
    { id: 'indian_mains', label: 'INDIAN MAINS & BIRYANI' },
    { id: 'beverages', label: 'MOCKTAILS & SHAKES' },
    { id: 'desserts', label: 'DESSERTS & CHAI' },
    { id: 'sheesha', label: 'ROYAL SHEESHA' },
  ];

  const dietaryOptions: { id: string; label: string; dotColor?: string }[] = [
    { id: 'all', label: 'ALL PLATES' },
    { id: 'veg', label: 'VEGETARIAN', dotColor: '#22c55e' },
    { id: 'non-veg', label: 'NON-VEG', dotColor: '#ef4444' },
    { id: 'beverage', label: 'BEVERAGES', dotColor: '#F5D99B' },
    { id: 'sheesha', label: 'SHEESHA', dotColor: '#13C6BA' },
  ];

  // 4 Top Signature Teaser Dishes shown when collapsed
  const signatureTeasers = useMemo(() => {
    return OFFICIAL_MENU_ITEMS.filter((item) => item.highlight).slice(0, 4);
  }, []);

  const filteredItems = useMemo(() => {
    return OFFICIAL_MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesDietary = dietaryFilter === 'all' || item.dietary === dietaryFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const toggleDishSelection = (dish: MenuItem) => {
    setSelectedDishes((prev) => {
      const exists = prev.some((d) => d.id === dish.id);
      if (exists) {
        return prev.filter((d) => d.id !== dish.id);
      } else {
        return [...prev, dish];
      }
    });
  };

  const calculateTotal = useMemo(() => {
    return selectedDishes.reduce((acc, curr) => {
      const numeric = parseInt(curr.price.replace(/[^\d]/g, ''), 10) || 0;
      return acc + numeric;
    }, 0);
  }, [selectedDishes]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    if (!isExpanded) {
      setTimeout(() => {
        menuContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const marqueeGateItems = [
    '✦ CLICK TO UNVEIL FULL DINE-IN MENU ✦',
    'KEBABS & TANDOORI',
    'LETIZIA SPECIAL PIZZA',
    'MUTTON DAAK BANGLA',
    'BADSHAHI FALOODA',
    'BLUEBERRY POMEGRANATE',
    'DRUMS OF HEAVEN',
    'ROYAL SHEESHA LOUNGE',
    '✦ 120+ DISHES WAITING INSIDE ✦',
  ];

  const marqueeReverseItems = [
    '// INTERACTIVE TASTING VAULT //',
    'TAP TO EXPAND COMPLETE ARCHIVE',
    '// 12 VERIFIED MENU CARDS //',
    'REAL-TIME DIETARY FILTERS',
    '// CUSTOMIZE TABLE TASTING BOARD //',
  ];

  return (
    <section
      id="menu"
      ref={menuContainerRef}
      className="relative py-24 md:py-36 scroll-mt-24 md:scroll-mt-28 bg-obsidian text-ivory border-b border-graphite-light overflow-hidden select-none"
    >
      {/* Decorative Oversized Index Watermark */}
      <div
        className="absolute top-12 right-6 md:right-12 font-mono text-8xl md:text-[14rem] font-black text-graphite-light/20 leading-none pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        04
      </div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-graphite-light">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-gold-champagne font-bold">
              <span>INDEX // 04</span>
              <span>—</span>
              <span>GASTRONOMIC ARCHIVE</span>
            </div>
            <h2 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight900 uppercase text-ivory">
              THE <span className="headline-outline-gold">MENU</span>
            </h2>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setSelectedMenuPageIndex(0);
                setIsMenuModalOpen(true);
              }}
              className="border border-graphite-light bg-graphite/40 px-5 py-3 font-mono text-xs uppercase tracking-widest text-gold-champagne hover:border-gold-illuminated hover:text-gold-illuminated transition-none flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-gold-illuminated" />
              <span>[ 📖 12 ORIGINAL CARDS ]</span>
            </button>

            <button
              onClick={toggleExpand}
              className={`border-2 px-6 py-3 font-mono text-xs uppercase tracking-widest font-black transition-none flex items-center gap-2 ${
                isExpanded
                  ? 'border-gold-illuminated bg-transparent text-gold-illuminated hover:bg-gold-illuminated hover:text-obsidian'
                  : 'border-gold-illuminated bg-gold-illuminated text-obsidian hover:bg-gold-hover'
              }`}
            >
              <span>{isExpanded ? '[ ▲ COLLAPSE ARCHIVE ]' : '[ ▼ UNVEIL ALL 120+ DISHES ]'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CREATIVE MARQUEE PORTAL / ACCORDION GATE                      */}
        {/* ============================================================== */}
        <div
          onClick={toggleExpand}
          className="group relative cursor-pointer border-2 border-gold-illuminated/60 hover:border-gold-illuminated bg-graphite/40 transition-colors overflow-hidden"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleExpand();
            }
          }}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse Menu Archive' : 'Unveil Full Menu Archive'}
        >
          {/* Top Marquee Ribbon */}
          <div className="pointer-events-none py-1 bg-obsidian-deep border-b border-graphite-light">
            <TextMarquee
              items={marqueeGateItems}
              separator="★"
              speedSeconds={28}
              className="text-base sm:text-xl font-serif font-black tracking-tight uppercase text-gold-champagne"
            />
          </div>

          {/* Interactive Center Banner */}
          <div className="py-8 px-6 text-center space-y-3 relative z-10 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-editorial text-gold-illuminated font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>INTERACTIVE CULINARY VAULT</span>
            </div>

            <h3 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ivory group-hover:text-gold-illuminated transition-colors">
              {isExpanded ? 'COLLAPSE FULL MENU VAULT' : 'CLICK TO UNVEIL FULL DINE-IN MENU'}
            </h3>

            <p className="font-mono text-xs text-ivory-dim uppercase tracking-widest max-w-xl">
              {isExpanded
                ? 'Click here to fold the menu section back into compact mode.'
                : '120+ dishes across 8 authentic cuisines with live search & tasting board.'}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 border border-gold-illuminated px-5 py-2 font-mono text-[11px] uppercase tracking-widest font-bold text-gold-illuminated group-hover:bg-gold-illuminated group-hover:text-obsidian transition-none">
                <span>{isExpanded ? '[ FOLD MENU CLOSED ]' : '[ EXPLORE FULL CATALOG ▾ ]'}</span>
              </span>
            </div>
          </div>

          {/* Bottom Marquee Ribbon (Reverse Direction, Outlined) */}
          <div className="pointer-events-none py-1 bg-obsidian-deep border-t border-graphite-light">
            <TextMarquee
              items={marqueeReverseItems}
              separator="•"
              speedSeconds={32}
              reverse
              outlined
              className="text-sm sm:text-lg font-mono uppercase tracking-widest"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* COLLAPSED STATE: COMPACT 4-DISH SIGNATURE TEASER               */}
        {/* ============================================================== */}
        {!isExpanded && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between font-mono text-xs text-ivory-dim">
              <span>FEATURED SIGNATURE PICKS // 04 DISHES</span>
              <button
                onClick={toggleExpand}
                className="text-gold-champagne hover:text-gold-illuminated uppercase tracking-widest flex items-center gap-1"
              >
                <span>VIEW ALL {OFFICIAL_MENU_ITEMS.length} DISHES</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {signatureTeasers.map((dish) => {
                const isSelected = selectedDishes.some((d) => d.id === dish.id);
                const orderItem = orderItems.find((o) => o.id === dish.id);
                const orderQty = orderItem ? orderItem.quantity : 0;
                return (
                  <div
                    key={dish.id}
                    className="border border-graphite-light p-5 bg-graphite/20 hover:border-gold-illuminated transition-none flex flex-col justify-between h-56 group"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-gold-champagne mb-1">
                        <span className="uppercase">{dish.badge || 'SIGNATURE'}</span>
                        <span className="font-bold text-sm text-gold-illuminated">{dish.price}</span>
                      </div>
                      <h4 className="font-serif font-black text-lg uppercase tracking-tight text-ivory group-hover:text-gold-champagne transition-none">
                        {dish.name}
                      </h4>
                      <p className="font-sans text-xs text-ivory-muted line-clamp-2 mt-1 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      {orderQty > 0 ? (
                        <div className="flex-1 flex items-center justify-between border border-gold-illuminated bg-obsidian py-1 px-1.5 font-mono text-xs">
                          <button
                            type="button"
                            onClick={() => onUpdateOrderQuantity?.(dish.id, -1)}
                            className="p-1 text-ivory hover:text-gold-illuminated hover:bg-graphite"
                            aria-label={`Decrease ${dish.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-gold-illuminated text-xs">
                            {orderQty} IN BAG
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateOrderQuantity?.(dish.id, 1)}
                            className="p-1 text-ivory hover:text-gold-illuminated hover:bg-graphite"
                            aria-label={`Increase ${dish.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAddDishToOrder?.(dish)}
                          className="flex-1 py-2 border border-gold-illuminated bg-gold-illuminated text-obsidian font-mono text-[10px] uppercase tracking-widest font-black hover:bg-gold-hover transition-none flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>ORDER</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleDishSelection(dish)}
                        className={`py-2 px-2.5 border font-mono text-[10px] uppercase tracking-widest font-bold transition-none flex items-center justify-center gap-1 ${
                          isSelected
                            ? 'border-gold-illuminated bg-graphite text-gold-champagne'
                            : 'border-graphite-light text-ivory-dim hover:border-gold-illuminated hover:text-gold-illuminated'
                        }`}
                        title="Toggle Tasting Board"
                      >
                        {isSelected ? <Check className="w-3 h-3" /> : '★ BOARD'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* EXPANDED STATE: FULL THEATRICAL CULINARY VAULT                 */}
        {/* ============================================================== */}
        {isExpanded && (
          <div className="space-y-10 pt-4 animate-in fade-in duration-300">
            {/* Sticky Floating Sub-Control Bar */}
            <div className="sticky top-20 z-20 bg-obsidian/95 border-y border-graphite-light py-3 px-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gold-illuminated inline-block" />
                <span className="text-gold-illuminated font-bold uppercase tracking-widest">
                  FULL ARCHIVE ACTIVE // {filteredItems.length} ITEMS
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedMenuPageIndex(0);
                    setIsMenuModalOpen(true);
                  }}
                  className="text-ivory-dim hover:text-gold-illuminated uppercase tracking-widest flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-gold-illuminated" />
                  <span>VIEW PHYSICAL CARDS</span>
                </button>

                <button
                  onClick={toggleExpand}
                  className="border border-graphite-light px-3 py-1 text-ivory-dim hover:border-gold-illuminated hover:text-gold-illuminated uppercase tracking-widest flex items-center gap-1"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>[ COLLAPSE ]</span>
                </button>
              </div>
            </div>

            {/* Creative Filters: Search Bar + Dietary Switches */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Search Input */}
                <div className="md:col-span-5 relative">
                  <input
                    type="text"
                    placeholder="SEARCH DISHES, KEBABS, BIRYANI, SHEESHA..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-graphite/40 border border-graphite-light text-ivory font-mono text-xs uppercase placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none"
                  />
                  <Search className="w-4 h-4 text-gold-illuminated absolute left-4 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory-dim hover:text-ivory"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Dietary Filter Buttons */}
                <div className="md:col-span-7 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {dietaryOptions.map((opt) => {
                    const isActive = dietaryFilter === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setDietaryFilter(opt.id)}
                        className={`px-4 py-3 font-mono text-[11px] uppercase tracking-widest border transition-none flex items-center gap-2 whitespace-nowrap ${
                          isActive
                            ? 'border-gold-illuminated bg-gold-illuminated text-obsidian font-bold'
                            : 'border-graphite-light bg-graphite/30 text-ivory-muted hover:border-gold-illuminated hover:text-gold-illuminated'
                        }`}
                      >
                        {opt.dotColor && (
                          <span
                            className="w-2 h-2 inline-block border border-black/30"
                            style={{ backgroundColor: opt.dotColor }}
                          />
                        )}
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cuisine Category Tabs */}
              <div className="relative">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-graphite-light">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2.5 font-mono text-xs uppercase tracking-widest border-b-2 transition-none whitespace-nowrap ${
                          isActive
                            ? 'border-gold-illuminated text-gold-illuminated font-black bg-graphite/30'
                            : 'border-transparent text-ivory-muted hover:text-ivory hover:border-graphite-light'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
                <div className="absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-obsidian to-transparent pointer-events-none sm:hidden" />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const isSelected = selectedDishes.some((d) => d.id === item.id);
                const orderItem = orderItems.find((o) => o.id === item.id);
                const orderQty = orderItem ? orderItem.quantity : 0;
                return (
                  <div
                    key={item.id}
                    className={`group border p-6 transition-none flex flex-col justify-between ${
                      isSelected || orderQty > 0
                        ? 'border-gold-illuminated bg-graphite/60 shadow-lg'
                        : 'border-graphite-light bg-graphite/20 hover:border-gold-illuminated hover:bg-graphite/40'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 inline-block border ${
                              item.dietary === 'veg'
                                ? 'bg-green-500 border-green-700'
                                : item.dietary === 'non-veg'
                                ? 'bg-red-500 border-red-700'
                                : item.dietary === 'sheesha'
                                ? 'bg-electricTeal border-teal-700'
                                : 'bg-gold-champagne border-amber-700'
                            }`}
                            title={item.dietary.toUpperCase()}
                          />
                          <span className="font-mono text-[10px] text-ivory-dim tracking-widest uppercase">
                            {item.category.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <span className="font-mono text-lg font-bold text-gold-illuminated">
                          {item.price}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif font-black text-xl tracking-tight text-ivory uppercase group-hover:text-gold-champagne transition-none">
                          {item.name}
                        </h3>
                        {item.badge && (
                          <span className="inline-block mt-1 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-gold-illuminated text-gold-champagne font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="font-sans text-xs md:text-sm text-ivory-muted leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-graphite-light flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <button
                        onClick={() => {
                          const pageIdx = PHYSICAL_MENU_PAGES.findIndex(
                            (p) =>
                              p.title.toLowerCase().includes(item.category) ||
                              p.category.toLowerCase().includes(item.category)
                          );
                          setSelectedMenuPageIndex(pageIdx >= 0 ? pageIdx : 0);
                          setIsMenuModalOpen(true);
                        }}
                        className="text-[10px] uppercase text-ivory-dim hover:text-gold-illuminated flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3 text-gold-illuminated" />
                        <span>VIEW CARD</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {orderQty > 0 ? (
                          <div className="flex items-center border border-gold-illuminated bg-obsidian py-1 px-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() => onUpdateOrderQuantity?.(item.id, -1)}
                              className="p-0.5 text-ivory hover:text-gold-illuminated"
                              aria-label={`Decrease ${item.name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-bold text-gold-illuminated text-xs">
                              {orderQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateOrderQuantity?.(item.id, 1)}
                              className="p-0.5 text-ivory hover:text-gold-illuminated"
                              aria-label={`Increase ${item.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddDishToOrder?.(item)}
                            className="px-3 py-1.5 border border-gold-illuminated bg-gold-illuminated text-obsidian text-[10px] uppercase tracking-widest font-black hover:bg-gold-hover transition-none flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>ORDER</span>
                          </button>
                        )}

                        <button
                          onClick={() => toggleDishSelection(item)}
                          className={`p-1.5 border text-[10px] uppercase tracking-widest font-bold transition-none flex items-center gap-1 ${
                            isSelected
                              ? 'border-gold-illuminated bg-graphite text-gold-champagne'
                              : 'border-graphite-light text-ivory-dim hover:border-gold-illuminated'
                          }`}
                          title="Tasting Board"
                        >
                          {isSelected ? <Check className="w-3 h-3" /> : '★ BOARD'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Collapse Button */}
            <div className="pt-8 text-center border-t border-graphite-light">
              <button
                onClick={toggleExpand}
                className="border border-gold-illuminated text-gold-illuminated px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-black hover:bg-gold-illuminated hover:text-obsidian transition-none inline-flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                <span>[ COLLAPSE MENU ARCHIVE ]</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Table Tasting Board when dishes are selected */}
        {selectedDishes.length > 0 && (
          <div className="sticky bottom-6 z-30 p-6 border-2 border-gold-illuminated bg-obsidian-deep shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 font-mono">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold-illuminated text-obsidian flex items-center justify-center font-serif font-black text-xl">
                {selectedDishes.length}
              </div>
              <div>
                <span className="font-bold text-sm uppercase tracking-widest text-gold-champagne block">
                  TABLE TASTING BOARD // {selectedDishes.length} ITEMS SELECTED
                </span>
                <span className="text-xs text-ivory-dim">
                  Estimated Table Total: <strong className="text-gold-illuminated font-bold text-sm">₹{calculateTotal}</strong>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => {
                  setSelectedDishes([]);
                  if (onSelectDishesForBooking) {
                    onSelectDishesForBooking([]);
                  }
                }}
                className="px-4 py-3 border border-graphite-light text-ivory-dim hover:border-red-400 hover:text-red-400 transition-none text-xs uppercase tracking-widest"
              >
                [ CLEAR ]
              </button>

              <button
                onClick={() => {
                  if (onSelectDishesForBooking) {
                    onSelectDishesForBooking(selectedDishes.map((d) => d.name));
                  }
                  if (onAddDishesToOrder) {
                    onAddDishesToOrder(selectedDishes);
                  }
                  onOpenOrderModal?.();
                }}
                className="border border-gold-illuminated bg-gold-illuminated text-obsidian px-5 py-3 uppercase tracking-widest font-black text-xs hover:bg-gold-hover transition-none flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>[ ORDER DIRECTLY ]</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectDishesForBooking) {
                    onSelectDishesForBooking(selectedDishes.map((d) => d.name));
                  }
                  onOpenBooking();
                }}
                className="border border-graphite-light text-ivory px-5 py-3 uppercase tracking-widest font-bold text-xs hover:border-gold-illuminated hover:text-gold-illuminated transition-none flex items-center justify-center gap-2"
              >
                <span>[ ATTACH TO RESERVATION ]</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Physical Menu Cards */}
      <PhysicalMenuModal
        pages={PHYSICAL_MENU_PAGES}
        initialPageIndex={selectedMenuPageIndex}
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </section>
  );
};
