import React, { useState } from 'react';
import { Compass, Phone, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { RESORT_DATA } from '../data/resortData';
import { useScrollSectionVisible } from './ScrollSection';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
}

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  const columnMotion = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: isVisible
      ? { opacity: 1, y: 0 }
      : shouldReduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 18 },
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.6,
      delay: isVisible && !shouldReduceMotion ? delay : 0,
      ease: LUXURY_EASE,
    },
  });

  return (
    <footer className="bg-stone-900 dark:bg-stone-950 border-t border-stone-800 text-stone-400 text-xs font-light transition-colors">
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Coordinates */}
          <motion.div {...columnMotion(0.06)} className="md:col-span-5 space-y-3">
            <h3 className="text-xl md:text-2xl font-serif-luxury tracking-[0.25em] text-stone-100 uppercase">
              Aura
            </h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              An intimate mountain retreat crafted for stillness and panoramic valley calm.
            </p>
            <div className="pt-1 flex flex-col gap-1.5 text-[11px] font-mono text-stone-400">
              <span className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-amber-300/80" />
                <span>{RESORT_DATA.coordinates} · {RESORT_DATA.elevation}</span>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-300/80" />
                <span>Concierge: +39 0463 90 8820 (24/7)</span>
              </span>
            </div>
          </motion.div>

          {/* Direct Navigation Links */}
          <motion.div {...columnMotion(0.14)} className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-stone-200 font-medium">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button type="button" onClick={() => onNavigateSection?.('home')} className="hover:text-amber-200 transition-colors cursor-pointer text-left">Home</button></li>
              <li><button type="button" onClick={() => onNavigateSection?.('about')} className="hover:text-amber-200 transition-colors cursor-pointer text-left">About Us</button></li>
              <li><button type="button" onClick={() => onNavigateSection?.('facilities')} className="hover:text-amber-200 transition-colors cursor-pointer text-left">Facilities</button></li>
              <li><button type="button" onClick={() => onNavigateSection?.('gallery')} className="hover:text-amber-200 transition-colors cursor-pointer text-left">Gallery</button></li>
              <li><button type="button" onClick={() => onNavigateSection?.('contact')} className="hover:text-amber-200 transition-colors cursor-pointer text-left">Contact</button></li>
            </ul>
          </motion.div>

          {/* Private Seasonal Allocations Subscription */}
          <motion.div {...columnMotion(0.22)} className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-stone-200 font-medium">
              Seasonal Updates
            </h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Join our private guest register for seasonal availability.
            </p>

            {subscribed ? (
              <div className="p-3 bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Registered for seasonal updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-900 border border-stone-800 text-stone-200 text-xs py-2.5 px-3 focus:outline-none focus:border-amber-300 flex-1 rounded-none"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 bg-amber-100 hover:bg-amber-200 text-stone-950 text-xs tracking-wider uppercase font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom Hairline & Legal */}
        <motion.div
          {...columnMotion(0.3)}
          className="mt-10 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400"
        >
          <p>© {new Date().getFullYear()} Aura S.r.l. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Architecture</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
