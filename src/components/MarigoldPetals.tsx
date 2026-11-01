import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../motion/motionHelpers';

interface MarigoldPetalsProps {
  count?: number;
}

export const MarigoldPetals: React.FC<MarigoldPetalsProps> = ({ count = 12 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const petals = containerRef.current?.querySelectorAll('.marigold-petal') ?? [];
      const embers = containerRef.current?.querySelectorAll('.gold-ember') ?? [];

      petals.forEach((petal) => {
        const startX = Math.random() * (window.innerWidth || 1200);
        const duration = 12 + Math.random() * 8;
        const delay = Math.random() * 6;
        const drift = (Math.random() - 0.5) * 160;
        const rot = Math.random() > 0.5 ? 360 : -360;

        gsap.set(petal, {
          x: startX,
          y: -40,
          opacity: 0,
          rotation: Math.random() * 360,
          scale: 0.6 + Math.random() * 0.5,
        });

        // Continuous falling drift
        gsap.to(petal, {
          y: (window.innerHeight || 900) + 60,
          x: `+=${drift}`,
          rotation: `+=${rot}`,
          duration,
          delay,
          repeat: -1,
          ease: 'none',
          onRepeat: () => {
            gsap.set(petal, {
              x: Math.random() * (window.innerWidth || 1200),
              y: -40,
              rotation: Math.random() * 360,
            });
          },
        });

        // Gentle breathing opacity
        gsap.to(petal, {
          opacity: 0.75,
          duration: 2.2,
          delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      embers.forEach((ember) => {
        const startX = Math.random() * (window.innerWidth || 1200);
        const startY = Math.random() * (window.innerHeight || 900);
        const duration = 3.5 + Math.random() * 3;
        const delay = Math.random() * 3;

        gsap.set(ember, {
          x: startX,
          y: startY,
          opacity: 0.1,
          scale: 0.5 + Math.random() * 0.7,
        });

        gsap.to(ember, {
          opacity: 0.7,
          scale: '+=0.3',
          duration,
          delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to(ember, {
          y: `+=${(Math.random() - 0.5) * 50}`,
          x: `+=${(Math.random() - 0.5) * 40}`,
          duration: duration * 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-20"
      style={{ contain: 'paint layout' }}
    >
      {/* Marigold and Rose Petals */}
      {Array.from({ length: count }).map((_, i) => {
        const isRose = i % 3 === 0;
        return (
          <div
            key={`p-${i}`}
            className="marigold-petal absolute top-0 left-0 will-change-transform"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-sm"
            >
              {isRose ? (
                // Muted Rose Petal
                <path
                  d="M12 2C7 6 4 11 6 17C8 22 16 22 18 17C20 11 17 6 12 2Z"
                  fill="#C98F91"
                  fillOpacity="0.85"
                />
              ) : (
                // Warm Saffron / Marigold Petal
                <path
                  d="M12 2C8 5 5 10 7 16C9 21 15 21 17 16C19 10 16 5 12 2Z"
                  fill="#E69A37"
                  fillOpacity="0.88"
                />
              )}
            </svg>
          </div>
        );
      })}

      {/* Subtle Gold Embers */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`e-${i}`}
          className="gold-ember absolute w-1.5 h-1.5 rounded-full bg-[#C59A53] shadow-[0_0_8px_#C59A53] will-change-transform"
        />
      ))}
    </div>
  );
};
