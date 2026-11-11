import React, { useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { RESORT_DATA } from '../data/resortData';
import { useScrollSectionVisible } from './ScrollSection';

interface FacilitiesProps {
  onOpenBooking: () => void;
}

interface FacilityItem {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  actionLabel: string;
}

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const FACILITIES_LIST: FacilityItem[] = [
  {
    number: '01',
    category: 'Luxury Accommodation',
    title: 'Hillside Villas & Suites',
    description: 'Whitewashed mountain villas with private balconies overlooking lush tea slopes.',
    image: RESORT_DATA.userImages.hillsideTwinVillas,
    imageAlt: 'White hillside resort villas with terracotta roof accents nestled on green tea slopes',
    highlights: ['Private valley balconies', '24-hour butler care'],
    actionLabel: 'Reserve Villa',
  },
  {
    number: '02',
    category: 'Timber Bungalows',
    title: 'Cliffside Timber Deck Cottages',
    description: 'Thatched wooden bungalows with raised decks facing dramatic mountain peaks.',
    image: RESORT_DATA.userImages.cliffTimberBungalow,
    imageAlt: 'Thatched timber bungalow with wooden balcony deck overlooking emerald mountain cliffs',
    highlights: ['Elevated timber decks', 'Private hillside spacing'],
    actionLabel: 'Explore Bungalow',
  },
  {
    number: '03',
    category: 'Dining & 24/7 Care',
    title: 'Estate Manor & Concierge',
    description: 'Outdoor café terrace dining at our main manor with 24/7 guest assistance.',
    image: RESORT_DATA.userImages.colonialManorEstate,
    imageAlt: 'Colonial resort manor with manicured green lawns, outdoor café terrace, and misty forest backdrop',
    highlights: ['All-day terrace dining', '24/7 private concierge'],
    actionLabel: 'Reserve Dining',
  },
  {
    number: '04',
    category: 'Garden & Greenery',
    title: 'Terraced Gardens & Walkways',
    description: 'Curved stone staircases and lush terraced lawns connecting each cottage.',
    image: RESORT_DATA.userImages.heroHillsideRetreat,
    imageAlt: 'Hillside terracotta cottages connected by curved garden walls and stepped stone walkways',
    highlights: ['320-hectare mountain estate', 'Stepped garden cascades'],
    actionLabel: 'Discover Grounds',
  },
  {
    number: '05',
    category: 'Outdoor Activities',
    title: 'Tea Valley Trails & Treks',
    description: 'Morning walks along winding emerald tea trails and scenic ridge paths.',
    image: RESORT_DATA.userImages.teaValleyTrail,
    imageAlt: 'Sunlit mountain trail winding through terraced emerald tea hills',
    highlights: ['Guided tea-estate walks', 'Valley & lake treks'],
    actionLabel: 'Plan Expedition',
  },
  {
    number: '06',
    category: 'Campfire Area',
    title: 'Ridge Firepit & Recreation',
    description: 'Sunken stone firepit courtyard and outdoor court overlooking the valley.',
    image: RESORT_DATA.userImages.mountainRidgeGrounds,
    imageAlt: 'Mountain ridge resort grounds with stone firepit seating courtyard and outdoor court',
    highlights: ['Stone firepit seating', 'Outdoor ridge court'],
    actionLabel: 'Arrange Evening',
  },
  {
    number: '07',
    category: 'Tea Estate Retreat',
    title: 'Misty Tea Pavilion',
    description: 'High-altitude tasting veranda surrounded by terraced tea hills in morning mist.',
    image: RESORT_DATA.userImages.mistyChalet,
    imageAlt: 'Hillside tea plantation cottage surrounded by misty terraced tea fields',
    highlights: ['Estate tea tastings', 'Sunrise mist views'],
    actionLabel: 'Reserve Retreat',
  },
  {
    number: '08',
    category: 'Forest Chalets',
    title: 'Stone Cottages & Lawns',
    description: 'Handcrafted stone chalets framed by sculpted hedges and quiet pine trails.',
    image: RESORT_DATA.userImages.stoneCottage,
    imageAlt: 'Stone resort cottage with red roof, trimmed hedges, and outdoor garden seating',
    highlights: ['Private garden porches', 'Pine ridge trail access'],
    actionLabel: 'Explore Chalet',
  },
];

const FACILITY_PAGES = [
  { label: '01 · Villas & Bungalows' },
  { label: '02 · Dining & Gardens' },
  { label: '03 · Trails & Campfire' },
  { label: '04 · Chalets & Mist' },
];

const ITEMS_PER_PAGE = 2;

interface FacilityRowProps {
  facility: FacilityItem;
  index: number;
  parallaxY: MotionValue<string>;
  onOpenBooking: () => void;
}

const FacilityShowcaseRow: React.FC<FacilityRowProps> = ({
  facility,
  index,
  parallaxY,
  onOpenBooking,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isImageLeft = index % 2 === 0;

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
      {/* Large Parallax Image Frame (Vertical on mobile, alternating left/right on tablet & desktop) */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, x: isImageLeft ? -28 : 28, scale: 0.97 }
        }
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.6,
          delay: shouldReduceMotion ? 0 : index * 0.1,
          ease: LUXURY_EASE,
        }}
        className={`md:col-span-6 ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-900 shadow-md dark:shadow-none group">
          <motion.div
            style={shouldReduceMotion ? undefined : { y: parallaxY }}
            className="relative w-full h-[106%] -top-[3%]"
          >
            <img
              src={facility.image}
              alt={facility.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center contrast-[1.03] saturate-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-stone-950/75 backdrop-blur-md border border-white/15 text-[10px] tracking-[0.22em] uppercase text-amber-200 font-mono">
            {facility.number} · {facility.category}
          </div>
        </div>
      </motion.div>

      {/* Editorial Facility Copy */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, x: isImageLeft ? 24 : -24, y: 10 }
        }
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.6,
          delay: shouldReduceMotion ? 0 : 0.08 + index * 0.1,
          ease: LUXURY_EASE,
        }}
        className={`md:col-span-6 space-y-3.5 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}
      >
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-1">
            {facility.category}
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-luxury text-stone-900 dark:text-stone-100 font-normal tracking-tight leading-snug">
            {facility.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          {facility.description}
        </p>

        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 pt-2.5 border-t border-stone-200 dark:border-stone-800/80">
          {facility.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300"
            >
              <Check className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300 shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="pt-1">
          <button
            onClick={onOpenBooking}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase font-medium text-amber-800 dark:text-amber-200 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer group/btn"
          >
            <span>{facility.actionLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </motion.div>
    </article>
  );
};

export const Facilities: React.FC<FacilitiesProps> = ({ onOpenBooking }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();

  const totalPages = Math.ceil(FACILITIES_LIST.length / ITEMS_PER_PAGE);
  const visibleFacilities = FACILITIES_LIST.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

  const handleChangePage = (nextPage: number, scrollTop = false) => {
    setCurrentPage(nextPage);
    if (scrollTop && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="py-14 md:py-20 scroll-mt-16 bg-[#FAF8F5] dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800/80 transition-colors overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
        {/* Compact Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0 }
              : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16 }
          }
          transition={{
            duration: shouldReduceMotion ? 0.25 : 0.65,
            delay: isVisible && !shouldReduceMotion ? 0.06 : 0,
            ease: LUXURY_EASE,
          }}
          className="text-center max-w-2xl mx-auto mb-7 md:mb-9"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-1.5">
            Resort Facilities
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury text-stone-900 dark:text-stone-100 font-normal tracking-tight">
            Curated For Serenity
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Hillside villas, stone gardens, tea trails, and ridge firepits.
          </p>
        </motion.div>

        {/* Page Selector Pills (2 Facilities per Page) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {FACILITY_PAGES.map((tab, idx) => {
            const isActive = currentPage === idx;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => handleChangePage(idx)}
                className={`relative px-3.5 py-2 text-[11px] tracking-wider uppercase border transition-colors cursor-pointer ${
                  isActive
                    ? 'border-amber-800 dark:border-amber-400 text-amber-950 dark:text-amber-100 font-medium'
                    : 'border-stone-300 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-700 bg-white/60 dark:bg-stone-900/50'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="facilities-page-pill"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className="absolute inset-0 bg-amber-100/90 dark:bg-amber-400/15"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Two Alternating Facilities per Page */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.35, ease: LUXURY_EASE }}
            className="space-y-8 md:space-y-12"
          >
            {visibleFacilities.map((facility, idx) => (
              <FacilityShowcaseRow
                key={facility.number}
                facility={facility}
                index={idx}
                parallaxY={parallaxY}
                onOpenBooking={onOpenBooking}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Prev / Next Pagination Bar */}
        <div className="mt-8 md:mt-10 pt-5 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() =>
              handleChangePage((currentPage - 1 + totalPages) % totalPages, true)
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-stone-300 dark:border-stone-700 hover:border-stone-500 dark:hover:border-stone-500 text-xs tracking-wider uppercase text-stone-700 dark:text-stone-300 transition-colors cursor-pointer bg-white dark:bg-stone-900"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="text-[11px] font-mono tracking-widest uppercase text-stone-500 dark:text-stone-400">
            Page 0{currentPage + 1} / 0{totalPages}
          </div>

          <button
            type="button"
            onClick={() => handleChangePage((currentPage + 1) % totalPages, true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-stone-300 dark:border-stone-700 hover:border-stone-500 dark:hover:border-stone-500 text-xs tracking-wider uppercase text-stone-700 dark:text-stone-300 transition-colors cursor-pointer bg-white dark:bg-stone-900"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact Book Your Stay CTA */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0.25 : 0.65, ease: LUXURY_EASE }}
          className="mt-8 md:mt-10 bg-[#F5F2EB] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-6 py-7 md:px-10 md:py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left shadow-sm dark:shadow-none"
        >
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-1">
              Your Highland Sanctuary Awaits
            </p>
            <h3 className="text-xl sm:text-2xl font-serif-luxury text-stone-900 dark:text-stone-100 font-normal tracking-tight">
              Experience Every Moment Above The Clouds
            </h3>
          </div>

          <motion.button
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={onOpenBooking}
            type="button"
            className="px-7 py-3 bg-amber-100 hover:bg-amber-200 text-stone-950 text-xs tracking-[0.2em] uppercase font-medium transition-colors inline-flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer group shrink-0"
          >
            <span>Book Your Stay</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
