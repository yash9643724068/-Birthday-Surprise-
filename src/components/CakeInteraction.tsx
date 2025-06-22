import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cake } from 'lucide-react';

const CakeInteraction: React.FC = () => {
  const [slices, setSlices] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cutCake = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlices(prev => prev + 1);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-20"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 1 }}
    >
      <div className="glass-card rounded-2xl p-6 text-center">
        <h3 className="text-white font-semibold mb-4">Cut the Cake!</h3>
        <motion.button
          onClick={cutCake}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`text-6xl cursor-pointer ${isAnimating ? 'cake-slice' : ''}`}
            animate={isAnimating ? { rotate: [0, 15, -15, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            🎂
          </motion.div>
          
          {/* Slice counter */}
          {slices > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {slices}
            </motion.div>
          )}
        </motion.button>
        
        <p className="text-gray-400 text-sm mt-2">
          Click to slice! ({slices} slices cut)
        </p>
      </div>
    </motion.div>
  );
};

export default CakeInteraction;