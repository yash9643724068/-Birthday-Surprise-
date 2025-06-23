import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CakeExplosionProps {
  isActive: boolean;
  onComplete: () => void;
}

const CakeExplosion: React.FC<CakeExplosionProps> = ({ isActive, onComplete }) => {
  const [animationStage, setAnimationStage] = useState<'idle' | 'vibrating' | 'exploded' | 'complete'>('idle');

  useEffect(() => {
    if (!isActive) {
      setAnimationStage('idle');
      return;
    }

    // Start the animation sequence
    const timer1 = setTimeout(() => {
      setAnimationStage('vibrating');
    }, 2000);

    const timer2 = setTimeout(() => {
      setAnimationStage('exploded');
      // Play explosion sound effect
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.log('Audio not supported');
      }
    }, 4000);

    const timer3 = setTimeout(() => {
      setAnimationStage('complete');
      onComplete();
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const slicePositions = [
    { x: -300, y: -200, rotation: -45, finalX: -150, finalY: -100 }, // top-left
    { x: 300, y: -200, rotation: 45, finalX: 150, finalY: -100 },   // top-right
    { x: -400, y: 0, rotation: -90, finalX: -200, finalY: 0 },      // left
    { x: 400, y: 0, rotation: 90, finalX: 200, finalY: 0 },        // right
    { x: -300, y: 200, rotation: -135, finalX: -150, finalY: 100 }, // bottom-left
    { x: 300, y: 200, rotation: 135, finalX: 150, finalY: 100 },   // bottom-right
  ];

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Main Cake - Center of screen */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        
        {/* Cake - Idle and Vibrating States */}
        <AnimatePresence>
          {(animationStage === 'idle' || animationStage === 'vibrating') && (
            <motion.div
              className="relative"
              initial={{ y: 10, scale: 1 }}
              animate={
                animationStage === 'idle'
                  ? { 
                      y: [10, 0, 10], 
                      scale: 1,
                      rotate: [0, 2, -2, 0]
                    }
                  : {
                      y: [0, -5, 5, -3, 3, 0],
                      x: [0, -8, 8, -5, 5, 0],
                      scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
                      rotate: [0, -5, 5, -3, 3, 0]
                    }
              }
              transition={
                animationStage === 'idle'
                  ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.15, repeat: Infinity }
              }
              exit={{ 
                scale: [1, 1.5, 0], 
                rotate: [0, 180, 360],
                opacity: [1, 1, 0]
              }}
            >
              {/* Magical aura for vibrating state */}
              {animationStage === 'vibrating' && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full blur-2xl scale-150"
                    animate={{ 
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1.5, 2, 1.5]
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  />
                  
                  {/* Lightning cracks */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-2 h-16 bg-gradient-to-t from-yellow-300 via-white to-cyan-300 rounded-full"
                      style={{
                        transformOrigin: 'bottom center',
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scaleY: [0, 1.5, 0],
                        scaleX: [2, 1, 2]
                      }}
                      transition={{ 
                        duration: 0.4, 
                        repeat: Infinity,
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* The Cake */}
              <div className="text-8xl relative z-10 filter drop-shadow-2xl">
                🎂
              </div>
              
              {/* Glowing candles effect */}
              <motion.div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1"
                animate={{ 
                  y: [0, -2, 0],
                }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-4 bg-gradient-to-t from-yellow-400 to-orange-300 rounded-full"
                    animate={{
                      scaleY: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explosion Effects */}
        <AnimatePresence>
          {animationStage === 'exploded' && (
            <>
              {/* Central explosion burst */}
              <motion.div
                className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 8, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="w-32 h-32 bg-gradient-radial from-white via-yellow-400 via-orange-400 to-transparent rounded-full" />
              </motion.div>

              {/* Shockwave rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 border-4 border-yellow-400 rounded-full"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 6 + i * 2, opacity: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeOut",
                    delay: i * 0.2
                  }}
                  style={{ width: '100px', height: '100px' }}
                />
              ))}

              {/* Sparkle explosion particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute top-0 left-0 w-3 h-3 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full"
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos(i * 18 * Math.PI / 180) * (150 + Math.random() * 100),
                    y: Math.sin(i * 18 * Math.PI / 180) * (150 + Math.random() * 100),
                    opacity: [1, 1, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    ease: "easeOut",
                    delay: Math.random() * 0.5
                  }}
                />
              ))}

              {/* Flying cake slices with trails */}
              {slicePositions.map((pos, i) => (
                <motion.div
                  key={`slice-${i}`}
                  className="absolute top-0 left-0"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    rotate: 0, 
                    scale: 1
                  }}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotation + 720, // Multiple spins
                    scale: [1, 1.3, 0.9]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    times: [0, 0.3, 1]
                  }}
                >
                  {/* Slice with glow trail */}
                  <div className="relative">
                    <motion.div
                      className="text-6xl filter drop-shadow-lg"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360]
                      }}
                      transition={{
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 4, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      🍰
                    </motion.div>
                    
                    {/* Magical trail */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full blur-xl opacity-60"
                      animate={{ 
                        opacity: [0.6, 0.2, 0.6],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Confetti burst */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute top-0 left-0 w-2 h-6 rounded-full"
                  style={{
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][i % 6]
                  }}
                  initial={{ 
                    scale: 0, 
                    x: 0, 
                    y: 0, 
                    rotate: 0,
                    opacity: 1
                  }}
                  animate={{
                    scale: [0, 1, 1, 0],
                    x: (Math.random() - 0.5) * 800,
                    y: Math.random() * 600 + 200,
                    rotate: Math.random() * 720,
                    opacity: [1, 1, 1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    ease: "easeOut",
                    delay: Math.random() * 0.5
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Stuck slices around the screen edges */}
      <AnimatePresence>
        {animationStage === 'complete' && (
          <>
            {slicePositions.map((pos, i) => (
              <motion.div
                key={`stuck-${i}`}
                className="absolute text-5xl"
                style={{
                  left: `calc(50% + ${pos.finalX}px)`,
                  top: `calc(50% + ${pos.finalY}px)`,
                  transform: `rotate(${pos.rotation}deg)`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1], 
                  opacity: 1,
                  y: [0, -15, 0]
                }}
                transition={{
                  scale: { duration: 0.5, times: [0, 0.6, 1] },
                  opacity: { duration: 0.3 },
                  y: { 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.3
                  }
                }}
              >
                <div className="relative">
                  🍰
                  {/* Subtle glow */}
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-20 scale-150" />
                </div>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CakeExplosion;
