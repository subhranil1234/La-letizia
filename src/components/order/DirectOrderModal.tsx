'use client';

import React, { useState, useEffect } from 'react';
import { OrderItem, DirectOrderPayload } from '@/types';
import { LogoEmblem } from '../branding/LogoEmblem';
import { CAFE_INFO } from '@/data/cafeData';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Clock,
  MapPin,
  MessageCircle,
  Printer,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
} from 'lucide-react';

interface DirectOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
  onOpenMenu?: () => void;
}

export const DirectOrderModal: React.FC<DirectOrderModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onOpenMenu,
}) => {
  const [orderType, setOrderType] = useState<'takeaway_counter' | 'dine_in_table'>('takeaway_counter');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('In 20–25 Mins (Fast Track)');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<DirectOrderPayload | null>(null);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmedOrder) {
          setConfirmedOrder(null);
          onClose();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, confirmedOrder]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      errs.name = 'Please enter your full name.';
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number required.';
    }
    if (items.length === 0) {
      errs.items = 'Please add at least one dish to your order.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderId = `LL-ORD-${Math.floor(100 + Math.random() * 900)}`;
      const payload: DirectOrderPayload = {
        orderId: generatedOrderId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        tableOrTime: pickupTime,
        specialInstructions: specialInstructions.trim(),
        items: [...items],
        subtotal,
        gst,
        totalAmount: grandTotal,
        orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedPrepTime: orderType === 'takeaway_counter' ? '20–25 Mins' : '15–20 Mins',
      };
      setConfirmedOrder(payload);
      setIsSubmitting(false);
      onClearOrder();
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppMessage = (order: DirectOrderPayload) => {
    const itemLines = order.items
      .map((it) => `• ${it.name} x ${it.quantity} (₹${it.price * it.quantity})`)
      .join('\n');

    const text = `*NEW DIRECT ORDER // ${order.orderId}*
------------------------------
*Customer:* ${order.customerName}
*Phone:* ${order.customerPhone}
*Type:* ${order.orderType === 'takeaway_counter' ? 'Counter Takeaway (1st Floor Pickup)' : 'Dine-In Table Pre-Order'}
*Estimated Time:* ${order.tableOrTime}

*Ordered Dishes:*
${itemLines}

*Subtotal:* ₹${order.subtotal}
*GST (5%):* ₹${order.gst}
*Total Payable at Counter:* ₹${order.totalAmount}

${order.specialInstructions ? `*Special Notes:* ${order.specialInstructions}\n` : ''}
*Destination:* La Letizia Café & Restro, 70 South Park Circus, Ballygunge, Kolkata
Please confirm order transmission!`;

    const cleanNumber = CAFE_INFO.phone.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Direct Kitchen Ordering Modal"
    >
      {/* Dark Blur Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian/95 backdrop-blur-md"
        onClick={() => {
          if (confirmedOrder) {
            setConfirmedOrder(null);
            onClose();
          } else {
            onClose();
          }
        }}
      />

      {/* Main Dialog Shell */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-obsidian border-2 border-gold-illuminated p-4 sm:p-8 z-10 shadow-2xl flex flex-col justify-between">
        {/* =========================================================================
            STAGE 2: CONFIRMED DIGITAL KITCHEN TOKEN PASS (KOT)
            ========================================================================= */}
        {confirmedOrder ? (
          <div className="space-y-6">
            {/* Top Pass Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-graphite-light font-mono text-xs uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-400 inline-block" />
                <span className="text-gold-illuminated font-bold">DIGITAL KITCHEN ORDER TOKEN</span>
              </div>

              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="p-1.5 border border-graphite-light text-ivory hover:bg-gold-illuminated hover:text-obsidian hover:border-gold-illuminated transition-none"
                aria-label="Close pass"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Confirmation Banner */}
            <div className="p-4 bg-graphite/40 border border-green-500/50 font-mono text-xs space-y-1">
              <div className="flex items-center gap-2 text-green-400 font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>ORDER TRANSMITTED DIRECTLY TO RESTRO CHEF</span>
              </div>
              <p className="text-ivory-dim text-[11px] leading-relaxed">
                Your direct order is queued in the kitchen. Present this digital token upon collection at the counter or tableside.
              </p>
            </div>

            {/* Brand Header */}
            <div className="flex items-center justify-between pb-4 border-b border-graphite-light">
              <div className="flex items-center gap-3">
                <LogoEmblem size={38} glow={false} />
                <div>
                  <span className="font-serif font-black text-lg uppercase text-ivory block">
                    LA LETIZIA DIRECT
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gold-champagne/70">
                    BALLYGUNGE, KOLKATA • ZEROONE
                  </span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[9px] uppercase text-ivory-dim block">TOKEN NUMBER</span>
                <span className="text-xl font-black text-gold-illuminated">
                  #{confirmedOrder.orderId}
                </span>
              </div>
            </div>

            {/* Order Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-graphite-light font-mono text-[11px]">
              <div>
                <span className="text-gold-champagne uppercase block">CUSTOMER</span>
                <span className="font-bold text-ivory uppercase">{confirmedOrder.customerName}</span>
              </div>
              <div>
                <span className="text-gold-champagne uppercase block">ORDER TYPE</span>
                <span className="font-bold text-gold-illuminated uppercase">
                  {confirmedOrder.orderType === 'takeaway_counter' ? 'Counter Pickup' : 'Table Pre-Order'}
                </span>
              </div>
              <div>
                <span className="text-gold-champagne uppercase block">ORDER TIME</span>
                <span className="font-bold text-ivory">{confirmedOrder.orderTime}</span>
              </div>
              <div>
                <span className="text-gold-champagne uppercase block">ESTIMATED READY</span>
                <span className="font-bold text-ivory">{confirmedOrder.estimatedPrepTime}</span>
              </div>
            </div>

            {/* Ordered Dishes List */}
            <div className="space-y-2 font-mono text-xs">
              <span className="text-[10px] uppercase text-gold-champagne font-bold tracking-widest block">
                ITEMIZED ORDER ({confirmedOrder.items.length} DISHES)
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {confirmedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 border-b border-white/5 text-[11px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-illuminated inline-block" />
                      <span className="text-ivory font-bold">{item.name}</span>
                      <span className="text-ivory-dim">× {item.quantity}</span>
                    </div>
                    <span className="text-gold-illuminated font-mono">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-3 space-y-1 text-right text-xs">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Subtotal:</span>
                  <span>₹{confirmedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>GST (5%):</span>
                  <span>₹{confirmedOrder.gst}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1 border-t border-graphite-light">
                  <span className="text-gold-champagne uppercase">Net Payable at Counter:</span>
                  <span className="text-gold-illuminated text-base">₹{confirmedOrder.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Collection Instructions */}
            <div className="p-3 bg-graphite/30 border border-graphite-light font-mono text-[11px] text-ivory-dim flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold-illuminated shrink-0 mt-0.5" />
              <span>
                Pick up at <strong>1st Floor Reception Counter</strong>, 70 South Park Circus, Ballygunge (Opposite Quest Mall Gate 5). Show this token number.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={generateWhatsAppMessage(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border-2 border-green-500 bg-green-500 text-obsidian px-5 py-3 font-mono text-xs uppercase tracking-widest font-black hover:bg-green-400 transition-none flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>[ SEND ORDER TO CAFÉ WHATSAPP ]</span>
              </a>

              <button
                onClick={handlePrint}
                className="border border-graphite-light px-4 py-3 font-mono text-xs uppercase tracking-widest text-ivory hover:border-gold-illuminated hover:text-gold-illuminated transition-none flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>[ PRINT PASS ]</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="border border-gold-illuminated bg-transparent text-gold-illuminated px-5 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-gold-illuminated hover:text-obsidian transition-none"
              >
                [ DONE ]
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             STAGE 1: DIRECT ORDER REVIEW & CUSTOMER CHECKOUT
             ========================================================================= */
          <div className="space-y-6">
            {/* Top Control Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-graphite-light font-mono text-xs uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-gold-illuminated" />
                <span className="text-gold-illuminated font-bold">
                  DIRECT ONLINE ORDER // RESTRO KITCHEN
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 border border-graphite-light text-ivory hover:bg-gold-illuminated hover:text-obsidian hover:border-gold-illuminated transition-none"
                aria-label="Close order modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Order Type Toggle */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-champagne font-bold block">
                01 // SELECT ORDER MODE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway_counter')}
                  className={`p-3 border text-left transition-none flex flex-col justify-between ${
                    orderType === 'takeaway_counter'
                      ? 'border-gold-illuminated bg-gold-illuminated text-obsidian font-bold'
                      : 'border-graphite-light bg-graphite/30 text-ivory hover:border-gold-illuminated'
                  }`}
                >
                  <span className="uppercase font-serif font-black tracking-tight text-sm">
                    Counter Takeaway
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider block mt-1 ${orderType === 'takeaway_counter' ? 'text-obsidian/80' : 'text-ivory-dim'}`}>
                    1st Floor Reception Pickup
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('dine_in_table')}
                  className={`p-3 border text-left transition-none flex flex-col justify-between ${
                    orderType === 'dine_in_table'
                      ? 'border-gold-illuminated bg-gold-illuminated text-obsidian font-bold'
                      : 'border-graphite-light bg-graphite/30 text-ivory hover:border-gold-illuminated'
                  }`}
                >
                  <span className="uppercase font-serif font-black tracking-tight text-sm">
                    Dine-In Pre-Order
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider block mt-1 ${orderType === 'dine_in_table' ? 'text-obsidian/80' : 'text-ivory-dim'}`}>
                    Ready on Arrival at Table
                  </span>
                </button>
              </div>
            </div>

            {/* Order Items List */}
            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs border-b border-graphite-light pb-2">
                <span className="text-gold-champagne uppercase font-bold tracking-widest text-[10px]">
                  02 // ORDERED DISHES ({items.length})
                </span>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearOrder}
                    className="text-[10px] uppercase text-ivory-dim hover:text-red-400 transition-none"
                  >
                    [ CLEAR ALL ]
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-graphite-light bg-graphite/20 space-y-3">
                  <UtensilsCrossed className="w-8 h-8 text-gold-champagne/40 mx-auto" />
                  <p className="text-ivory-dim text-xs">
                    Your order bag is currently empty. Explore our authentic menu cards to select dishes.
                  </p>
                  {onOpenMenu && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenMenu();
                      }}
                      className="inline-flex items-center gap-1.5 border border-gold-illuminated px-4 py-2 text-gold-illuminated text-xs uppercase font-bold hover:bg-gold-illuminated hover:text-obsidian transition-none"
                    >
                      <span>[ BROWSE MENU DISHES ]</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-graphite/30 border border-graphite-light flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-serif font-bold text-sm text-ivory block uppercase">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-ivory-dim block">
                          ₹{item.price} each
                        </span>
                      </div>

                      <div className="flex items-center justify-between xs:justify-end gap-3 w-full xs:w-auto">
                        <div className="flex items-center border border-graphite-light bg-obsidian">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-ivory-dim hover:text-gold-illuminated hover:bg-graphite"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 font-bold text-xs text-gold-illuminated min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-ivory-dim hover:text-gold-illuminated hover:bg-graphite"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-gold-illuminated min-w-16 text-right">
                          ₹{item.price * item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-ivory-dim hover:text-red-400 transition-none ml-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {errors.items && (
                <span className="text-red-400 text-[10px] font-mono block">{errors.items}</span>
              )}
            </div>

            {/* Customer Details Form */}
            <form onSubmit={handlePlaceOrder} className="space-y-4 font-mono text-xs" noValidate>
              <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-bold block pt-2 border-t border-graphite-light">
                03 // CUSTOMER & SCHEDULE PROTOCOL
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-champagne block mb-1.5 font-bold">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. S. Mukherjee"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-graphite/40 border text-ivory text-base sm:text-xs uppercase placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none ${
                      errors.name ? 'border-red-400' : 'border-graphite-light'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-[10px] mt-1 block">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-champagne block mb-1.5 font-bold">
                    MOBILE NUMBER *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98300 00000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-graphite/40 border text-ivory text-base sm:text-xs uppercase placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none ${
                      errors.phone ? 'border-red-400' : 'border-graphite-light'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-red-400 text-[10px] mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-champagne block mb-1.5 font-bold">
                    TIME SLOT ESTIMATE
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-graphite/40 border border-graphite-light text-ivory text-base sm:text-xs uppercase focus:border-gold-illuminated focus:outline-none transition-none"
                  >
                    <option value="In 20–25 Mins (Fast Track)">In 20–25 Mins (Fast Track)</option>
                    <option value="In 30–35 Mins (Standard)">In 30–35 Mins (Standard)</option>
                    <option value="In 45 Mins (Peak Restro)">In 45 Mins (Peak Restro)</option>
                    <option value="Schedule for 7:30 PM">7:30 PM Today</option>
                    <option value="Schedule for 8:30 PM">8:30 PM Today</option>
                    <option value="Schedule for 9:30 PM">9:30 PM Today</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-champagne block mb-1.5 font-bold">
                    SPECIAL CHEF NOTES (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mild spice, extra dip"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-graphite/40 border border-graphite-light text-ivory text-base sm:text-xs placeholder:text-ivory-dim/40 focus:border-gold-illuminated focus:outline-none transition-none"
                  />
                </div>
              </div>

              {/* Bill Breakdown Box */}
              <div className="p-4 bg-graphite/20 border border-graphite-light space-y-2 text-xs">
                <div className="flex justify-between text-ivory-dim">
                  <span>Food Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items):</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-ivory-dim">
                  <span>Restaurant GST (5%):</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-graphite-light text-ivory">
                  <span className="text-gold-champagne uppercase">Net Payable at Counter:</span>
                  <span className="text-gold-illuminated text-base">₹{grandTotal}</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[10px] text-ivory-dim flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-illuminated shrink-0" />
                  <span>Instant KOT generation • Pay upon counter pickup</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full sm:w-auto border-2 border-gold-illuminated bg-gold-illuminated text-obsidian px-5 sm:px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-black hover:bg-gold-hover transition-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING ORDER TO RESTRO...</span>
                  ) : (
                    <>
                      <span>[ PLACE DIRECT ORDER & ISSUE TOKEN ]</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
