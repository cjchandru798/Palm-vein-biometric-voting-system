import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { CheckCircle2, Lock, Download, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface VoteSuccessProps {
  candidateName: string;
  voteId: string;
  timestamp: string;
  onExit: () => void;
}

export function VoteSuccess({ candidateName, voteId, timestamp, onExit }: VoteSuccessProps) {
  const handleDownloadVVPAT = () => {
    // In a real app, this would generate and download a VVPAT receipt
    alert('VVPAT receipt download would start here');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="text-center">
          {/* Success Animation */}
          <motion.div
            className="inline-flex items-center justify-center w-32 h-32 bg-[#4CAF50]/20 rounded-full mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CheckCircle2 className="w-20 h-20 text-[#4CAF50]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="mb-3 text-[#4CAF50]">Vote Successful!</h1>
            <p className="text-[#6B6B6B] mb-8">
              Your vote has been securely recorded and encrypted
            </p>

            {/* Lock Animation */}
            <motion.div
              className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-[#3E7BFA]/10 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <Lock className="w-5 h-5 text-[#3E7BFA]" />
              <p className="text-[#3E7BFA]">Quantum-Encrypted & Blockchain Verified</p>
            </motion.div>

            {/* VVPAT Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-[#F4F6FA] border-2 border-[#E5E5E5] mb-6">
                <h3 className="mb-4">Voter Verified Paper Audit Trail (VVPAT)</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Candidate:</span>
                    <span>{candidateName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Vote ID:</span>
                    <code className="text-[#3E7BFA]">{voteId}</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Timestamp:</span>
                    <span>{timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Encryption:</span>
                    <span className="text-[#4CAF50]">QKD-AES256</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button 
                variant="secondary" 
                onClick={handleDownloadVVPAT}
                icon={<Download className="w-5 h-5" />}
                className="flex-1"
              >
                Download VVPAT
              </Button>
              <Button 
                variant="primary" 
                onClick={onExit}
                icon={<LogOut className="w-5 h-5" />}
                className="flex-1"
              >
                Exit
              </Button>
            </motion.div>

            {/* Thank You Message */}
            <motion.p
              className="mt-8 text-[#6B6B6B]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Thank you for participating in the democratic process! 🗳️
            </motion.p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
