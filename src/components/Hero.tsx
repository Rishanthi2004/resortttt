import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { RESORT_DATA } from '../data/resortData';
import { useScrollSectionVisible } from './ScrollSection';

interface HeroProps {
  onExploreVillas: () => void;
  onOpenBooking?: () => void;
  onNavigateAbout?: () => void;
}

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC<HeroProps> = ({ onExploreVillas, onOpenBooking, onNavigateAbout }) => {
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number, yOffset = 22) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: yOffset },
    animate: isVisible
      ? { opacity: 1, y: 0 }
      : shouldReduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: yOffset },
    transition: {
      duration: shouldReduceMotion ? 0.25 : 0.75,
      delay: isVisible && !shouldReduceMotion ? delay : 0,
      ease: LUXURY_EASE,
    },
  });

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-stone-100 dark:bg-stone-900 pt-24 pb-16 transition-colors"
    >
      {/* Real High-Resolution Photographic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={RESORT_DATA.userImages.heroPoolPavilion}
          alt="Brick-and-terracotta resort pavilion overlooking a turquoise swimming pool, lily pond, and lush garden walkway"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center contrast-[1.04] saturate-[1.05]"
        />

        {/* Light edge-only vignette preserving photo clarity and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-stone-950/15 to-stone-950/30 pointer-events-none" />
      </div>

      {/* Main Headline & Centered Actions */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 w-full text-center py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={
              isVisible
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 20, filter: 'blur(4px)' }
            }
            transition={{
              duration: shouldReduceMotion ? 0.25 : 0.9,
              delay: isVisible && !shouldReduceMotion ? 0.16 : 0,
              ease: LUXURY_EASE,
            }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-medium text-white leading-[1.12] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)] text-balance"
          >
            A Haven Above The Clouds.
          </motion.h1>

          <motion.p
            {...reveal(0.28, 22)}
            className="mt-4 text-base md:text-lg text-stone-100 font-normal leading-relaxed font-sans max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          >
            Hillside cottages, misty tea valleys, and tranquil mountain air.
          </motion.p>

          <motion.div
            {...reveal(0.4, 20)}
            className="mt-7 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              onClick={onOpenBooking}
              type="button"
              className="px-7 py-3.5 bg-amber-100 hover:bg-amber-200 text-stone-950 text-xs tracking-[0.2em] uppercase font-medium transition-colors inline-flex items-center gap-2 shadow-xl hover:shadow-2xl cursor-pointer group"
            >
              Reserve Stay
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
            <motion.button
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              onClick={onExploreVillas}
              type="button"
              className="px-7 py-3.5 border border-white/80 hover:border-white text-white hover:bg-white/20 text-xs tracking-[0.2em] uppercase transition-colors backdrop-blur-md bg-black/25 shadow-lg cursor-pointer"
            >
              Explore Facilities
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Subtle animated scroll indicator */}
      <motion.button
        type="button"
        onClick={onNavigateAbout}
        aria-label="Scroll to About Us"
        {...reveal(0.55, 14)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-stone-200/80 hover:text-amber-200 transition-colors cursor-pointer"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase font-mono">Scroll</span>
        <span className="w-px h-7 bg-white/30 relative overflow-hidden block">
          <motion.span
            animate={shouldReduceMotion ? undefined : { y: ['-100%', '100%'] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-amber-200 to-transparent block"
          />
        </span>
      </motion.button>
    </section>
  );
};
