import React, { useState } from 'react';
import { ArrowUpRight, Sun, Sparkles } from 'lucide-react';
import { RESORT_DATA } from '../data/resortData';

interface HeroProps {
  onExploreVillas: () => void;
  onOpenBooking?: () => void;
  onNavigateAbout?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreVillas, onOpenBooking, onNavigateAbout }) => {
  // Radiant perspectives from user photographs
  const heroPerspectives = [
    {
      id: 'valley-trail',
      label: 'Sunlit Tea Valley Trail',
      image: RESORT_DATA.userImages.teaValleyTrail,
      caption: 'Sun-drenched morning trails through emerald tea hills',
    },
    {
      id: 'horizon-villa',
      label: 'Cantilevered Horizon Villa',
      image: RESORT_DATA.userImages.horizonVilla,
      caption: 'Glass pavilion glowing above golden terraced valleys',
    },
    {
      id: 'emerald-lake',
      label: 'Emerald Lake & Terraces',
      image: RESORT_DATA.userImages.emeraldLake,
      caption: 'Clear azure skies and crystalline alpine waters',
    },
  ];

  const [activePerspectiveIndex, setActivePerspectiveIndex] = useState(0);
  const currentHero = heroPerspectives[activePerspectiveIndex];

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-stone-100 dark:bg-stone-900 pt-24 pb-16 transition-colors">
      {/* Real High-Resolution Photographic Background - Sunlit, Vivid & Bright */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroPerspectives.map((perspective, idx) => (
          <img
            key={perspective.id}
            src={perspective.image}
            alt={perspective.caption}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              idx === activePerspectiveIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } brightness-105 contrast-100`}
          />
        ))}

        {/* Minimal soft gradient overlay keeping the photography sunny and bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-stone-950/20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Main Headline & Centered Actions */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 w-full text-center py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/25 text-amber-200 text-xs tracking-[0.25em] uppercase font-sans font-medium mb-5 shadow-sm">
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span>Highland Valley & Mountain Retreat</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-light text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)] text-balance">
            A Haven Above The Clouds.
          </h1>

          <p className="mt-5 text-base md:text-xl text-stone-100 font-light leading-relaxed font-sans max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Sunlit cantilevered villas, misty tea hills, and thermal mountain springs crafted in pure harmony with nature.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              type="button"
              className="px-7 py-3.5 bg-amber-100 hover:bg-amber-200 text-stone-950 text-xs tracking-[0.2em] uppercase font-medium transition-all inline-flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 cursor-pointer"
            >
              Reserve Stay
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreVillas}
              type="button"
              className="px-7 py-3.5 border border-white/80 hover:border-white text-white hover:bg-white/20 text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-md bg-black/25 shadow-lg cursor-pointer"
            >
              Explore Services
            </button>
            <button
              onClick={onNavigateAbout}
              type="button"
              className="px-7 py-3.5 border border-white/60 hover:border-white text-white hover:bg-white/20 text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-md bg-black/25 shadow-lg cursor-pointer"
            >
              About Aura
            </button>
          </div>

          {/* Perspective Selector for User Photos */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 pt-4">
            <span className="text-[10px] tracking-widest uppercase text-stone-200/90 font-mono flex items-center gap-1.5 mr-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Views:
            </span>
            {heroPerspectives.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActivePerspectiveIndex(idx)}
                type="button"
                className={`px-3 py-1.5 text-[11px] tracking-wider transition-all backdrop-blur-md border cursor-pointer ${
                  activePerspectiveIndex === idx
                    ? 'bg-white/90 text-stone-950 font-medium border-white shadow-md'
                    : 'bg-black/30 hover:bg-black/50 text-stone-200 border-white/20 hover:border-white/50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
