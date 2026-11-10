import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection: string;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  activeSection,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-stone-950/85 backdrop-blur-md border-b border-stone-200 dark:border-stone-800/60 py-3 shadow-lg dark:shadow-2xl'
            : 'bg-gradient-to-b from-stone-900/60 via-stone-900/20 to-transparent dark:from-stone-950/80 dark:via-stone-950/40 dark:to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigateSection?.('home')}
            className={`text-lg md:text-xl font-serif-luxury tracking-[0.25em] uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isScrolled
                ? 'text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-200'
                : 'text-stone-100 hover:text-amber-200'
            }`}
          >
            Aura
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs tracking-[0.2em] uppercase font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => onNavigateSection?.(link.id)}
                  className={`transition-colors py-1 relative whitespace-nowrap shrink-0 cursor-pointer ${
                    isScrolled
                      ? isActive
                        ? 'text-amber-700 dark:text-amber-200 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                      : isActive
                      ? 'text-amber-200 font-semibold'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-600 dark:bg-amber-300/80" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              type="button"
              className="px-4 sm:px-5 py-2.5 text-xs tracking-[0.2em] font-medium uppercase text-stone-950 bg-amber-100 hover:bg-amber-200 dark:bg-amber-100 dark:hover:bg-amber-200 transition-colors shadow-sm whitespace-nowrap shrink-0 font-sans cursor-pointer"
            >
              Reserve
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`md:hidden p-2 ${
                isScrolled ? 'text-stone-800 dark:text-stone-200' : 'text-stone-200'
              }`}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-stone-50/98 dark:bg-stone-950/95 backdrop-blur-xl md:hidden pt-24 px-8 flex flex-col justify-between pb-8">
          <nav className="flex flex-col gap-5 text-sm tracking-[0.25em] uppercase font-serif-luxury text-stone-800 dark:text-stone-200">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateSection?.(link.id);
                  }}
                  className={`py-2 text-left border-b border-stone-200 dark:border-stone-800 transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'text-amber-700 dark:text-amber-300 font-semibold'
                      : 'text-stone-800 dark:text-stone-200 hover:text-amber-700 dark:hover:text-amber-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs text-amber-600 dark:text-amber-400">●</span>}
                </button>
              );
            })}
          </nav>

          <div className="space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              type="button"
              className="w-full py-3 text-xs tracking-[0.25em] font-medium uppercase text-stone-950 bg-amber-100 hover:bg-amber-200 transition-colors cursor-pointer font-sans"
            >
              Reserve Stay
            </button>
          </div>
        </div>
      )}
    </>
  );
};
