import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Cake, Star, Heart, Sparkles, Moon as Balloon } from 'lucide-react';

const FloatingIcons: React.FC = () => {
  const icons = [
    { Icon: Gift, color: 'text-purple-400', position: { top: '10%', left: '10%' }, delay: 0 },
    { Icon: Cake, color: 'text-yellow-400', position: { top: '20%', right: '15%' }, delay: 1 },
    { Icon: Star, color: 'text-blue-400', position: { bottom: '30%', left: '20%' }, delay: 2 },
    { Icon: Heart, color: 'text-pink-400', position: { top: '50%', right: '10%' }, delay: 3 },
    { Icon: Sparkles, color: 'text-cyan-400', position: { bottom: '20%', right: '25%' }, delay: 4 },
    { Icon: Balloon, color: 'text-red-400', position: { top: '70%', left: '15%' }, delay: 5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {icons.map(({ Icon, color, position, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color}`}
          style={position}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: 0.7, 
            scale: 1, 
            rotate: 360,
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            delay: delay * 0.5,
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Icon size={40} className="drop-shadow-lg" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;