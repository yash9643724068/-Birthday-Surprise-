import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Heart } from 'lucide-react';

interface Wish {
  id: number;
  message: string;
  timestamp: Date;
}

const WishSubmission: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    const wish: Wish = {
      id: Date.now(),
      message: newWish.trim(),
      timestamp: new Date()
    };

    setTimeout(() => {
      setWishes(prev => [wish, ...prev].slice(0, 10)); // Keep only latest 10
      setNewWish('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-20 w-80">
      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="text-cyan-400" size={20} />
          <h3 className="text-white font-semibold">Send a Wish</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newWish}
              onChange={(e) => setNewWish(e.target.value)}
              placeholder="Write your birthday wish..."
              className="flex-1 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              disabled={isSubmitting}
            />
            <motion.button
              type="submit"
              disabled={!newWish.trim() || isSubmitting}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Send size={20} />
              )}
            </motion.button>
          </div>
        </form>

        {/* Wishes Display */}
        <div className="max-h-40 overflow-y-auto space-y-2">
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                className="bg-white bg-opacity-5 rounded-lg p-3 border border-white border-opacity-10"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white text-sm">{wish.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400 text-xs">
                    {wish.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <Heart className="text-pink-400" size={14} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {wishes.length === 0 && (
          <p className="text-gray-400 text-sm text-center">
            Be the first to send a wish! 💝
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default WishSubmission;