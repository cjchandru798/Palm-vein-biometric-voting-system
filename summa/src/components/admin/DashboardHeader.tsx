import React from 'react';
import { motion } from 'motion/react';
import { LogOut, Shield } from 'lucide-react';
import { Button } from '../Button';

interface DashboardHeaderProps {
  onLogout: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <motion.div
      className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#3E7BFA] to-[#2D5FD8] rounded-xl flex items-center justify-center shadow-lg shadow-[#3E7BFA]/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#1A1A1A]">Admin Portal</h2>
              <p className="text-sm text-[#6B6B6B]">Voting Management System</p>
            </div>
          </motion.div>

          {/* User Info and Logout */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#F4F6FA] rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3E7BFA] to-[#0ACF83] rounded-full flex items-center justify-center">
                <span className="text-white">AD</span>
              </div>
              <div>
                <p className="text-sm">Administrator</p>
                <small className="text-[#6B6B6B]">admin@voting.gov</small>
              </div>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                onClick={onLogout}
                icon={<LogOut className="w-4 h-4" />}
                className="gap-2"
              >
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
