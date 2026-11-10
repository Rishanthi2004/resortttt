import React, { useState } from 'react';
import { RESORT_DATA } from '../data/resortData';

export const AboutUs: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<'estate' | 'cottage'>('estate');

  const photos = {
    estate: {
      url: RESORT_DATA.userImages.valleyResidence,
      title: "Valley Estate Residence",
      caption: "Natural stone pathways winding through lush gardens amidst morning valley clouds"
    },
    cottage: {
      url: RESORT_DATA.userImages.stoneCottage,
      title: "Forest Stone Chalet",
      caption: "Crafted stone architecture and manicured grounds nestled beneath pine-covered slopes"
    }
  };

  const activePhoto = photos[selectedImage];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F5F2EB] dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Real Photographic Showcase with Dual Perspective Selector */}
          <div className="lg:col-span-6 space-y-4">
            <div className="overflow-hidden border border-stone-300 dark:border-stone-700 aspect-[4/3] shadow-md dark:shadow-none bg-stone-200 dark:bg-stone-800 relative group">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent p-4 text-white">
                <p className="text-xs font-serif-luxury tracking-wide">{activePhoto.title}</p>
                <p className="text-[11px] text-stone-300 font-light mt-0.5 line-clamp-1">{activePhoto.caption}</p>
              </div>
            </div>

            {/* Quick switcher buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedImage('estate')}
                className={`text-xs px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedImage === 'estate'
                    ? 'bg-amber-900/10 dark:bg-amber-400/10 border-amber-800 dark:border-amber-400 text-amber-900 dark:text-amber-200 font-medium'
                    : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                }`}
              >
                Valley Estate Villa
              </button>
              <button
                type="button"
                onClick={() => setSelectedImage('cottage')}
                className={`text-xs px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedImage === 'cottage'
                    ? 'bg-amber-900/10 dark:bg-amber-400/10 border-amber-800 dark:border-amber-400 text-amber-900 dark:text-amber-200 font-medium'
                    : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                }`}
              >
                Forest Stone Chalet
              </button>
            </div>
          </div>

          {/* Simple, Minimalist Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-2">
                About Aura
              </p>
              <h2 className="text-3xl md:text-4xl font-serif-luxury text-stone-900 dark:text-stone-100 font-light tracking-tight">
                Where Nature Remains Untouched
              </h2>
            </div>

            <p className="text-sm md:text-base text-stone-700 dark:text-stone-300 font-light leading-relaxed">
              Immersed in mountain greenery and misty highland tea valleys, Aura is an intimate sanctuary designed in quiet harmony with the natural topography.
            </p>

            <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              Every residence is crafted with regional stone and aged timber, positioned to honor natural daylight, morning cloud rivers, and clean mountain air.
            </p>

            {/* 3 Simple Minimalist Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 dark:border-stone-800">
              <div>
                <span className="block text-2xl font-serif-luxury text-stone-900 dark:text-stone-100">320 Ha</span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">Highland Estate</span>
              </div>
              <div>
                <span className="block text-2xl font-serif-luxury text-stone-900 dark:text-stone-100">18</span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">Private Villas</span>
              </div>
              <div>
                <span className="block text-2xl font-serif-luxury text-stone-900 dark:text-stone-100">38.5°C</span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">Thermal Waters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
