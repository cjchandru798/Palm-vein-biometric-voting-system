import React, { useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { Vote } from 'lucide-react';
import { motion } from 'motion/react';

interface VoterLoginProps {
  onLogin: (voterId: string) => void;
}

export function VoterLogin({ onLogin }: VoterLoginProps) {
  const [voterId, setVoterId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voterId) {
      onLogin(voterId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3E7BFA]/10 via-[#F4F6FA] to-[#0ACF83]/10" />
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3E7BFA]/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0ACF83]/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
          x: [0, -40, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="text-center mb-8">
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#3E7BFA] to-[#0ACF83] rounded-3xl mb-6 shadow-2xl shadow-[#3E7BFA]/40"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          >
            <Vote className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="mb-3">Secure Voting Portal</h1>
            <p className="text-[#6B6B6B]">
              Palm vein authentication for maximum security
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card glass>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  label="Voter ID"
                  type="text"
                  value={voterId}
                  onChange={setVoterId}
                  placeholder="Enter your voter ID (e.g., V8X2K9PL)"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button type="submit" variant="primary" className="w-full">
                  Start Authentication
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <small className="text-[#6B6B6B] inline-flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[#0ACF83] rounded-full animate-pulse" />
            Quantum-Secured Connection • End-to-End Encrypted
          </small>
        </motion.div>
      </motion.div>
    </div>
  );
}