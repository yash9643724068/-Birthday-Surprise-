import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const FloatingTimeWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed top-8 right-8 glass-card rounded-2xl p-4 z-20"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center space-x-3 text-white">
        <Clock className="text-cyan-400" size={24} />
        <div className="text-right">
          <div className="text-sm font-light text-gray-300">Birthday Time</div>
          <div className="text-lg font-semibold">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingTimeWidget;