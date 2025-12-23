import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { ArrowLeft, Hand, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PalmRegistrationProps {
  voterName: string;
  voterCode: string;
  onBack: () => void;
  onComplete: () => void;
}

type PalmStatus = 'pending' | 'scanning' | 'done';

export function PalmRegistration({ voterName, voterCode, onBack, onComplete }: PalmRegistrationProps) {
  const [leftPalm, setLeftPalm] = useState<PalmStatus>('pending');
  const [rightPalm, setRightPalm] = useState<PalmStatus>('pending');
  const [scanning, setScanning] = useState<'left' | 'right' | null>(null);

  const startScan = (hand: 'left' | 'right') => {
    setScanning(hand);
    if (hand === 'left') {
      setLeftPalm('scanning');
    } else {
      setRightPalm('scanning');
    }

    // Simulate scanning process
    setTimeout(() => {
      if (hand === 'left') {
        setLeftPalm('done');
      } else {
        setRightPalm('done');
      }
      setScanning(null);
    }, 3000);
  };

  const canSave = leftPalm === 'done' && rightPalm === 'done';

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#3E7BFA] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Voter List
          </button>

          <div className="mb-8">
            <h1 className="mb-2">Palm Registration</h1>
            <p className="text-[#6B6B6B]">
              Registering biometric data for <span className="text-[#3E7BFA]">{voterName}</span> ({voterCode})
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Palm */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="text-center">
                <h3 className="mb-4">Left Palm</h3>
                <div className="mb-6">
                  <StatusChip status={leftPalm === 'done' ? 'done' : 'pending'}>
                    {leftPalm === 'done' ? 'Captured' : leftPalm === 'scanning' ? 'Scanning...' : 'Not Captured'}
                  </StatusChip>
                </div>

                {/* Palm Scanner Visual */}
                <div className="relative w-64 h-80 mx-auto mb-6 bg-gradient-to-br from-[#3E7BFA]/10 to-[#0ACF83]/10 rounded-3xl border-2 border-[#3E7BFA]/30 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                  <Hand className="w-32 h-32 text-[#3E7BFA]/40" />
                  
                  {/* Scanning Animation */}
                  {leftPalm === 'scanning' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3E7BFA]/30 to-transparent"
                      initial={{ y: '-100%' }}
                      animate={{ y: '100%' }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}

                  {/* Success Check */}
                  {leftPalm === 'done' && (
                    <motion.div
                      className="absolute inset-0 bg-[#4CAF50]/20 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <CheckCircle2 className="w-24 h-24 text-[#4CAF50]" />
                    </motion.div>
                  )}
                </div>

                <Button 
                  variant={leftPalm === 'done' ? 'secondary' : 'primary'}
                  onClick={() => startScan('left')}
                  disabled={scanning !== null}
                  className="w-full"
                >
                  {leftPalm === 'done' ? 'Recapture' : 'Capture Left Palm'}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Palm */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="text-center">
                <h3 className="mb-4">Right Palm</h3>
                <div className="mb-6">
                  <StatusChip status={rightPalm === 'done' ? 'done' : 'pending'}>
                    {rightPalm === 'done' ? 'Captured' : rightPalm === 'scanning' ? 'Scanning...' : 'Not Captured'}
                  </StatusChip>
                </div>

                {/* Palm Scanner Visual */}
                <div className="relative w-64 h-80 mx-auto mb-6 bg-gradient-to-br from-[#3E7BFA]/10 to-[#0ACF83]/10 rounded-3xl border-2 border-[#3E7BFA]/30 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                  <Hand className="w-32 h-32 text-[#3E7BFA]/40 scale-x-[-1]" />
                  
                  {/* Scanning Animation */}
                  {rightPalm === 'scanning' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3E7BFA]/30 to-transparent"
                      initial={{ y: '-100%' }}
                      animate={{ y: '100%' }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}

                  {/* Success Check */}
                  {rightPalm === 'done' && (
                    <motion.div
                      className="absolute inset-0 bg-[#4CAF50]/20 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <CheckCircle2 className="w-24 h-24 text-[#4CAF50]" />
                    </motion.div>
                  )}
                </div>

                <Button 
                  variant={rightPalm === 'done' ? 'secondary' : 'primary'}
                  onClick={() => startScan('right')}
                  disabled={scanning !== null}
                  className="w-full"
                >
                  {rightPalm === 'done' ? 'Recapture' : 'Capture Right Palm'}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Save Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2">Ready to Save</h3>
                <p className="text-[#6B6B6B]">
                  {canSave 
                    ? 'Both palm templates have been captured successfully'
                    : 'Please capture both palm templates before saving'
                  }
                </p>
              </div>
              <Button 
                variant={canSave ? 'primary' : 'secondary'}
                onClick={onComplete}
                disabled={!canSave}
              >
                Save Templates
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
