import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { XCircle, AlertTriangle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ErrorScreenProps {
  type: 'invalid-palm' | 'already-voted' | 'session-expired';
  onRetry?: () => void;
  onExit: () => void;
}

const errorConfig = {
  'invalid-palm': {
    icon: XCircle,
    color: '#FF4D4F',
    title: 'Palm Verification Failed',
    message: 'The palm scan did not match any registered voters. Please ensure your palm is correctly positioned and try again.',
    showRetry: true
  },
  'already-voted': {
    icon: AlertTriangle,
    color: '#FFC107',
    title: 'Already Voted',
    message: 'Our records show that you have already cast your vote in this election. Each voter can only vote once.',
    showRetry: false
  },
  'session-expired': {
    icon: Clock,
    color: '#FF4D4F',
    title: 'Session Expired',
    message: 'Your secure session has expired due to inactivity. Please start the authentication process again.',
    showRetry: false
  }
};

export function ErrorScreen({ type, onRetry, onExit }: ErrorScreenProps) {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="text-center">
          {/* Error Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
            style={{ backgroundColor: `${config.color}20` }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Icon className="w-16 h-16" style={{ color: config.color }} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-3" style={{ color: config.color }}>{config.title}</h2>
            <p className="text-[#6B6B6B] mb-8">
              {config.message}
            </p>

            {/* Actions */}
            <div className="space-y-4">
              {config.showRetry && onRetry && (
                <Button 
                  variant="primary" 
                  onClick={onRetry}
                  className="w-full"
                >
                  Try Again
                </Button>
              )}
              <Button 
                variant="secondary" 
                onClick={onExit}
                className="w-full"
              >
                {config.showRetry ? 'Exit' : 'Return to Login'}
              </Button>
            </div>

            {/* Help Text */}
            <motion.div
              className="mt-8 p-4 bg-[#F4F6FA] rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-[#6B6B6B]">
                Need help? Contact election support at{' '}
                <span className="text-[#3E7BFA]">support@voting.gov</span>
              </p>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
