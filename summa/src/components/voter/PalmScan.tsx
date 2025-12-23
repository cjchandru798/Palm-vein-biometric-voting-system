import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Hand, ScanLine } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PalmScanProps {
  voterId: string;
  onSuccess: (voterName: string) => void;
  onError: (error: string) => void;
}

export function PalmScan({ voterId, onSuccess, onError }: PalmScanProps) {
  const [scanning, setScanning] = useState(false);
  const [processing, setProcessing] = useState(false);

  const startScan = () => {
    setScanning(true);

    // Simulate scanning duration
    setTimeout(() => {
      setScanning(false);
      setProcessing(true);

      // Simulate processing
      setTimeout(() => {
        setProcessing(false);
        // Simulate success (90% success rate)
        if (Math.random() > 0.1) {
          onSuccess('Sarah Johnson');
        } else {
          onError('Palm verification failed. Please try again.');
        }
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <h1 className="mb-2">Palm Authentication</h1>
          <p className="text-[#6B6B6B]">Voter ID: <span className="text-[#3E7BFA]">{voterId}</span></p>
        </div>

        <Card>
          <div className="text-center">
            {/* Palm Scanner Frame */}
            <div className="relative w-full max-w-sm mx-auto mb-8">
              <div className="aspect-[3/4] relative bg-gradient-to-br from-[#3E7BFA]/10 to-[#0ACF83]/10 rounded-[3rem] border-4 border-[#3E7BFA]/30 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                {/* Palm Icon */}
                <Hand className="w-48 h-48 text-[#3E7BFA]/30" />

                {/* Scanning Animation */}
                <AnimatePresence>
                  {scanning && (
                    <>
                      {/* Scanning Line */}
                      <motion.div
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#3E7BFA] to-transparent shadow-[0_0_20px_rgba(62,123,250,0.8)]"
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-[#3E7BFA]/10"
                        animate={{
                          opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Corner Guides */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#3E7BFA] rounded-tl-2xl" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#3E7BFA] rounded-tr-2xl" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#3E7BFA] rounded-bl-2xl" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#3E7BFA] rounded-br-2xl" />
              </div>
            </div>

            {/* Instructions */}
            {!scanning && !processing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <p className="text-[#6B6B6B] mb-2">
                  Place your palm near the camera within the frame
                </p>
                <p className="text-[#6B6B6B]">
                  Keep your hand steady during the scan
                </p>
              </motion.div>
            )}

            {/* Scanning Status */}
            {scanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6"
              >
                <div className="flex items-center justify-center gap-2 text-[#3E7BFA]">
                  <ScanLine className="w-5 h-5 animate-pulse" />
                  <p>Scanning palm vein pattern...</p>
                </div>
              </motion.div>
            )}

            {/* Processing Status */}
            {processing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 space-y-2"
              >
                <div className="flex items-center justify-center gap-2 text-[#3E7BFA]">
                  <motion.div
                    className="w-2 h-2 bg-[#3E7BFA] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <p>Extracting vein pattern...</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#0ACF83]">
                  <motion.div
                    className="w-2 h-2 bg-[#0ACF83] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                  />
                  <p>Encrypting with QKD...</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#FFC107]">
                  <motion.div
                    className="w-2 h-2 bg-[#FFC107] rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
                  />
                  <p>Verifying identity...</p>
                </div>
              </motion.div>
            )}

            {/* Start Scan Button */}
            {!scanning && !processing && (
              <Button 
                variant="primary" 
                onClick={startScan}
                className="w-full max-w-sm"
              >
                Start Scan
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
