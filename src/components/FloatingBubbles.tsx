import React, { useEffect, useRef } from 'react';

const FloatingBubbles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const quotes = [
    "Make a wish! 🌟",
    "Another year of awesome! 🎉",
    "Celebrate big! 🎊",
    "You're amazing! ✨",
    "Best birthday ever! 🎂",
    "Dream big! 🌈",
    "Joy & happiness! 💖",
    "Special day! 🎈"
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble fixed glass-card rounded-full flex items-center justify-center text-white text-xs font-medium pointer-events-none';
      bubble.style.left = Math.random() * (window.innerWidth - 150) + 'px';
      bubble.style.bottom = '-100px';
      bubble.style.width = '120px';
      bubble.style.height = '120px';
      bubble.style.animationDelay = Math.random() * 12 + 's';
      bubble.style.animationDuration = (Math.random() * 8 + 10) + 's';
      bubble.style.zIndex = '5';
      
      // Add random quote
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      bubble.innerHTML = `<span class="text-center p-2">${quote}</span>`;
      
      // Add glow effect
      const glowColors = ['glow-purple', 'glow-blue', 'glow-gold', 'glow-turquoise'];
      bubble.classList.add(glowColors[Math.floor(Math.random() * glowColors.length)]);
      
      container.appendChild(bubble);

      // Remove bubble after animation
      setTimeout(() => {
        if (container.contains(bubble)) {
          container.removeChild(bubble);
        }
      }, 12000);
    };

    // Create initial bubbles
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createBubble(), i * 4000);
    }

    // Continue creating bubbles
    const interval = setInterval(createBubble, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-5" />;
};

export default FloatingBubbles;