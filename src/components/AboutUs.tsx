import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { RESORT_DATA } from '../data/resortData';
import { useScrollSectionVisible } from './ScrollSection';

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const AboutUs: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<'estate' | 'cottage'>('estate');
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();

  const photos = {
    estate: {
      url: RESORT_DATA.userImages.colonialManorEstate,
      title: "Estate Manor & Gardens",
      caption: "Manicured garden lawns and outdoor terrace nestled beneath misty forest slopes"
    },
    cottage: {
      url: RESORT_DATA.userImages.stoneCottage,
      title: "Forest Stone Chalet",
      caption: "Crafted stone architecture and manicured grounds nestled beneath pine-covered slopes"
    }
  };

  const activePhoto = photos[selectedImage];

  const metrics = [
    { value: "320 Ha", label: "Highland Estate" },
    { value: "18", label: "Private Villas" },
    { value: "38.5°C", label: "Thermal Waters" },
  ];

  return (
    <section id="about" className="py-14 md:py-20 bg-[#F5F2EB] dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800/80 transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Real Photographic Showcase with Editorial Left Glide & Crossfade Switcher */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40, scale: 0.96 }}
            animate={
              isVisible
                ? { opacity: 1, x: 0, scale: 1 }
                : shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: -32, scale: 0.96 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.25 : 0.75,
              delay: isVisible && !shouldReduceMotion ? 0.08 : 0,
              ease: LUXURY_EASE,
            }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="overflow-hidden border border-stone-300 dark:border-stone-700 aspect-[4/3] shadow-md dark:shadow-none bg-stone-200 dark:bg-stone-800 relative group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: LUXURY_EASE }}
                  className="absolute inset-0"
                >
                  <img
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover contrast-[1.03] saturate-[1.04] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/75 via-stone-950/25 to-transparent p-4 text-white">
                    <p className="text-xs font-serif-luxury tracking-wide">{activePhoto.title}</p>
                    <p className="text-[11px] text-stone-300 font-light mt-0.5 line-clamp-1">{activePhoto.caption}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick switcher buttons */}
            <div className="flex gap-2">
              {(
                [
                  { key: 'estate', label: 'Valley Estate Villa' },
                  { key: 'cottage', label: 'Forest Stone Chalet' },
                ] as const
              ).map(({ key, label }) => {
                const isSelected = selectedImage === key;
                return (
                  <motion.button
                    key={key}
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    onClick={() => setSelectedImage(key)}
                    className={`relative text-xs px-3 py-1.5 border transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-amber-800 dark:border-amber-400 text-amber-900 dark:text-amber-200 font-medium'
                        : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="about-photo-pill"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className="absolute inset-0 bg-amber-900/10 dark:bg-amber-400/10 -z-0"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Simple, Minimalist Narrative with Staggered Editorial Reveal */}
          <div className="lg:col-span-6 space-y-5">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
              animate={
                isVisible
                  ? { opacity: 1, x: 0 }
                  : shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: 24 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.25 : 0.7,
                delay: isVisible && !shouldReduceMotion ? 0.14 : 0,
                ease: LUXURY_EASE,
              }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-2">
                About Aura
              </p>
              <h2 className="text-3xl md:text-4xl font-serif-luxury text-stone-900 dark:text-stone-100 font-normal tracking-tight">
                Where Nature Remains Untouched
              </h2>
            </motion.div>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
              animate={
                isVisible
                  ? { opacity: 1, x: 0 }
                  : shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: 20 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.25 : 0.7,
                delay: isVisible && !shouldReduceMotion ? 0.22 : 0,
                ease: LUXURY_EASE,
              }}
              className="text-sm md:text-base text-stone-700 dark:text-stone-300 font-light leading-relaxed"
            >
              Nestled among misty tea hills, Aura pairs stone-and-timber architecture with clean mountain air and tranquil valley views.
            </motion.p>

            {/* 3 Simple Minimalist Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-stone-200 dark:border-stone-800">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.94 }}
                  animate={
                    isVisible
                      ? { opacity: 1, y: 0, scale: 1 }
                      : shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 14, scale: 0.94 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.55,
                    delay: isVisible && !shouldReduceMotion ? 0.34 + idx * 0.08 : 0,
                    ease: LUXURY_EASE,
                  }}
                >
                  <span className="block text-2xl font-serif-luxury text-stone-900 dark:text-stone-100">
                    {metric.value}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
