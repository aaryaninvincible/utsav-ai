import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Check if user requested reduced motion */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Standard easing curves for Indian Contemporary Royal aesthetic:
 * Smooth, luxurious decelerations, never bouncy or jarring.
 */
export const EASE = {
  luxuryOut: 'power3.out',
  editorial: 'power2.out',
  smooth: 'sine.inOut',
};

