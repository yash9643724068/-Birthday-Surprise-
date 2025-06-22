import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

// Components
import ParticleBackground from './components/ParticleBackground';
import FloatingIcons from './components/FloatingIcons';
import FloatingTimeWidget from './components/FloatingTimeWidget';
import WishCard from './components/WishCard';
import CakeInteraction from './components/CakeInteraction';
import WishSubmission from './components/WishSubmission';
import FloatingBubbles from './components/FloatingBubbles';

function App() {
  const [showWishCard, setShowWishCard] = useState(false);
  const [hasClickedMain, setHasClickedMain] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playBirthdayTuneLoop = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    
    // Happy Birthday melody notes (simplified version)
    const notes = [
      { freq: 261.63, duration: 0.5 }, // C4 - Hap-
      { freq: 261.63, duration: 0.5 }, // C4 - py
      { freq: 293.66, duration: 1.0 }, // D4 - Birth-
      { freq: 261.63, duration: 1.0 }, // C4 - day
      { freq: 349.23, duration: 1.0 }, // F4 - to
      { freq: 329.63, duration: 2.0 }, // E4 - you
      
      { freq: 261.63, duration: 0.5 }, // C4 - Hap-
      { freq: 261.63, duration: 0.5 }, // C4 - py
      { freq: 293.66, duration: 1.0 }, // D4 - Birth-
      { freq: 261.63, duration: 1.0 }, // C4 - day
      { freq: 392.00, duration: 1.0 }, // G4 - to
      { freq: 349.23, duration: 2.0 }, // F4 - you
      
      // Add a pause before repeating
      { freq: 0, duration: 1.0 }, // Pause
    ];

    let currentTime = audioContext.currentTime;
    let totalDuration = 0;

    notes.forEach((note, index) => {
      if (note.freq === 0) {
        // Pause - no sound
        totalDuration += note.duration;
        return;
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(note.freq, currentTime);
      oscillator.type = 'sine';
      
      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration);
      
      currentTime += note.duration;
      totalDuration += note.duration;
    });

    // Add sparkle sound effects periodically
    const sparkleInterval = setInterval(() => {
      if (!isPlaying) {
        clearInterval(sparkleInterval);
        return;
      }
      
      const sparkleOsc = audioContext.createOscillator();
      const sparkleGain = audioContext.createGain();
      
      sparkleOsc.connect(sparkleGain);
      sparkleGain.connect(audioContext.destination);
      
      sparkleOsc.frequency.setValueAtTime(800, audioContext.currentTime);
      sparkleOsc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.3);
      sparkleOsc.type = 'sine';
      
      sparkleGain.gain.setValueAtTime(0.1, audioContext.currentTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      sparkleOsc.start();
      sparkleOsc.stop(audioContext.currentTime + 0.3);
    }, 3000); // Sparkle every 3 seconds

    // Schedule the next loop
    loopTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        playBirthdayTuneLoop();
      }
    }, totalDuration * 1000);
  };

  const startBirthdayTune = () => {
    setIsPlaying(true);
    playBirthdayTuneLoop();
  };

  const stopBirthdayTune = () => {
    setIsPlaying(false);
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const handleMainClick = () => {
    if (hasClickedMain) return;
    
    setHasClickedMain(true);
    setShowWishCard(true);
    
    // Start infinite birthday tune
    try {
      startBirthdayTune();
    } catch (error) {
      console.log('Audio playback not supported or blocked');
    }
    
    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Confetti from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#9333ea', '#3b82f6', '#fbbf24', '#06b6d4', '#ec4899']
      });
      
      // Confetti from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#9333ea', '#3b82f6', '#fbbf24', '#06b6d4', '#ec4899']
      });
    }, 250);
  };

  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      stopBirthdayTune();
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <ParticleBackground />
      <FloatingIcons />
      <FloatingBubbles />
      
      {/* UI Components */}
      <FloatingTimeWidget />
      <CakeInteraction />
      <WishSubmission />
      
      {/* Music Control Button */}
      {hasClickedMain && (
        <motion.button
          onClick={isPlaying ? stopBirthdayTune : startBirthdayTune}
          className="fixed top-8 left-8 glass-card rounded-full p-3 z-20 hover:glow-purple"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-2xl">
            {isPlaying ? '🔇' : '🎵'}
          </div>
        </motion.button>
      )}
      
      {/* Main Hero Section */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {!hasClickedMain && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Special Day Ahead! 🎉
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Someone amazing is about to receive a surprise...
              </p>
            </motion.div>
          )}
          
          <motion.button
            onClick={handleMainClick}
            className={`glass-card rounded-2xl px-8 py-6 group relative overflow-hidden ${
              hasClickedMain ? 'animate-pulse-glow' : 'hover:glow-purple'
            }`}
            whileHover={{ scale: hasClickedMain ? 1 : 1.05 }}
            whileTap={{ scale: hasClickedMain ? 1 : 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            disabled={hasClickedMain}
          >
            <div className="relative z-10 flex items-center space-x-3">
              <Sparkles className="text-cyan-400 animate-sparkle" size={28} />
              <span className="text-2xl font-semibold text-white">
                {hasClickedMain ? "🎂 Surprise Activated! 🎂" : "Tap to Wish Aditya Thakur 🎉"}
              </span>
              <Sparkles className="text-purple-400 animate-sparkle" size={28} />
            </div>
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          {hasClickedMain && (
            <motion.p
              className="text-gray-300 mt-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              ✨ The magic has begun! Check out all the interactive elements around you ✨
              <br />
              <span className="text-sm text-gray-400 mt-2 block">
                🎵 Birthday tune is playing! Use the music button to control playback
              </span>
            </motion.p>
          )}
        </motion.div>
      </div>
      
      {/* Wish Card Modal */}
      <WishCard 
        isVisible={showWishCard} 
        onClose={() => setShowWishCard(false)} 
      />
    </div>
  );
}

export default App;