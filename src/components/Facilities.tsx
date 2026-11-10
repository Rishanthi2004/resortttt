import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { RESORT_DATA } from '../data/resortData';
import { useScrollSectionVisible } from './ScrollSection';

interface FacilitiesProps {
  onOpenBooking: () => void;
}

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const Facilities: React.FC<FacilitiesProps> = ({ onOpenBooking }) => {
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();

  const facilitiesList = [
    {
      title: "Cantilevered Horizon Residences",
      category: "Accommodation",
      description: "Glass pavilions cantilevered over sun-drenched terraced valleys with heated mineral pools and expansive sunrise vistas.",
      image: RESORT_DATA.userImages.horizonVilla,
      action: "Reserve Residence"
    },
    {
      title: "Forest Stone Cottages & Chalets",
      category: "Secluded Living",
      description: "Handcrafted stone cottages with manicured private lawns, fireside lounges, and direct access to mountain pine trails.",
      image: RESORT_DATA.userImages.stoneCottage,
      action: "Explore Chalet"
    },
    {
      title: "Emerald Lake & Valley Expeditions",
      category: "Experiences",
      description: "Guided morning treks, glacial lake expeditions, and private panoramic photography walks through terraced tea estates.",
      image: RESORT_DATA.userImages.emeraldLake,
      action: "Book Journey"
    },
    {
      title: "Misty Tea Plantation Dining",
      category: "Gastronomy & Retreats",
      description: "Hillside tasting pavilions serving organic harvest gastronomy, rare highland teas, and fireside twilight dinners.",
      image: RESORT_DATA.userImages.mistyChalet,
      action: "Reserve Table"
    }
  ];

  return (
    <section id="facilities" className="py-16 md:py-28 bg-[#FAF8F5] dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0 }
              : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 20 }
          }
          transition={{
            duration: shouldReduceMotion ? 0.25 : 0.65,
            delay: isVisible && !shouldReduceMotion ? 0.06 : 0,
            ease: LUXURY_EASE,
          }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-2"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-2">
            Resort Facilities
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury text-stone-900 dark:text-stone-100 font-light tracking-tight">
            Curated For Serenity
          </h2>
          <p className="mt-2 sm:mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Every element of your stay is thoughtfully crafted, from sunlit glass pavilions to private lake and valley expeditions.
          </p>
        </motion.div>

        {/* Side-by-side 2 cards on both mobile and desktop (grid-cols-2) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
          {facilitiesList.map((facility, idx) => (
            <motion.div
              key={facility.title}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 38, scale: 0.94 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0, scale: 1 }
                  : shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 30, scale: 0.94 }
              }
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -6, transition: { type: 'spring', stiffness: 320, damping: 24, delay: 0 } }
              }
              transition={{
                opacity: { duration: 0.45, delay: isVisible && !shouldReduceMotion ? 0.1 + idx * 0.09 : 0 },
                y: { type: 'spring', stiffness: 220, damping: 22, delay: isVisible && !shouldReduceMotion ? 0.1 + idx * 0.09 : 0 },
                scale: { type: 'spring', stiffness: 230, damping: 21, delay: isVisible && !shouldReduceMotion ? 0.1 + idx * 0.09 : 0 },
              }}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-700/40 dark:hover:border-amber-400/30 overflow-hidden group shadow-sm hover:shadow-xl dark:shadow-none transition-[border-color,box-shadow] duration-300 flex flex-col justify-between"
            >
              {/* Real Photography with subtle zoom */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden relative bg-stone-200 dark:bg-stone-800">
                <img
                  src={facility.image}
                  alt={facility.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-stone-950/75 backdrop-blur-sm px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] text-stone-200 uppercase tracking-wider sm:tracking-widest border border-white/10 line-clamp-1">
                  {facility.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-5 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xs sm:text-lg md:text-xl font-serif-luxury text-stone-900 dark:text-stone-100 mb-1 sm:mb-2 line-clamp-2">
                    {facility.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 border-t border-stone-100 dark:border-stone-800/80">
                  <button
                    onClick={onOpenBooking}
                    type="button"
                    className="text-[10px] sm:text-xs tracking-wider uppercase font-medium text-amber-800 dark:text-amber-200 hover:text-stone-950 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="truncate">{facility.action}</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
