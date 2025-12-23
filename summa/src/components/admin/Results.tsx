import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { ArrowLeft, Trophy, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const results = [
  { name: 'Sarah Johnson', votes: 3200, percentage: 38.9, color: '#3E7BFA' },
  { name: 'Michael Chen', votes: 2800, percentage: 34.0, color: '#0ACF83' },
  { name: 'David Kumar', votes: 1500, percentage: 18.2, color: '#FFC107' },
  { name: 'Lisa Wang', votes: 734, percentage: 8.9, color: '#FF4D4F' }
];

const activityTimeline = [
  { time: '08:00 AM', voters: 245 },
  { time: '10:00 AM', voters: 892 },
  { time: '12:00 PM', voters: 1453 },
  { time: '02:00 PM', voters: 2104 },
  { time: '04:00 PM', voters: 2876 },
  { time: '06:00 PM', voters: 3421 },
  { time: '08:00 PM', voters: 4234 }
];

interface ResultsProps {
  onBack: () => void;
}

export function Results({ onBack }: ResultsProps) {
  const winner = results[0];
  const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#3E7BFA] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="mb-2">Election Results</h1>
              <p className="text-[#6B6B6B]">2025 General Election</p>
            </div>
            <StatusChip status="completed">Completed</StatusChip>
          </div>
        </motion.div>

        {/* Winner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-[#3E7BFA]/10 to-[#0ACF83]/10 border-2 border-[#3E7BFA]/30">
            <div className="flex items-center gap-6">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              <div className="flex-1">
                <p className="text-[#6B6B6B] mb-1">Winner</p>
                <h2 className="mb-2">{winner.name}</h2>
                <div className="flex items-center gap-4">
                  <p className="text-[#3E7BFA]">{winner.votes.toLocaleString()} votes</p>
                  <p className="text-[#0ACF83]">{winner.percentage}%</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Vote Count */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="mb-6">Live Vote Count</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="name" stroke="#6B6B6B" />
                  <YAxis stroke="#6B6B6B" />
                  <Tooltip />
                  <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                    {results.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Detailed Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="mb-6">Detailed Results</h3>
              <div className="space-y-4">
                {results.map((candidate, index) => (
                  <motion.div
                    key={candidate.name}
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {index === 0 && <Trophy className="w-5 h-5 text-[#FFD700]" />}
                        <p>{candidate.name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-[#6B6B6B]">{candidate.votes.toLocaleString()}</p>
                        <p style={{ color: candidate.color }}>{candidate.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-[#E5E5E5] rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: candidate.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${candidate.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between">
                  <p className="text-[#6B6B6B]">Total Votes Cast</p>
                  <p>{totalVotes.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Voter Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-[#3E7BFA]" />
              <h3>Voter Activity Timeline</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activityTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="time" stroke="#6B6B6B" />
                <YAxis stroke="#6B6B6B" />
                <Tooltip />
                <Bar dataKey="voters" fill="#0ACF83" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Statistics Summary */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#0ACF83]" />
              <p className="text-[#6B6B6B]">Turnout Rate</p>
            </div>
            <h2 className="text-[#0ACF83]">66.1%</h2>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-[#FFC107]" />
              <p className="text-[#6B6B6B]">Winning Margin</p>
            </div>
            <h2 className="text-[#FFC107]">4.9%</h2>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#3E7BFA]" />
              <p className="text-[#6B6B6B]">Duration</p>
            </div>
            <h2 className="text-[#3E7BFA]">12 hours</h2>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
