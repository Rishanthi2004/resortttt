import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Camera, MapPin, Maximize, X, Play, Pause } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { RESORT_DATA, GalleryPhoto } from '../data/resortData';
import { useScrollSectionVisible } from './ScrollSection';

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const MovingGallery: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!lightboxPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto]);

  // Real resort photographs duplicated for infinite, smooth seamless looping
  const photos = RESORT_DATA.gallery;
  const marqueePhotos = [...photos, ...photos];

  return (
    <section id="gallery" className="py-12 sm:py-14 md:py-20 bg-[#F5F2EB] dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800/80 relative overflow-hidden transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
          animate={
            isVisible
              ? { opacity: 1, x: 0 }
              : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -20 }
          }
          transition={{
            duration: shouldReduceMotion ? 0.25 : 0.7,
            delay: isVisible && !shouldReduceMotion ? 0.08 : 0,
            ease: LUXURY_EASE,
          }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-1.5 sm:mb-2">
            Visual Expedition
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury text-stone-900 dark:text-stone-100 font-normal tracking-tight">
            Moving Gallery
          </h2>
          <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-light">
            Estate grounds, tea slopes, and mountain vistas.
          </p>
        </motion.div>

        {/* Play / Pause Toggle */}
        <motion.button
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
          animate={
            isVisible
              ? { opacity: 1, x: 0 }
              : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 20 }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          transition={{
            duration: shouldReduceMotion ? 0.25 : 0.7,
            delay: isVisible && !shouldReduceMotion ? 0.14 : 0,
            ease: LUXURY_EASE,
          }}
          onClick={() => setIsPlaying(!isPlaying)}
          type="button"
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-2 hover:border-stone-400 transition-colors self-start sm:self-auto cursor-pointer shadow-sm"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" /> : <Play className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />}
          <span>{isPlaying ? 'Pause Motion' : 'Resume Motion'}</span>
        </motion.button>
      </div>

      {/* Smooth Continuous Moving Photographic Reel */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        animate={
          isVisible
            ? { opacity: 1, y: 0, scale: 1 }
            : shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 18, scale: 0.98 }
        }
        transition={{
          duration: shouldReduceMotion ? 0.25 : 0.75,
          delay: isVisible && !shouldReduceMotion ? 0.18 : 0,
          ease: LUXURY_EASE,
        }}
        className="relative w-full overflow-hidden group"
      >
        {/* Soft edge fade scrims */}
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-12 md:w-28 bg-gradient-to-r from-[#F5F2EB] dark:from-stone-900/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-12 md:w-28 bg-gradient-to-l from-[#F5F2EB] dark:from-stone-900/90 to-transparent z-10 pointer-events-none" />

        <div
          className={`flex gap-3 sm:gap-5 md:gap-6 w-max animate-marquee-left ${
            !isPlaying ? 'pause-animation' : ''
          } group-hover:pause-animation`}
        >
          {marqueePhotos.map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              onClick={() => setLightboxPhoto(photo)}
              className="relative w-[175px] sm:w-[260px] md:w-[340px] lg:w-[400px] aspect-[4/5] overflow-hidden bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 cursor-pointer group/card shadow-md hover:shadow-xl dark:shadow-none transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 shrink-0"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-75 group-hover/card:opacity-90 transition-opacity" />

              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-stone-950/70 border border-white/10 text-stone-200 opacity-0 group-hover/card:opacity-100 transition-opacity backdrop-blur-sm">
                <Maximize className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-200" />
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-4 sm:right-4 z-10">
                <span className="inline-block text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-300 bg-stone-950/70 px-1.5 sm:px-2 py-0.5 mb-1 sm:mb-1.5 backdrop-blur-sm">
                  {photo.category}
                </span>
                <h3 className="text-xs sm:text-sm font-serif-luxury text-stone-100 line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-[9px] sm:text-[10px] text-stone-300 font-mono tracking-wider truncate mt-0.5">
                  {photo.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: isVisible ? 0.28 : 0 }}
        className="text-center text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mt-4 sm:mt-6 px-4 tracking-wider uppercase font-sans"
      >
        Hover to pause · Click any photo to expand
      </motion.p>

      {/* Animated Lightbox Modal */}
      {createPortal(
        <AnimatePresence>
          {lightboxPhoto && (
            <motion.div
              key={lightboxPhoto.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.28 }}
              onClick={() => setLightboxPhoto(null)}
              className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
            >
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-between text-xs text-stone-300 pb-4 border-b border-stone-800"
              >
                <div>
                  <span className="font-serif-luxury text-base text-stone-100 block">{lightboxPhoto.title}</span>
                  <span className="text-[11px] text-amber-300 uppercase tracking-widest">{lightboxPhoto.category}</span>
                </div>
                <button
                  onClick={() => setLightboxPhoto(null)}
                  type="button"
                  className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
                transition={{ duration: shouldReduceMotion ? 0.15 : 0.38, ease: LUXURY_EASE }}
                onClick={(e) => e.stopPropagation()}
                className="relative my-auto max-h-[75vh] flex items-center justify-center overflow-hidden py-2"
              >
                <img
                  src={lightboxPhoto.imageUrl}
                  alt={lightboxPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[72vh] max-w-full object-contain border border-stone-800 shadow-2xl rounded-sm"
                />
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                onClick={(e) => e.stopPropagation()}
                className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-400"
              >
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="font-mono text-stone-300 text-[11px]">{lightboxPhoto.cameraExif}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{lightboxPhoto.location}</span>
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
