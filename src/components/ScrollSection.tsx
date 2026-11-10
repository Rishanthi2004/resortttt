import React, { useRef, useState, useEffect } from 'react';

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  isInitialVisible?: boolean;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  children,
  className = '',
  isInitialVisible = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(isInitialVisible);

  useEffect(() => {
    // Top hero is visible initially if page starts at top
    if (id === 'home' && window.scrollY < 120) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Dynamically hide and show as the user scrolls
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05, // Show as soon as 5% enters the viewport
        rootMargin: '20px 0px -40px 0px', // Hides smoothly when scrolled away, reveals on arrival
      }
    );

    const el = sectionRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [id]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-700 ease-out will-change-[transform,opacity] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-0 pointer-events-auto'
          : 'opacity-0 translate-y-10 sm:translate-y-14 scale-[0.98] blur-[1px] pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
};
