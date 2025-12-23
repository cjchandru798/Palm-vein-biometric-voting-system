import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className = '', onClick, hover = false, glass = false }: CardProps) {
  const baseStyles = glass 
    ? "bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20"
    : "bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]";
  
  const hoverStyles = hover 
    ? "hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out cursor-pointer" 
    : "";

  if (onClick || hover) {
    return (
      <motion.div
        className={`${baseStyles} ${hoverStyles} ${className}`}
        onClick={onClick}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={hover ? { y: -4, scale: 1.01 } : {}}
        whileTap={hover ? { scale: 0.98 } : {}}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`${baseStyles} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}