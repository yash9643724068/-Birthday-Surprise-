import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';

interface WishCardProps {
  isVisible: boolean;
  onClose: () => void;
}

const WishCard: React.FC<WishCardProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="glass-card rounded-3xl p-8 max-w-md mx-4 text-center relative glow-purple"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-6xl mb-6">🎂</div>
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Happy Birthday
          </h2>
          <h3 className="text-2xl font-semibold text-cyan-400 mb-6">
            Aditya Thakur!
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            May your year be as amazing as you are! 🎈
            <br />
            Wishing you joy, success, and all the happiness in the world.
          </p>
          <div className="flex items-center justify-center space-x-2 text-pink-400">
            <Heart className="animate-pulse" size={20} />
            <span className="font-medium">From your friend Yash</span>
            <Heart className="animate-pulse" size={20} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WishCard;