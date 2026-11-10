import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RESORT_DATA } from '../data/resortData';

interface ServicesProps {
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const servicesList = [
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
    <section id="services" className="py-16 md:py-28 bg-[#FAF8F5] dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-2">
          <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-2">
            Resort Services
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury text-stone-900 dark:text-stone-100 font-light tracking-tight">
            Curated For Serenity
          </h2>
          <p className="mt-2 sm:mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Every element of your stay is thoughtfully crafted, from sunlit glass pavilions to private lake and valley expeditions.
          </p>
        </div>

        {/* Side-by-side 2 cards on both mobile and desktop (grid-cols-2) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
          {servicesList.map((service, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden group shadow-sm dark:shadow-none flex flex-col justify-between"
            >
              {/* Real Photography with subtle zoom */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden relative bg-stone-200 dark:bg-stone-800">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-stone-950/75 backdrop-blur-sm px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] text-stone-200 uppercase tracking-wider sm:tracking-widest border border-white/10 line-clamp-1">
                  {service.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-5 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xs sm:text-lg md:text-xl font-serif-luxury text-stone-900 dark:text-stone-100 mb-1 sm:mb-2 line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                    {service.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 border-t border-stone-100 dark:border-stone-800/80">
                  <button
                    onClick={onOpenBooking}
                    type="button"
                    className="text-[10px] sm:text-xs tracking-wider uppercase font-medium text-amber-800 dark:text-amber-200 hover:text-stone-950 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="truncate">{service.action}</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
