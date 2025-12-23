import React, { useEffect, useState } from 'react';
import { Card } from '../Card';
import { Shield, Key, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface QKDSessionProps {
  onComplete: () => void;
}

export function QKDSession({ onComplete }: QKDSessionProps) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    { icon: Shield, text: 'Establishing Quantum-Secured Channel...', delay: 1000 },
    { icon: Key, text: 'Generating AES-256 Encryption Key...', delay: 1500 },
    { icon: Lock, text: 'Securing Communication Channel...', delay: 1000 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 33 && step === 0) setStep(1);
    if (progress > 66 && step === 1) setStep(2);
  }, [progress, step]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="text-center">
          {/* Quantum Wave Animation */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#0ACF83] opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-r from-[#0ACF83] to-[#3E7BFA] opacity-30"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute inset-8 rounded-full bg-gradient-to-r from-[#3E7BFA] to-[#0ACF83] opacity-40"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {React.createElement(steps[step].icon, {
                className: "w-16 h-16 text-[#3E7BFA]"
              })}
            </div>
          </div>

          <h2 className="mb-4">Securing Your Session</h2>
          
          {/* Progress Steps */}
          <div className="space-y-4 mb-8">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 justify-center ${
                    index <= step ? 'text-[#3E7BFA]' : 'text-[#6B6B6B]'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: index <= step ? 1 : 0.5, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <Icon className="w-5 h-5" />
                  <p>{s.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#E5E5E5] rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#3E7BFA] to-[#0ACF83] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-4 text-[#6B6B6B]">{progress}% Complete</p>
        </Card>
      </motion.div>
    </div>
  );
}
