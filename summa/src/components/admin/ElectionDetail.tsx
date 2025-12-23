import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../Card';
import { ArrowLeft, Users, Vote, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Candidate {
  id: string;
  name: string;
  party: string;
  votes: number;
  percentage: number;
  image: string;
}

interface ElectionDetailProps {
  electionName: string;
  onBack: () => void;
}

const candidatesData: Candidate[] = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    party: 'Democratic Party', 
    votes: 3200, 
    percentage: 38.8,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  { 
    id: '2', 
    name: 'Michael Chen', 
    party: 'Republican Party', 
    votes: 2800, 
    percentage: 34.0,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  { 
    id: '3', 
    name: 'David Kumar', 
    party: 'Independent', 
    votes: 1500, 
    percentage: 18.2,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
  },
  { 
    id: '4', 
    name: 'Lisa Wang', 
    party: 'Green Party', 
    votes: 734, 
    percentage: 8.9,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  },
];

const votingTrend = [
  { time: '09:00', votes: 450 },
  { time: '10:00', votes: 820 },
  { time: '11:00', votes: 1200 },
  { time: '12:00', votes: 1850 },
  { time: '13:00', votes: 2400 },
  { time: '14:00', votes: 3100 },
  { time: '15:00', votes: 4200 },
  { time: '16:00', votes: 5800 },
  { time: '17:00', votes: 7200 },
  { time: '18:00', votes: 8234 },
];

const demographicData = [
  { name: '18-25', value: 1234, color: '#3E7BFA' },
  { name: '26-35', value: 2456, color: '#0ACF83' },
  { name: '36-50', value: 2876, color: '#FFC107' },
  { name: '51+', value: 1668, color: '#FF4D4F' },
];

export function ElectionDetail({ electionName, onBack }: ElectionDetailProps) {
  const totalVotes = candidatesData.reduce((sum, c) => sum + c.votes, 0);
  const totalRegistered = 12458;
  const turnout = ((totalVotes / totalRegistered) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F6FA] via-white to-[#3E7BFA]/5 pb-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#3E7BFA] transition-colors duration-300 mb-6"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </motion.button>

        {/* Election Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="mb-2">{electionName}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                  <Calendar className="w-4 h-4" />
                  <span>November 21, 2025</span>
                </div>
                <div className="px-3 py-1 bg-[#0ACF83]/10 text-[#0ACF83] rounded-full">
                  Active
                </div>
              </div>
            </div>
            <motion.div
              className="text-right"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <p className="text-[#6B6B6B] mb-1">Voter Turnout</p>
              <h2 className="text-[#3E7BFA]">{turnout}%</h2>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {[
            { label: 'Total Votes Cast', value: totalVotes.toLocaleString(), icon: Vote, color: '#3E7BFA' },
            { label: 'Registered Voters', value: totalRegistered.toLocaleString(), icon: Users, color: '#0ACF83' },
            { label: 'Leading Candidate', value: candidatesData[0].name.split(' ')[0], icon: TrendingUp, color: '#FFC107' },
            { label: 'Total Candidates', value: candidatesData.length.toString(), icon: Users, color: '#FF4D4F' }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Card hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#6B6B6B] text-sm mb-1">{stat.label}</p>
                      <h3>{stat.value}</h3>
                    </div>
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Candidates Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="mb-6">Participating Candidates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidatesData.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  className="flex items-center gap-4 p-4 border-2 border-[#E5E5E5] rounded-xl hover:border-[#3E7BFA] transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <ImageWithFallback
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="mb-1">{candidate.name}</h4>
                    <p className="text-sm text-[#6B6B6B] mb-2">{candidate.party}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#E5E5E5] rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#3E7BFA] to-[#0ACF83]"
                          initial={{ width: 0 }}
                          animate={{ width: `${candidate.percentage}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        />
                      </div>
                      <span className="text-sm">{candidate.percentage}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#3E7BFA]">{candidate.votes.toLocaleString()}</p>
                    <small className="text-[#6B6B6B]">votes</small>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Voting Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h3 className="mb-6">Voting Trend (Today)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={votingTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="time" stroke="#6B6B6B" />
                  <YAxis stroke="#6B6B6B" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="votes" 
                    stroke="#3E7BFA" 
                    strokeWidth={3}
                    dot={{ fill: '#3E7BFA', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Vote Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h3 className="mb-6">Vote Distribution by Candidate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={candidatesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="name" stroke="#6B6B6B" />
                  <YAxis stroke="#6B6B6B" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="votes" fill="#3E7BFA" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Demographics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h3 className="mb-6">Voter Demographics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Geographic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h3 className="mb-6">Top Voting Regions</h3>
              <div className="space-y-4">
                {[
                  { city: 'New York', votes: 2145, percentage: 26.1 },
                  { city: 'Los Angeles', votes: 1876, percentage: 22.8 },
                  { city: 'Chicago', votes: 1543, percentage: 18.7 },
                  { city: 'Houston', votes: 1298, percentage: 15.8 },
                  { city: 'Phoenix', votes: 1372, percentage: 16.7 },
                ].map((region, index) => (
                  <motion.div
                    key={region.city}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span>{region.city}</span>
                        <span className="text-sm text-[#6B6B6B]">{region.votes.toLocaleString()}</span>
                      </div>
                      <div className="bg-[#E5E5E5] rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#3E7BFA] to-[#0ACF83]"
                          initial={{ width: 0 }}
                          animate={{ width: `${region.percentage}%` }}
                          transition={{ delay: 0.8 + index * 0.05, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
