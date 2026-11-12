import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, ChevronLeft, ChevronRight, MapPin, Maximize, Pause, Play, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { GalleryPhoto, RESORT_DATA } from '../data/resortData';
import { useScrollSectionVisible } from './ScrollSection';

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

interface MarqueeRowProps {
  photos: GalleryPhoto[];
  direction: 'left' | 'right';
  isPlaying: boolean;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

const GalleryMarqueeRow: React.FC<MarqueeRowProps> = ({
  photos,
  direction,
  isPlaying,
  onSelectPhoto,
}) => {
  const repeatedPhotos = [...photos, ...photos];
  const marqueeClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="relative w-full overflow-hidden group">
      <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-12 md:w-28 bg-gradient-to-r from-[#F5F2EB] dark:from-stone-900/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-12 md:w-28 bg-gradient-to-l from-[#F5F2EB] dark:from-stone-900/90 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex gap-3 sm:gap-5 md:gap-6 w-max ${marqueeClass} ${
          !isPlaying ? 'pause-animation' : ''
        } group-hover:![animation-play-state:paused]`}
      >
        {repeatedPhotos.map((photo, idx) => (
          <div
            key={`${photo.id}-${idx}`}
            onClick={() => onSelectPhoto(photo)}
            className="relative w-[195px] sm:w-[245px] md:w-[285px] lg:w-[320px] aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 cursor-pointer group/card shadow-md hover:shadow-xl dark:shadow-none transition-[transform,box-shadow] duration-500 hover:-translate-y-1 shrink-0"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${photo.imagePosition ?? 'object-center'} contrast-[1.03] saturate-[1.04] transition-transform duration-700 group-hover/card:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent opacity-70 group-hover/card:opacity-85 transition-opacity" />

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
    </div>
  );
};

export const MovingGallery: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const photos = RESORT_DATA.gallery;
  const splitIndex = Math.ceil(photos.length / 2);
  const rowOnePhotos = photos.slice(0, splitIndex);
  const rowTwoPhotos = photos.slice(splitIndex);

  const lightboxPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  const stepLightbox = useCallback(
    (direction: 'prev' | 'next') => {
      setLightboxIndex((current) => {
        if (current === null) return null;
        const delta = direction === 'next' ? 1 : -1;
        return (current + delta + photos.length) % photos.length;
      });
    },
    [photos.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        stepLightbox('next');
      } else if (e.key === 'ArrowLeft') {
        stepLightbox('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, stepLightbox]);

  const handleOpenPhoto = useCallback(
    (photo: GalleryPhoto) => {
      const idx = photos.findIndex((item) => item.id === photo.id);
      setLightboxIndex(idx >= 0 ? idx : 0);
    },
    [photos]
  );

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 40) {
      stepLightbox(deltaX < 0 ? 'next' : 'prev');
    }
  };

  return (
    <section
      id="gallery"
      className="py-12 sm:py-14 md:py-20 bg-[#F5F2EB] dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800/80 relative overflow-hidden transition-colors"
    >
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
            Estate grounds, rooms, suites, and mountain vistas.
          </p>
        </motion.div>

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
          onClick={() => setIsPlaying((prev) => !prev)}
          type="button"
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-2 hover:border-stone-400 transition-colors self-start sm:self-auto cursor-pointer shadow-sm"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          ) : (
            <Play className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          )}
          <span>{isPlaying ? 'Pause Motion' : 'Resume Motion'}</span>
        </motion.button>
      </div>

      {/* Dual Smooth Moving Photographic Reels */}
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
        className="space-y-3 sm:space-y-5"
      >
        <GalleryMarqueeRow
          photos={rowOnePhotos}
          direction="left"
          isPlaying={isPlaying}
          onSelectPhoto={handleOpenPhoto}
        />
        <GalleryMarqueeRow
          photos={rowTwoPhotos}
          direction="right"
          isPlaying={isPlaying}
          onSelectPhoto={handleOpenPhoto}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: isVisible ? 0.28 : 0 }}
        className="text-center text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mt-4 sm:mt-6 px-4 tracking-wider uppercase font-sans"
      >
        Hover to pause · Click any photo to expand
      </motion.p>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxPhoto && lightboxIndex !== null && (
              <motion.div
                key="gallery-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.15 : 0.28 }}
                onClick={() => setLightboxIndex(null)}
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
                    <span className="font-serif-luxury text-base text-stone-100 block">
                      {lightboxPhoto.title}
                    </span>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[11px] text-amber-300 uppercase tracking-widest">
                        {lightboxPhoto.category}
                      </span>
                      <span className="text-[11px] text-stone-400 tabular-nums">
                        {lightboxIndex + 1} / {photos.length}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    type="button"
                    className="p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </motion.div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="relative my-auto max-h-[75vh] flex items-center justify-center overflow-hidden py-2"
                >
                  <button
                    type="button"
                    onClick={() => stepLightbox('prev')}
                    aria-label="Previous gallery photo"
                    className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-900/80 border border-stone-700 text-stone-200 hover:text-white hover:border-amber-300 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={lightboxPhoto.id}
                      src={lightboxPhoto.imageUrl}
                      alt={lightboxPhoto.title}
                      referrerPolicy="no-referrer"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                      transition={{ duration: shouldReduceMotion ? 0.15 : 0.24, ease: LUXURY_EASE }}
                      className="max-h-[72vh] max-w-full object-contain border border-stone-800 shadow-2xl rounded-sm"
                    />
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => stepLightbox('next')}
                    aria-label="Next gallery photo"
                    className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-900/80 border border-stone-700 text-stone-200 hover:text-white hover:border-amber-300 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

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
                    <span className="font-mono text-stone-300 text-[11px]">
                      {lightboxPhoto.cameraExif}
                    </span>
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
