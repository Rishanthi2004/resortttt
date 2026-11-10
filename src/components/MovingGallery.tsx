import React, { useState } from 'react';
import { Camera, MapPin, Maximize, X, Play, Pause } from 'lucide-react';
import { RESORT_DATA, GalleryPhoto } from '../data/resortData';

export const MovingGallery: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  // Real resort photographs duplicated for infinite, smooth seamless looping
  const photos = RESORT_DATA.gallery;
  const marqueePhotos = [...photos, ...photos];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#F5F2EB] dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800/80 relative overflow-hidden transition-colors">
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-2">
            Visual Expedition
          </p>
          <h2 className="text-3xl md:text-4xl font-serif-luxury text-stone-900 dark:text-stone-100 font-light tracking-tight">
            Moving Gallery
          </h2>
          <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 font-light">
            Real photography from the resort estate, tea terraces, and mountain valleys.
          </p>
        </div>

        {/* Play / Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          type="button"
          className="px-4 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs tracking-wider uppercase flex items-center gap-2 hover:border-stone-400 transition-colors self-start sm:self-auto cursor-pointer shadow-sm"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" /> : <Play className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />}
          <span>{isPlaying ? 'Pause Motion' : 'Resume Motion'}</span>
        </button>
      </div>

      {/* Smooth Continuous Moving Photographic Reel */}
      <div className="relative w-full overflow-hidden group">
        {/* Soft edge fade scrims */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-28 bg-gradient-to-r from-[#F5F2EB] dark:from-stone-900/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-28 bg-gradient-to-l from-[#F5F2EB] dark:from-stone-900/90 to-transparent z-10 pointer-events-none" />

        <div
          className={`flex gap-6 w-max animate-marquee-left ${
            !isPlaying ? 'pause-animation' : ''
          } group-hover:pause-animation`}
        >
          {marqueePhotos.map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              onClick={() => setLightboxPhoto(photo)}
              className="relative w-[280px] sm:w-[340px] md:w-[400px] aspect-[4/5] overflow-hidden bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 cursor-pointer group/card shadow-md dark:shadow-none shrink-0"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-75 group-hover/card:opacity-90 transition-opacity" />

              <div className="absolute top-3 right-3 p-2 bg-stone-950/70 border border-white/10 text-stone-200 opacity-0 group-hover/card:opacity-100 transition-opacity backdrop-blur-sm">
                <Maximize className="w-3.5 h-3.5 text-amber-200" />
              </div>

              <div className="absolute bottom-3 left-4 right-4 z-10">
                <span className="inline-block text-[9px] uppercase tracking-widest text-amber-300 bg-stone-950/70 px-2 py-0.5 mb-1.5 backdrop-blur-sm">
                  {photo.category}
                </span>
                <h3 className="text-sm font-serif-luxury text-stone-100 line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-[10px] text-stone-300 font-mono tracking-wider truncate mt-0.5">
                  {photo.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[11px] text-stone-500 dark:text-stone-400 mt-6 tracking-wider uppercase font-sans">
        Real Photography · Hover to Pause · Click any image to view in full resolution
      </p>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-stone-300 pb-4 border-b border-stone-800">
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
          </div>

          <div className="relative my-auto max-h-[75vh] flex items-center justify-center overflow-hidden py-2">
            <img
              src={lightboxPhoto.imageUrl}
              alt={lightboxPhoto.title}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] max-w-full object-contain border border-stone-800 shadow-2xl rounded-sm"
            />
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="font-mono text-stone-300 text-[11px]">{lightboxPhoto.cameraExif}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{lightboxPhoto.location}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
