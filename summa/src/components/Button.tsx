import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  icon,
  className = ''
}: ButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  const baseStyles = "rounded-xl px-6 py-3.5 transition-all duration-300 ease-out flex items-center justify-center gap-2 relative overflow-hidden";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-[#3E7BFA] to-[#2D5FD8] text-white hover:shadow-lg hover:shadow-[#3E7BFA]/30 hover:-translate-y-0.5",
    secondary: "border-2 border-[#3E7BFA] text-[#3E7BFA] bg-white hover:bg-[#3E7BFA]/5 hover:shadow-md",
    danger: "bg-gradient-to-r from-[#FF4D4F] to-[#E63946] text-white hover:shadow-lg hover:shadow-[#FF4D4F]/30 hover:-translate-y-0.5",
    icon: "w-10 h-10 rounded-full bg-white border border-[#E5E5E5] hover:bg-gray-50 hover:border-[#3E7BFA]/30 hover:shadow-md p-0"
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Ripple effect */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          initial={{ 
            width: 0, 
            height: 0, 
            x: ripple.x, 
            y: ripple.y,
            opacity: 1 
          }}
          animate={{ 
            width: 400, 
            height: 400, 
            x: ripple.x - 200, 
            y: ripple.y - 200,
            opacity: 0 
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}