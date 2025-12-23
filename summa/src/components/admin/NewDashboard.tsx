import React, { useState } from 'react';
import { Card } from '../Card';
import { Users, Vote, CalendarCheck, Fingerprint, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardHeader } from './DashboardHeader';
import { ElectionDetail } from './ElectionDetail';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

interface Election {
  id: string;
  name: string;
  date: string;
  status: 'active' | 'completed';
  participants: number;
  votesCount: number;
  totalVoters: number;
  image: string;
}

const activeElections: Election[] = [
  {
    id: '1',
    name: 'Presidential Election 2025',
    date: 'Nov 21, 2025',
    status: 'active',
    participants: 4,
    votesCount: 8234,
    totalVoters: 12458,
    image: 'https://images.unsplash.com/photo-1597700331582-aab3614b3c0c?w=800'
  },
  {
    id: '2',
    name: 'State Governor Election',
    date: 'Nov 21, 2025',
    status: 'active',
    participants: 3,
    votesCount: 5432,
    totalVoters: 8900,
    image: 'https://images.unsplash.com/photo-1742888827024-6d85caf1d09b?w=800'
  },
];

const historyElections: Election[] = [
  {
    id: '3',
    name: 'Municipal Council Election',
    date: 'Oct 15, 2025',
    status: 'completed',
    participants: 8,
    votesCount: 7234,
    totalVoters: 7500,
    image: 'https://images.unsplash.com/photo-1638501479049-de7a4100b4a4?w=800'
  },
  {
    id: '4',
    name: 'School Board Election',
    date: 'Sep 10, 2025',
    status: 'completed',
    participants: 5,
    votesCount: 4123,
    totalVoters: 5000,
    image: 'https://images.unsplash.com/photo-1624895608078-e9f564cbe3fa?w=800'
  },
];

export function NewDashboard({ onNavigate, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);

  if (selectedElection) {
    return (
      <div>
        <DashboardHeader onLogout={onLogout} />
        <ElectionDetail 
          electionName={selectedElection.name} 
          onBack={() => setSelectedElection(null)} 
        />
      </div>
    );
  }

  const currentElections = activeTab === 'active' ? activeElections : historyElections;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6FA] via-white to-[#3E7BFA]/5">
      <DashboardHeader onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-2">Welcome Back, Administrator</h1>
          <p className="text-[#6B6B6B]">Monitor and manage all voting operations from your dashboard</p>
        </motion.div>

        {/* Quick Actions - 2x2 Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Users,
                title: 'Create Voter',
                description: 'Register new voter in system',
                color: '#3E7BFA',
                screen: 'create-voter',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
              },
              {
                icon: Fingerprint,
                title: 'Register Palm',
                description: 'Enroll biometric data',
                color: '#0ACF83',
                screen: 'voter-list',
                image: 'https://images.unsplash.com/photo-1624895608078-e9f564cbe3fa?w=400'
              },
              {
                icon: CalendarCheck,
                title: 'Create Election',
                description: 'Setup new voting event',
                color: '#FFC107',
                screen: 'create-election',
                image: 'https://images.unsplash.com/photo-1597700331582-aab3614b3c0c?w=400'
              },
              {
                icon: Vote,
                title: 'View Results',
                description: 'Analyze voting outcomes',
                color: '#FF4D4F',
                screen: 'results',
                image: 'https://images.unsplash.com/photo-1638501479049-de7a4100b4a4?w=400'
              }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => onNavigate(action.screen)}
                    className="w-full h-full text-left group"
                  >
                    <Card hover className="h-full relative overflow-hidden">
                      {/* Background gradient overlay */}
                      <div 
                        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                        style={{ background: `linear-gradient(135deg, ${action.color} 0%, transparent 100%)` }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-start gap-4 mb-4">
                          <motion.div
                            className="p-3 rounded-xl flex-shrink-0"
                            style={{ backgroundColor: `${action.color}20` }}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon className="w-6 h-6" style={{ color: action.color }} />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="mb-1 group-hover:text-[#3E7BFA] transition-colors">
                              {action.title}
                            </h4>
                            <p className="text-sm text-[#6B6B6B]">{action.description}</p>
                          </div>
                        </div>
                        
                        {/* Small preview image */}
                        <div className="relative h-32 -mx-6 -mb-6 mt-4 overflow-hidden rounded-b-2xl">
                          <ImageWithFallback
                            src={action.image}
                            alt={action.title}
                            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                        </div>
                      </div>
                    </Card>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Elections Section with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Tabs Header */}
          <div className="flex items-center gap-2 mb-6">
            <motion.button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-[#3E7BFA] to-[#2D5FD8] text-white shadow-lg shadow-[#3E7BFA]/30'
                  : 'bg-white text-[#6B6B6B] hover:bg-[#F4F6FA]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Active Elections
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-[#3E7BFA] to-[#2D5FD8] text-white shadow-lg shadow-[#3E7BFA]/30'
                  : 'bg-white text-[#6B6B6B] hover:bg-[#F4F6FA]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                History
              </div>
            </motion.button>
          </div>

          {/* Elections List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: activeTab === 'active' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'active' ? -20 : 20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {currentElections.length > 0 ? (
                currentElections.map((election, index) => {
                  const turnout = ((election.votesCount / election.totalVoters) * 100).toFixed(1);
                  return (
                    <motion.div
                      key={election.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => setSelectedElection(election)}
                        className="w-full text-left group"
                      >
                        <Card hover className="overflow-hidden">
                          {/* Election Image */}
                          <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                            <ImageWithFallback
                              src={election.image}
                              alt={election.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4">
                              <div className={`px-3 py-1 rounded-full text-sm backdrop-blur-md ${
                                election.status === 'active'
                                  ? 'bg-[#0ACF83]/90 text-white'
                                  : 'bg-[#6B6B6B]/90 text-white'
                              }`}>
                                {election.status === 'active' ? '● Live' : '✓ Completed'}
                              </div>
                            </div>

                            {/* Title Overlay */}
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-white mb-1">{election.name}</h3>
                              <div className="flex items-center gap-2 text-white/90">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{election.date}</span>
                              </div>
                            </div>
                          </div>

                          {/* Election Stats */}
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-[#F4F6FA] rounded-xl">
                              <div className="flex items-center justify-center gap-1 text-[#3E7BFA] mb-1">
                                <Users className="w-4 h-4" />
                                <span>{election.participants}</span>
                              </div>
                              <small className="text-[#6B6B6B]">Candidates</small>
                            </div>
                            
                            <div className="text-center p-3 bg-[#F4F6FA] rounded-xl">
                              <div className="flex items-center justify-center gap-1 text-[#0ACF83] mb-1">
                                <Vote className="w-4 h-4" />
                                <span>{election.votesCount.toLocaleString()}</span>
                              </div>
                              <small className="text-[#6B6B6B]">Votes Cast</small>
                            </div>
                            
                            <div className="text-center p-3 bg-[#F4F6FA] rounded-xl">
                              <div className="flex items-center justify-center gap-1 text-[#FFC107] mb-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>{turnout}%</span>
                              </div>
                              <small className="text-[#6B6B6B]">Turnout</small>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <small className="text-[#6B6B6B]">Voting Progress</small>
                              <small className="text-[#3E7BFA]">
                                {election.votesCount.toLocaleString()} / {election.totalVoters.toLocaleString()}
                              </small>
                            </div>
                            <div className="bg-[#E5E5E5] rounded-full h-2 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-[#3E7BFA] to-[#0ACF83]"
                                initial={{ width: 0 }}
                                animate={{ width: `${turnout}%` }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 1 }}
                              />
                            </div>
                          </div>

                          {/* View Details Link */}
                          <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                            <div className="flex items-center justify-between text-[#3E7BFA] group-hover:gap-3 transition-all">
                              <span>View Full Details & Analytics</span>
                              <motion.span
                                className="text-xl"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            </div>
                          </div>
                        </Card>
                      </button>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  className="col-span-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="text-center py-12">
                    <div className="w-16 h-16 bg-[#F4F6FA] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-[#6B6B6B]" />
                    </div>
                    <h3 className="mb-2">No {activeTab} elections</h3>
                    <p className="text-[#6B6B6B]">
                      {activeTab === 'active' 
                        ? 'Create a new election to get started'
                        : 'Completed elections will appear here'
                      }
                    </p>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
