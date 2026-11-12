import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useScrollSectionVisible } from './ScrollSection';

interface FacilitiesProps {
  onOpenBooking: () => void;
}

export interface FacilityCardItem {
  id: string;
  title: string;
  imageUrl: string;
  imagePosition?: string;
  highlights: string[];
}

const FACILITY_ITEMS: FacilityCardItem[] = [
  {
    id: 'classic-twin-room',
    title: 'Classic Twin Room',
    imageUrl: '/assets/facility-room-01.jpg',
    imagePosition: 'object-[50%_62%]',
    highlights: [
      'Twin Beds',
      'Air-Conditioning & Ceiling Fan',
      'Attached Bathroom',
      'Carved Wooden Lounge Chair',
      'Warm Brick Accent Interior',
    ],
  },
  {
    id: 'family-double-suite',
    title: 'Spacious Family Twin',
    imageUrl: '/assets/facility-room-02.jpg',
    imagePosition: 'object-[50%_68%]',
    highlights: [
      'Two Double Beds',
      'Spacious Family Suite Layout',
      'Wooden Wardrobe & Vanity Desk',
      'Attached Bathroom',
      'Warm Recessed Lighting',
    ],
  },
  {
    id: 'balcony-garden-twin',
    title: 'Balcony Garden Twin',
    imageUrl: '/assets/facility-room-03.jpg',
    imagePosition: 'object-[50%_64%]',
    highlights: [
      'Twin Platform Beds',
      'Private Garden Balcony',
      'Outdoor Seating Area',
      'Floor-to-Ceiling Glass View',
      'Cove Lighting & Ceiling Fan',
    ],
  },
  {
    id: 'garden-veranda-suite',
    title: 'Garden Veranda Suite',
    imageUrl: '/assets/facility-room-04.jpg',
    imagePosition: 'object-[50%_65%]',
    highlights: [
      'King Bed',
      'Upholstered Sofa Lounge',
      'Private Garden Veranda',
      'Fluted Timber Feature Wall',
      'Ceiling Fan & Ambient Lighting',
    ],
  },
  {
    id: 'standard-comfort-queen',
    title: 'Standard Comfort Queen',
    imageUrl: '/assets/facility-room-05.jpg',
    imagePosition: 'object-[50%_66%]',
    highlights: [
      'Queen Double Bed',
      'Air-Conditioning',
      'Electric Kettle & Drinking Water',
      'Intercom Telephone',
      'Full Blackout Curtains',
    ],
  },
  {
    id: 'palm-view-timber-twin',
    title: 'Palm View Timber Twin',
    imageUrl: '/assets/facility-room-06.jpg',
    imagePosition: 'object-[50%_58%]',
    highlights: [
      'Twin Beds',
      'Vaulted Timber-Beam Ceiling',
      'Flat-Screen TV',
      'Rattan Pendant Lighting',
      'Panoramic Palm-Grove Views',
    ],
  },
  {
    id: 'tropical-terrace-king',
    title: 'Tropical Terrace King',
    imageUrl: '/assets/facility-room-07.jpg',
    imagePosition: 'object-[50%_65%]',
    highlights: [
      'King Bed',
      'Private Balcony Terrace',
      'Two Lounge Armchairs & Desk',
      'Flat-Screen TV',
      'Window Reading Nook',
    ],
  },
];

export const Facilities: React.FC<FacilitiesProps> = ({ onOpenBooking }) => {
  const prefersReducedMotion = useReducedMotion();
  const isSectionVisible = useScrollSectionVisible();
  const trackRef = useRef<HTMLDivElement>(null);
  const modalTouchStartX = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedFacility = selectedIndex !== null ? FACILITY_ITEMS[selectedIndex] : null;

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < maxScrollLeft - 4);

    const children = Array.from(el.children) as HTMLElement[];
    if (children.length === 0) return;

    let closestIdx = 0;
    let smallestDiff = Infinity;
    for (let i = 0; i < children.length; i += 1) {
      const diff = Math.abs(children[i].offsetLeft - el.scrollLeft);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestIdx = i;
      }
    }
    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;

      const boundedIndex = Math.max(0, Math.min(index, children.length - 1));
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const targetLeft = Math.min(children[boundedIndex].offsetLeft, maxScrollLeft);

      el.scrollTo({
        left: targetLeft,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion]
  );

  const stepCarousel = useCallback(
    (direction: 'prev' | 'next') => {
      const el = trackRef.current;
      if (!el) return;
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      if (direction === 'next') {
        const nextCard = children.find((child) => child.offsetLeft > el.scrollLeft + 8);
        const targetLeft = nextCard ? Math.min(nextCard.offsetLeft, maxScrollLeft) : maxScrollLeft;
        el.scrollTo({
          left: targetLeft,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      } else {
        const prevCards = children.filter((child) => child.offsetLeft < el.scrollLeft - 8);
        const prevCard = prevCards[prevCards.length - 1];
        const targetLeft = prevCard ? prevCard.offsetLeft : 0;
        el.scrollTo({
          left: targetLeft,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [prefersReducedMotion]
  );

  const stepModal = useCallback((direction: 'prev' | 'next') => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      const delta = direction === 'next' ? 1 : -1;
      return (current + delta + FACILITY_ITEMS.length) % FACILITY_ITEMS.length;
    });
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        stepModal('next');
      } else if (event.key === 'ArrowLeft') {
        stepModal('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, stepModal]);

  const handleModalTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    modalTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleModalTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (modalTouchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? modalTouchStartX.current;
    const deltaX = endX - modalTouchStartX.current;
    modalTouchStartX.current = null;
    if (Math.abs(deltaX) > 40) {
      stepModal(deltaX < 0 ? 'next' : 'prev');
    }
  };

  return (
    <section
      id="facilities"
      className="relative py-16 md:py-24 bg-[#FAF8F5] dark:bg-stone-950 scroll-mt-16 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 md:mb-10 flex items-end justify-between gap-4"
        >
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-luxury text-stone-900 dark:text-stone-100 tracking-tight">
            Our Facilities
          </h2>
          <span className="sm:hidden text-xs font-medium text-stone-500 dark:text-stone-400 tabular-nums">
            {activeIndex + 1} / {FACILITY_ITEMS.length}
          </span>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            onClick={() => stepCarousel('prev')}
            disabled={!canScrollPrev}
            aria-label="Previous facility"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 shadow-md hover:border-stone-400 dark:hover:border-stone-500 disabled:opacity-35 disabled:cursor-default transition-all cursor-pointer absolute left-2 sm:-left-4 md:-left-5 top-[118px] sm:top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={trackRef}
            onScroll={updateScrollState}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FACILITY_ITEMS.map((facility, idx) => (
              <motion.article
                key={facility.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={isSectionVisible ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : Math.min(idx, 4) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group shrink-0 snap-start w-full sm:w-[285px] lg:w-[295px] bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-[0_6px_24px_rgba(28,25,23,0.05)] overflow-hidden flex flex-col justify-between transition-colors duration-300"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    aria-label={`View ${facility.title} photo`}
                    className="block w-full aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800 border-b border-stone-100 dark:border-stone-800 cursor-pointer text-left"
                  >
                    <img
                      src={facility.imageUrl}
                      alt={facility.title}
                      className={`w-full h-full object-cover ${facility.imagePosition ?? 'object-center'} transition-transform duration-500 group-hover:scale-[1.03]`}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                  </button>

                  <div className="px-5 pt-5 pb-4">
                    <h3 className="text-lg font-bold font-serif-luxury text-stone-900 dark:text-stone-100 mb-3">
                      {facility.title}
                    </h3>

                    <ul className="space-y-1.5 min-h-[124px] text-xs sm:text-[13px] text-stone-600 dark:text-stone-400">
                      {facility.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 leading-relaxed">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 w-1 h-1 rounded-full bg-stone-500 dark:bg-stone-400 shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="rounded-full py-2 px-3 border border-amber-700/75 dark:border-amber-400/60 text-amber-800 dark:text-amber-300 hover:bg-amber-700 hover:text-white dark:hover:bg-amber-400 dark:hover:text-stone-950 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                  >
                    Book Now
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className="rounded-full py-2 px-3 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 hover:border-stone-900 dark:hover:border-stone-300 text-xs font-semibold tracking-wide transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => stepCarousel('next')}
            disabled={!canScrollNext}
            aria-label="Next facility"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 shadow-md hover:border-stone-400 dark:hover:border-stone-500 disabled:opacity-35 disabled:cursor-default transition-all cursor-pointer absolute right-2 sm:-right-4 md:-right-5 top-[118px] sm:top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 flex sm:hidden items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous facility card"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 disabled:opacity-35 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Facility slides">
            {FACILITY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to ${item.title}`}
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? 'w-5 bg-amber-700 dark:bg-amber-400'
                    : 'w-2 bg-stone-300 dark:bg-stone-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === FACILITY_ITEMS.length - 1}
            aria-label="Next facility card"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-200 disabled:opacity-35 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedFacility && selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIndex(null)}
                className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="facility-modal-title"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
                  onClick={(event) => event.stopPropagation()}
                  className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
                >
                  <div
                    onTouchStart={handleModalTouchStart}
                    onTouchEnd={handleModalTouchEnd}
                    className="relative bg-stone-100 dark:bg-stone-950 flex items-center justify-center shrink-0"
                  >
                    <img
                      src={selectedFacility.imageUrl}
                      alt={selectedFacility.title}
                      className="w-full max-h-[52vh] object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => stepModal('prev')}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-100 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-stone-800 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => stepModal('next')}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-100 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-stone-800 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <span className="absolute bottom-3 left-3 rounded-full bg-stone-900/75 text-white text-[11px] font-medium px-2.5 py-1 tabular-nums">
                      {selectedIndex + 1} / {FACILITY_ITEMS.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedIndex(null)}
                      aria-label="Close facility preview"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-stone-800 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 overflow-y-auto">
                    <h3
                      id="facility-modal-title"
                      className="text-xl font-bold font-serif-luxury text-stone-900 dark:text-stone-100 mb-3"
                    >
                      {selectedFacility.title}
                    </h3>

                    <ul className="space-y-1.5 mb-5 text-sm text-stone-600 dark:text-stone-400">
                      {selectedFacility.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-700 dark:bg-amber-400 shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedIndex(null);
                          onOpenBooking();
                        }}
                        className="flex-1 rounded-full py-2.5 px-4 border border-amber-700/75 dark:border-amber-400/60 text-amber-800 dark:text-amber-300 hover:bg-amber-700 hover:text-white dark:hover:bg-amber-400 dark:hover:text-stone-950 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      >
                        Book Now
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(null)}
                        className="rounded-full py-2.5 px-5 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-stone-900 dark:hover:border-stone-300 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
