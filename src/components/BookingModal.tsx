import React, { useState, useMemo, useEffect } from 'react';
import { X, Calendar, Users, Home, CheckCircle2, ShieldCheck, Printer, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { RESORT_DATA, Villa } from '../data/resortData';

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVillaId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedVillaId,
  initialCheckIn = '2026-12-14',
  initialCheckOut = '2026-12-19',
  initialGuests = 2,
}) => {
  const [selectedVillaId, setSelectedVillaId] = useState(preselectedVillaId || RESORT_DATA.villas[0].id);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [addOns, setAddOns] = useState<{ [key: string]: boolean }>({
    helicopter: false,
    sommelier: false,
    spaCeremony: false,
    hotAirBalloon: false,
  });

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation View
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen && preselectedVillaId) {
      setSelectedVillaId(preselectedVillaId);
    }
  }, [isOpen, preselectedVillaId]);

  const currentVilla: Villa = useMemo(() => {
    return RESORT_DATA.villas.find((v) => v.id === selectedVillaId) || RESORT_DATA.villas[0];
  }, [selectedVillaId]);

  // Night calculation
  const nights = useMemo(() => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  }, [checkIn, checkOut]);

  // Add-on cost calculations
  const addOnPrices = {
    helicopter: 1850,
    sommelier: 320,
    spaCeremony: 760,
    hotAirBalloon: 850,
  };

  const addOnTotal = useMemo(() => {
    let sum = 0;
    if (addOns.helicopter) sum += addOnPrices.helicopter;
    if (addOns.sommelier) sum += addOnPrices.sommelier;
    if (addOns.spaCeremony) sum += addOnPrices.spaCeremony;
    if (addOns.hotAirBalloon) sum += addOnPrices.hotAirBalloon;
    return sum;
  }, [addOns]);

  const basePrice = currentVilla.pricePerNight * nights;
  const conservationLevy = Math.round((basePrice + addOnTotal) * 0.03);
  const totalPrice = basePrice + addOnTotal + conservationLevy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      alert('Please provide your name and email for your private reservation.');
      return;
    }
    const randomCode = `AURA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(randomCode);
    setIsConfirmed(true);
  };

  const resetAndClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  // Easy Backspace & Escape key handling to close the reservation page
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        resetAndClose();
        return;
      }
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (e.key === 'Backspace' && tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
        e.preventDefault();
        resetAndClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.28 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetAndClose();
            }
          }}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 14 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 260, damping: 26 }
            }
            className="bg-[#FAF8F5] dark:bg-stone-900 border border-stone-200 dark:border-stone-700 max-w-4xl w-full max-h-[92vh] flex flex-col relative shadow-2xl text-stone-900 dark:text-stone-100 transition-colors overflow-hidden rounded-sm"
          >
        {/* Sticky Header with prominent Back button & Close */}
        <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-stone-900 sticky top-0 z-30 shrink-0 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={resetAndClose}
              type="button"
              className="py-1.5 px-3 -ml-1 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-stone-200/60 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer shadow-sm"
              title="Go back to resort (Backspace / Esc)"
              aria-label="Back to resort"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" />
              <span className="font-sans uppercase tracking-wider text-[11px]">Back</span>
            </button>
            <div className="h-4 w-[1px] bg-stone-300 dark:bg-stone-700 hidden sm:block" />
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium block">
                Private Booking Engine
              </span>
              <h3 className="text-base sm:text-xl font-serif-luxury text-stone-900 dark:text-stone-100 leading-tight">
                {isConfirmed ? 'Reservation Confirmed' : 'Configure Your Mountain Stay'}
              </h3>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            type="button"
            className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/60 rounded-full transition-colors cursor-pointer"
            title="Close (Esc)"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
        {isConfirmed ? (
          <motion.div
            key="confirmed"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.35, ease: LUXURY_EASE }}
            className="p-6 md:p-10 space-y-8"
          >
            <div className="text-center py-6 border-b border-stone-200 dark:border-stone-800">
              <motion.div
                initial={shouldReduceMotion ? undefined : { scale: 0.5, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.08 }}
                className="inline-flex p-3 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/40 rounded-full mb-4"
              >
                <CheckCircle2 className="w-8 h-8 text-amber-700 dark:text-amber-300" />
              </motion.div>
              <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 mb-1">
                Booking Reference
              </p>
              <h4 className="text-3xl font-mono text-stone-900 dark:text-stone-100 tracking-wider">{confirmationCode}</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                A formal invitation and itinerary has been dispatched to <strong>{guestEmail}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-stone-950/60 p-6 border border-stone-200 dark:border-stone-800 shadow-sm dark:shadow-none">
              <div>
                <h5 className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">Reservation Folio</h5>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Primary Guest:</span>
                    <span className="text-stone-900 dark:text-stone-200 font-medium">{guestName}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Residence:</span>
                    <span className="text-stone-900 dark:text-stone-200 font-medium">{currentVilla.name}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Check-in Date:</span>
                    <span className="text-stone-900 dark:text-stone-200 font-medium">{checkIn} (15:00)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Check-out Date:</span>
                    <span className="text-stone-900 dark:text-stone-200 font-medium">{checkOut} (11:00)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Duration:</span>
                    <span className="text-stone-900 dark:text-stone-200 font-medium">{nights} Nights</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Total Party:</span>
                    <span className="text-stone-900 dark:text-stone-200 font-medium">{guests} Guests</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">Financial Settlement</h5>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Base Residence ({nights} nights):</span>
                    <span className="text-stone-900 dark:text-stone-200">₹{basePrice.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Bespoke Inclusions & Transfers:</span>
                    <span className="text-stone-900 dark:text-stone-200">₹{addOnTotal.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-stone-500 dark:text-stone-400">Alpine Forest Conservation (3%):</span>
                    <span className="text-stone-900 dark:text-stone-200">₹{conservationLevy.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-sm font-semibold">
                    <span className="text-stone-900 dark:text-stone-200">Total Balance:</span>
                    <span className="text-amber-800 dark:text-amber-200 font-mono">₹{totalPrice.toLocaleString()}</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-300/80 shrink-0" />
                  <span>No prepayment charged today. Settled upon arrival with your private butler.</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => window.print()}
                type="button"
                className="py-2.5 px-4 border border-stone-300 dark:border-stone-700 hover:border-stone-500 text-stone-800 dark:text-stone-300 text-xs tracking-wider uppercase transition-colors flex items-center gap-2 bg-white dark:bg-stone-900"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Folio</span>
              </button>
              <button
                onClick={resetAndClose}
                type="button"
                className="py-2.5 px-6 bg-amber-100 hover:bg-amber-200 dark:bg-amber-100 dark:hover:bg-amber-200 text-stone-950 text-xs tracking-[0.2em] uppercase font-medium shadow-sm"
              >
                Return to Resort
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="p-6 md:p-10 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Configuration Controls */}
              <div className="md:col-span-7 space-y-6">
                {/* Villa Choice */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-600 dark:text-stone-400 mb-2 font-medium">
                    Select Residence
                  </label>
                  <select
                    value={selectedVillaId}
                    onChange={(e) => setSelectedVillaId(e.target.value)}
                    className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2.5 px-3 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none cursor-pointer"
                  >
                    {RESORT_DATA.villas.map((v) => (
                      <option key={v.id} value={v.id} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-200">
                        {v.name} (₹{v.pricePerNight.toLocaleString()} / Night)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-600 dark:text-stone-400 mb-2 font-medium">
                      Arrival
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-2.5 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-600 dark:text-stone-400 mb-2 font-medium">
                      Departure
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-2.5 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-600 dark:text-stone-400 mb-2 font-medium">
                      Party Size
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-2.5 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none cursor-pointer"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 Guests</option>
                      <option value={8}>8 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Curated Bespoke Add-ons */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-600 dark:text-stone-400 mb-3 font-medium">
                    Curated Enhancements (Optional)
                  </label>
                  <div className="space-y-2.5">
                    <label className="flex items-start gap-3 p-3 bg-white dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 cursor-pointer shadow-sm dark:shadow-none">
                      <input
                        type="checkbox"
                        checked={addOns.helicopter}
                        onChange={(e) => setAddOns({ ...addOns, helicopter: e.target.checked })}
                        className="mt-1 accent-amber-600 dark:accent-amber-300"
                      />
                      <div className="text-xs">
                        <div className="flex justify-between text-stone-900 dark:text-stone-200 font-medium">
                          <span>Private Helipad Valley Transfer & Glacier Orbit</span>
                          <span className="text-amber-800 dark:text-amber-200 font-mono">+₹1,850</span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light mt-0.5">
                          Airbus H130 direct pickup from Milan/Zurich straight onto resort helipad.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-white dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 cursor-pointer shadow-sm dark:shadow-none">
                      <input
                        type="checkbox"
                        checked={addOns.sommelier}
                        onChange={(e) => setAddOns({ ...addOns, sommelier: e.target.checked })}
                        className="mt-1 accent-amber-600 dark:accent-amber-300"
                      />
                      <div className="text-xs">
                        <div className="flex justify-between text-stone-900 dark:text-stone-200 font-medium">
                          <span>Sommelier Subterranean Cellar Tasting</span>
                          <span className="text-amber-800 dark:text-amber-200 font-mono">+₹320</span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light mt-0.5">
                          Exclusive 6-vintage vertical tasting in our 12°C bedrock cave.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-white dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 cursor-pointer shadow-sm dark:shadow-none">
                      <input
                        type="checkbox"
                        checked={addOns.spaCeremony}
                        onChange={(e) => setAddOns({ ...addOns, spaCeremony: e.target.checked })}
                        className="mt-1 accent-amber-600 dark:accent-amber-300"
                      />
                      <div className="text-xs">
                        <div className="flex justify-between text-stone-900 dark:text-stone-200 font-medium">
                          <span>Twilight Hot Spring Couples Ceremony</span>
                          <span className="text-amber-800 dark:text-amber-200 font-mono">+₹760</span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light mt-0.5">
                          120-minute private volcanic onsen access with candlelit massage.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-white dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 cursor-pointer shadow-sm dark:shadow-none">
                      <input
                        type="checkbox"
                        checked={addOns.hotAirBalloon}
                        onChange={(e) => setAddOns({ ...addOns, hotAirBalloon: e.target.checked })}
                        className="mt-1 accent-amber-600 dark:accent-amber-300"
                      />
                      <div className="text-xs">
                        <div className="flex justify-between text-stone-900 dark:text-stone-200 font-medium">
                          <span>Sunrise Cloud-River Hot Air Balloon Flight</span>
                          <span className="text-amber-800 dark:text-amber-200 font-mono">+₹850</span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light mt-0.5">
                          Private dawn balloon flight with champagne meadow breakfast.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-4">
                  <h4 className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
                    Primary Guest & Contact
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] tracking-wider text-stone-600 dark:text-stone-400 mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Lord Alexander Sinclair"
                        className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-3 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-wider text-stone-600 dark:text-stone-400 mb-1">Direct Email</label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="sinclair@private.ch"
                        className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-3 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-wider text-stone-600 dark:text-stone-400 mb-1">Telephone / WhatsApp</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+41 79 000 0000"
                      className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-3 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-wider text-stone-600 dark:text-stone-400 mb-1">Special Preferences / Dietary Notes</label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Sunset wing requested, lactose intolerance, arrival via private helicopter."
                      className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-3 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing Breakdown & Real Photo Preview */}
              <div className="md:col-span-5 flex flex-col justify-between bg-stone-50 dark:bg-stone-950 p-6 border border-stone-200 dark:border-stone-800">
                <div>
                  <div className="aspect-[16/10] overflow-hidden mb-4 border border-stone-200 dark:border-stone-800 relative shadow-sm dark:shadow-none bg-stone-200 dark:bg-stone-800">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentVilla.id}
                        src={currentVilla.coverImage}
                        alt={currentVilla.name}
                        referrerPolicy="no-referrer"
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, ease: LUXURY_EASE }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute bottom-2 left-2 right-2 bg-stone-950/80 px-2.5 py-1 text-[10px] text-stone-200 flex justify-between">
                      <span>{currentVilla.name}</span>
                      <span>{currentVilla.sqm} m²</span>
                    </div>
                  </div>

                  <h5 className="text-xs uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400 mb-4 font-medium">
                    Estimated Investment Summary
                  </h5>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-stone-700 dark:text-stone-300">
                      <span>
                        ₹{currentVilla.pricePerNight.toLocaleString()} × {nights} {nights === 1 ? 'Night' : 'Nights'}
                      </span>
                      <span className="font-mono text-stone-900 dark:text-stone-200 font-medium">₹{basePrice.toLocaleString()}</span>
                    </div>

                    {addOnTotal > 0 && (
                      <div className="flex justify-between text-stone-700 dark:text-stone-300">
                        <span>Selected Bespoke Inclusions</span>
                        <span className="font-mono text-stone-900 dark:text-stone-200 font-medium">+₹{addOnTotal.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-stone-500 dark:text-stone-400 text-[11px]">
                      <span>Alpine Forest Conservation (3%)</span>
                      <span className="font-mono">₹{conservationLevy.toLocaleString()}</span>
                    </div>

                    <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between items-baseline">
                      <span className="text-stone-900 dark:text-stone-200 text-sm font-semibold">Total Balance</span>
                      <span className="text-amber-800 dark:text-amber-200 font-mono text-xl font-bold">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2 text-[11px] text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300/80" />
                      <span>Dedicated 24/7 sanctuary butler included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300/80" />
                      <span>Complimentary thermal mineral onsen access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300/80" />
                      <span>Full cancellation flexibility up to 14 days</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-amber-100 hover:bg-amber-200 text-stone-950 text-xs tracking-[0.2em] uppercase font-medium transition-colors shadow-sm cursor-pointer"
                  >
                    Confirm Private Reservation
                  </button>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="w-full py-2.5 px-4 border border-stone-300 dark:border-stone-700 hover:border-stone-400 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Resort</span>
                  </button>
                  <p className="text-center text-[10px] text-stone-500 dark:text-stone-400 mt-1">
                    Direct confirmation · Instant guarantee · Zero booking fees
                  </p>
                </div>
              </div>
            </div>
          </motion.form>
        )}
        </AnimatePresence>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
