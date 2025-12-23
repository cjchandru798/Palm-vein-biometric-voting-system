import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required = false,
  disabled = false
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <motion.input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-300 outline-none bg-white
          ${focused ? 'border-[#3E7BFA] ring-4 ring-[#3E7BFA]/10 shadow-[0_0_0_1px_rgba(62,123,250,0.1)]' : 'border-[#E5E5E5]'}
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''}
          hover:border-[#3E7BFA]/50
        `}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      />
      <motion.label 
        className={`absolute left-4 transition-all duration-200 pointer-events-none bg-white px-1.5
          ${focused || hasValue ? '-top-2.5 text-xs' : 'top-3.5 text-sm'}
          ${focused ? 'text-[#3E7BFA]' : 'text-[#6B6B6B]'}
        `}
        animate={{
          y: focused || hasValue ? 0 : 0,
          scale: focused || hasValue ? 0.85 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {label} {required && <span className="text-[#FF4D4F]">*</span>}
      </motion.label>
      
      <AnimatePresence>
        {focused && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3E7BFA] to-[#0ACF83]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}