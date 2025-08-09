import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedSuitcaseProps {
  tapeLayers: number;
  isLeaking?: boolean;
  className?: string;
}

export const AnimatedSuitcase = ({ tapeLayers, isLeaking = false, className = "" }: AnimatedSuitcaseProps) => {
  const [showDrip, setShowDrip] = useState(false);

  useEffect(() => {
    if (isLeaking) {
      setShowDrip(true);
      const timer = setTimeout(() => setShowDrip(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLeaking]);

  return (
    <div className={`relative ${className}`}>
      {/* Main Suitcase */}
      <motion.div
        className="relative w-48 h-32 mx-auto"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Suitcase Body */}
        <div className="w-full h-full suitcase-gradient rounded-lg border-4 border-primary relative overflow-hidden shadow-suitcase">
          {/* Suitcase Details */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-secondary rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-secondary rounded"></div>
          
          {/* Handle */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-4 border-4 border-primary rounded-t-xl bg-transparent"></div>
          
          {/* Wheels */}
          <div className="absolute -bottom-3 left-4 w-3 h-3 bg-foreground rounded-full"></div>
          <div className="absolute -bottom-3 right-4 w-3 h-3 bg-foreground rounded-full"></div>
        </div>

        {/* Tape Layers */}
        {Array.from({ length: Math.min(tapeLayers, 8) }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 border-4 rounded-lg tape-gradient opacity-70"
            initial={{ scale: 1 + (index * 0.1), opacity: 0 }}
            animate={{ 
              scale: 1 + (index * 0.1), 
              opacity: 0.7,
              rotate: index * 5
            }}
            transition={{ 
              delay: index * 0.2,
              duration: 0.8,
              ease: "easeOut"
            }}
            style={{
              borderColor: `hsl(${45 + index * 10} 80% ${70 - index * 5}%)`,
              transform: `scale(${1 + index * 0.05}) rotate(${index * 3}deg)`
            }}
          />
        ))}

        {/* Leak Animation */}
        {showDrip && (
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 100, opacity: 0 }}
            transition={{ duration: 2, ease: "easeIn" }}
          >
            <div className="w-2 h-8 bg-accent rounded-full"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Protection Level Indicator */}
      {tapeLayers > 5 && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          🔒 Maximum Protection
        </motion.div>
      )}
    </div>
  );
};