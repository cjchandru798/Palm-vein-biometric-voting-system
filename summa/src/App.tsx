import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { NewDashboard } from './components/admin/NewDashboard';
import { CreateVoter } from './components/admin/CreateVoter';
import { VoterList } from './components/admin/VoterList';
import { PalmRegistration } from './components/admin/PalmRegistration';
import { CreateElection } from './components/admin/CreateElection';
import { Results } from './components/admin/Results';

// Voter Components
import { VoterLogin } from './components/voter/VoterLogin';
import { QKDSession } from './components/voter/QKDSession';
import { PalmScan } from './components/voter/PalmScan';
import { IdentityVerified } from './components/voter/IdentityVerified';
import { CandidateSelection } from './components/voter/CandidateSelection';
import { VoteSuccess } from './components/voter/VoteSuccess';
import { ErrorScreen } from './components/voter/ErrorScreen';

type AppMode = 'landing' | 'admin' | 'voter';
type AdminScreen = 'login' | 'dashboard' | 'create-voter' | 'voter-list' | 'palm-registration' | 'create-election' | 'results';
type VoterScreen = 'login' | 'qkd-session' | 'palm-scan' | 'identity-verified' | 'candidate-selection' | 'vote-success' | 'error';

interface Voter {
  id: string;
  code: string;
  name: string;
  registered: boolean;
  city: string;
  mobile: string;
}

interface Candidate {
  id: string;
  name: string;
  party: string;
  city: string;
  image: string;
}

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('landing');
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('login');
  const [voterScreen, setVoterScreen] = useState<VoterScreen>('login');
  const [currentVoter, setCurrentVoter] = useState<Voter | null>(null);
  const [voterId, setVoterId] = useState('');
  const [voterName, setVoterName] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [errorType, setErrorType] = useState<'invalid-palm' | 'already-voted' | 'session-expired'>('invalid-palm');

  // Page transition variants
  const pageTransition = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  // Landing Screen
  if (appMode === 'landing') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-[#3E7BFA]/10 via-[#F4F6FA] to-[#0ACF83]/10 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-[#3E7BFA]/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#0ACF83]/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="max-w-4xl w-full relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h1
              className="mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Quantum-Secured Voting System
            </motion.h1>
            <motion.p
              className="text-[#6B6B6B]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Palm vein biometric authentication with quantum key distribution
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              className="p-8 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all"
              onClick={() => {
                setAppMode('admin');
                setAdminScreen('login');
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-[#3E7BFA]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#3E7BFA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="mb-2">Admin Portal</h3>
              <p className="text-[#6B6B6B]">Manage voters, elections, and results</p>
            </motion.button>

            <motion.button
              className="p-8 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all"
              onClick={() => {
                setAppMode('voter');
                setVoterScreen('login');
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-[#0ACF83]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#0ACF83]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2">Voter Portal</h3>
              <p className="text-[#6B6B6B]">Cast your secure vote</p>
            </motion.button>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <small className="text-[#6B6B6B]">
              Quantum-Secured Voting System 2025 | Government-Grade Security
            </small>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Admin Portal
  if (appMode === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F6FA] via-white to-[#3E7BFA]/5">
        <AnimatePresence mode="wait">
          {adminScreen === 'login' && (
            <motion.div
              key="admin-login"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <AdminLogin onLogin={() => setAdminScreen('dashboard')} />
            </motion.div>
          )}
          {adminScreen === 'dashboard' && (
            <motion.div
              key="dashboard"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <NewDashboard 
                onNavigate={(screen) => setAdminScreen(screen as AdminScreen)}
                onLogout={() => {
                  setAppMode('landing');
                  setAdminScreen('login');
                }}
              />
            </motion.div>
          )}
          {adminScreen === 'create-voter' && (
            <motion.div
              key="create-voter"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <CreateVoter 
                onBack={() => setAdminScreen('dashboard')}
                onSuccess={() => setAdminScreen('dashboard')}
              />
            </motion.div>
          )}
          {adminScreen === 'voter-list' && (
            <motion.div
              key="voter-list"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <VoterList 
                onBack={() => setAdminScreen('dashboard')}
                onRegisterPalm={(voter) => {
                  setCurrentVoter(voter);
                  setAdminScreen('palm-registration');
                }}
              />
            </motion.div>
          )}
          {adminScreen === 'palm-registration' && currentVoter && (
            <motion.div
              key="palm-registration"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <PalmRegistration
                voterName={currentVoter.name}
                voterCode={currentVoter.code}
                onBack={() => setAdminScreen('voter-list')}
                onComplete={() => setAdminScreen('voter-list')}
              />
            </motion.div>
          )}
          {adminScreen === 'create-election' && (
            <motion.div
              key="create-election"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <CreateElection
                onBack={() => setAdminScreen('dashboard')}
                onSuccess={() => setAdminScreen('dashboard')}
              />
            </motion.div>
          )}
          {adminScreen === 'results' && (
            <motion.div
              key="results"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <Results
                onBack={() => setAdminScreen('dashboard')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Voter Portal
  if (appMode === 'voter') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3E7BFA]/5 via-[#F4F6FA] to-[#0ACF83]/5">
        <AnimatePresence mode="wait">
          {voterScreen === 'login' && (
            <motion.div
              key="voter-login"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <VoterLogin onLogin={(id) => {
                setVoterId(id);
                setVoterScreen('qkd-session');
              }} />
            </motion.div>
          )}
          {voterScreen === 'qkd-session' && (
            <motion.div
              key="qkd-session"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <QKDSession onComplete={() => setVoterScreen('palm-scan')} />
            </motion.div>
          )}
          {voterScreen === 'palm-scan' && (
            <motion.div
              key="palm-scan"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <PalmScan 
                voterId={voterId}
                onSuccess={(name) => {
                  setVoterName(name);
                  setVoterScreen('identity-verified');
                }}
                onError={(error) => {
                  setErrorType('invalid-palm');
                  setVoterScreen('error');
                }}
              />
            </motion.div>
          )}
          {voterScreen === 'identity-verified' && (
            <motion.div
              key="identity-verified"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <IdentityVerified
                voterName={voterName}
                voterCode={voterId}
                onProceed={() => setVoterScreen('candidate-selection')}
              />
            </motion.div>
          )}
          {voterScreen === 'candidate-selection' && (
            <motion.div
              key="candidate-selection"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <CandidateSelection
                onVote={(candidate) => {
                  setSelectedCandidate(candidate);
                  setVoterScreen('vote-success');
                }}
              />
            </motion.div>
          )}
          {voterScreen === 'vote-success' && selectedCandidate && (
            <motion.div
              key="vote-success"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <VoteSuccess
                candidateName={selectedCandidate.name}
                voteId={'VT' + Math.random().toString(36).substr(2, 12).toUpperCase()}
                timestamp={new Date().toLocaleString()}
                onExit={() => {
                  setAppMode('landing');
                  setVoterScreen('login');
                  setVoterId('');
                  setVoterName('');
                  setSelectedCandidate(null);
                }}
              />
            </motion.div>
          )}
          {voterScreen === 'error' && (
            <motion.div
              key="error"
              {...pageTransition}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <ErrorScreen
                type={errorType}
                onRetry={() => setVoterScreen('palm-scan')}
                onExit={() => {
                  setAppMode('landing');
                  setVoterScreen('login');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}