import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { CheckCircle2, User, Hash } from 'lucide-react';
import { motion } from 'motion/react';

interface IdentityVerifiedProps {
  voterName: string;
  voterCode: string;
  onProceed: () => void;
}

export function IdentityVerified({ voterName, voterCode, onProceed }: IdentityVerifiedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="text-center">
          {/* Success Animation */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-[#4CAF50]/20 rounded-full mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <CheckCircle2 className="w-16 h-16 text-[#4CAF50]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="mb-2 text-[#4CAF50]">Identity Verified!</h2>
            <p className="text-[#6B6B6B] mb-8">
              Your palm authentication was successful
            </p>

            {/* Voter Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-[#F4F6FA] rounded-xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#3E7BFA]" />
                </div>
                <div className="text-left">
                  <p className="text-[#6B6B6B]">Voter Name</p>
                  <p>{voterName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#F4F6FA] rounded-xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Hash className="w-5 h-5 text-[#3E7BFA]" />
                </div>
                <div className="text-left">
                  <p className="text-[#6B6B6B]">Voter ID</p>
                  <code className="text-[#3E7BFA]">{voterCode}</code>
                </div>
              </div>
            </div>

            <Button 
              variant="primary" 
              onClick={onProceed}
              className="w-full"
            >
              Proceed to Voting
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
