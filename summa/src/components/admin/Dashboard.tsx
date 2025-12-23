import React from 'react';
import { Card } from '../Card';
import { Users, Vote, CalendarCheck, Fingerprint } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

const statsData = [
  { label: 'Total Voters', value: '12,458', icon: Users, color: '#3E7BFA' },
  { label: 'Total Votes Cast', value: '8,234', icon: Vote, color: '#0ACF83' },
  { label: 'Active Elections', value: '3', icon: CalendarCheck, color: '#FFC107' },
  { label: 'Palm Templates', value: '11,892', icon: Fingerprint, color: '#FF4D4F' }
];

const votesPerCandidate = [
  { name: 'Sarah Johnson', votes: 3200 },
  { name: 'Michael Chen', votes: 2800 },
  { name: 'David Kumar', votes: 1500 },
  { name: 'Lisa Wang', votes: 734 }
];

const voterActivity = [
  { name: 'Registered', value: 12458, color: '#3E7BFA' },
  { name: 'Voted', value: 8234, color: '#0ACF83' },
  { name: 'Pending', value: 4224, color: '#FFC107' }
];

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8"
        >
          <h1 className="mb-2">Admin Dashboard</h1>
          <p className="text-[#6B6B6B]">Monitor and manage voting operations</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
              >
                <Card hover>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[#6B6B6B] mb-2">{stat.label}</p>
                      <motion.h2
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        {stat.value}
                      </motion.h2>
                    </div>
                    <motion.div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${stat.color}20` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <h3 className="mb-6">Votes Per Candidate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={votesPerCandidate}>
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

          <motion.div variants={itemVariants}>
            <Card>
              <h3 className="mb-6">Voter Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={voterActivity}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {voterActivity.map((entry, index) => (
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
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card>
            <h3 className="mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, label: 'Create Voter', screen: 'create-voter', color: '#3E7BFA' },
                { icon: Fingerprint, label: 'Register Palm', screen: 'voter-list', color: '#0ACF83' },
                { icon: CalendarCheck, label: 'Create Election', screen: 'create-election', color: '#FFC107' },
                { icon: Vote, label: 'View Results', screen: 'results', color: '#FF4D4F' }
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button 
                    key={action.label}
                    onClick={() => onNavigate(action.screen)}
                    className="p-4 md:p-6 border-2 border-[#E5E5E5] rounded-xl hover:border-[#3E7BFA] transition-all duration-300 group"
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                      style={{ backgroundColor: `${action.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6" style={{ color: action.color }} />
                    </motion.div>
                    <p className="group-hover:text-[#3E7BFA] transition-colors duration-300">{action.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}