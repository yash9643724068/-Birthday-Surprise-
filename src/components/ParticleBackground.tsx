import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      // Random colors for particles
      const colors = [
        'rgba(147, 51, 234, 0.6)', // purple
        'rgba(59, 130, 246, 0.6)', // blue
        'rgba(251, 191, 36, 0.6)', // gold
        'rgba(6, 182, 212, 0.6)',  // turquoise
        'rgba(255, 255, 255, 0.4)' // white
      ];
      
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.boxShadow = `0 0 6px ${colors[Math.floor(Math.random() * colors.length)]}`;
      
      container.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 15000);
    };

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createParticle(), i * 300);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="particles" />;
};

export default ParticleBackground;