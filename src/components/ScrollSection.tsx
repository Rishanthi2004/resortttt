import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { motion, useReducedMotion, type Transition } from 'motion/react';

export type ScrollSectionVariant =
  | 'hero'
  | 'editorial'
  | 'cascade'
  | 'curtain'
  | 'concierge'
  | 'footer';

const ScrollSectionContext = createContext<boolean>(true);

export const useScrollSectionVisible = () => useContext(ScrollSectionContext);

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  isInitialVisible?: boolean;
  variant?: ScrollSectionVariant;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  children,
  className = '',
  isInitialVisible = false,
  variant = 'cascade',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef(isInitialVisible);
  const [isVisible, setIsVisible] = useState(isInitialVisible);
  const [hiddenDirection, setHiddenDirection] = useState<'below' | 'above'>('below');
  const shouldReduceMotion = useReducedMotion();

  const syncEdgeVisibility = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Keep Hero visible when at the very top of the page
    if (id === 'home' && window.scrollY <= 16) {
      setIsVisible(true);
      return;
    }

    // Ensure sections at the very bottom (e.g., Footer on tall screens) pop up when scrolled to bottom
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
    if (atBottom) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
        return;
      }
    }

    setIsVisible(isIntersectingRef.current);
  }, [id]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;

        if (!entry.isIntersecting) {
          const rootTop = entry.rootBounds?.top ?? window.innerHeight * 0.12;
          setHiddenDirection(entry.boundingClientRect.top < rootTop ? 'above' : 'below');
        }

        syncEdgeVisibility();
      },
      {
        threshold: 0,
        // Triggers reveal once the section meaningfully enters the viewport and hides once it leaves
        rootMargin: '-12% 0px -18% 0px',
      }
    );

    observer.observe(el);
    window.addEventListener('scroll', syncEdgeVisibility, { passive: true });
    window.addEventListener('resize', syncEdgeVisibility, { passive: true });

    return () => {
      observer.unobserve(el);
      window.removeEventListener('scroll', syncEdgeVisibility);
      window.removeEventListener('resize', syncEdgeVisibility);
    };
  }, [syncEdgeVisibility]);

  const dirSign = hiddenDirection === 'above' ? -1 : 1;

  const getMotionConfig = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        transition: { duration: 0.25 } as Transition,
      };
    }

    switch (variant) {
      case 'hero':
        return {
          hidden: { opacity: 0, y: dirSign * 28, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 },
          transition: {
            opacity: { duration: 0.45, ease: 'easeOut' },
            y: { type: 'spring', stiffness: 180, damping: 26 },
            scale: { type: 'spring', stiffness: 190, damping: 24 },
          } as Transition,
        };
      case 'editorial':
        return {
          hidden: { opacity: 0, y: dirSign * 38, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1 },
          transition: {
            opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            y: { type: 'spring', stiffness: 200, damping: 24, mass: 0.95 },
            scale: { type: 'spring', stiffness: 210, damping: 24 },
          } as Transition,
        };
      case 'curtain':
        return {
          hidden: {
            opacity: 0,
            y: dirSign * 30,
            scale: 0.95,
            clipPath: 'inset(5% 3% 5% 3% round 12px)',
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
          },
          transition: {
            opacity: { duration: 0.45, ease: 'easeOut' },
            clipPath: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            y: { type: 'spring', stiffness: 190, damping: 25 },
            scale: { type: 'spring', stiffness: 200, damping: 24 },
          } as Transition,
        };
      case 'concierge':
        return {
          hidden: { opacity: 0, y: dirSign * 46, scale: 0.93 },
          visible: { opacity: 1, y: 0, scale: 1 },
          transition: {
            opacity: { duration: 0.42, ease: 'easeOut' },
            y: { type: 'spring', stiffness: 210, damping: 23, mass: 0.9 },
            scale: { type: 'spring', stiffness: 220, damping: 22 },
          } as Transition,
        };
      case 'footer':
        return {
          hidden: { opacity: 0, y: 36, scale: 0.97 },
          visible: { opacity: 1, y: 0, scale: 1 },
          transition: {
            opacity: { duration: 0.45, ease: 'easeOut' },
            y: { type: 'spring', stiffness: 200, damping: 26 },
            scale: { type: 'spring', stiffness: 210, damping: 26 },
          } as Transition,
        };
      case 'cascade':
      default:
        return {
          hidden: { opacity: 0, y: dirSign * 52, scale: 0.91 },
          visible: { opacity: 1, y: 0, scale: 1 },
          transition: {
            opacity: { duration: 0.4, ease: 'easeOut' },
            y: { type: 'spring', stiffness: 220, damping: 24, mass: 0.9 },
            scale: { type: 'spring', stiffness: 240, damping: 20, mass: 0.85 },
          } as Transition,
        };
    }
  };

  const { hidden, visible, transition } = getMotionConfig();

  return (
    <ScrollSectionContext.Provider value={isVisible}>
      <div
        ref={sectionRef}
        data-scroll-section={id}
        className={`overflow-x-clip ${className}`}
      >
        <motion.div
          initial={isInitialVisible ? false : hidden}
          animate={isVisible ? visible : hidden}
          transition={transition}
          className={isVisible ? 'pointer-events-auto' : 'pointer-events-none'}
        >
          {children}
        </motion.div>
      </div>
    </ScrollSectionContext.Provider>
  );
};
