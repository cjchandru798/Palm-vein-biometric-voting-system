import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Vote, UserPlus, Calendar, BarChart3 } from 'lucide-react';
import { AddVoter } from './admin/AddVoter';
import { RegisterPalm } from './admin/RegisterPalm';
import { CreateElection } from './admin/CreateElection';
import { AddCandidate } from './admin/AddCandidate';
import { ViewResults } from './admin/ViewResults';
import { api } from '../services/api';

interface AdminDashboardProps {
  onBack: () => void;
}

type AdminView = 'dashboard' | 'add-voter' | 'register-palm' | 'create-election' | 'add-candidate' | 'view-results';

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [view, setView] = useState<AdminView>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({
    totalVoters: 0,
    activeElections: 0,
    votesCount: 0
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadStats();
    }
  }, [isLoggedIn]);

  const loadStats = async () => {
    try {
      const [voters, elections] = await Promise.all([
        api.admin.getAllVoters(),
        api.admin.getAllElections()
      ]);
      
      const activeElections = elections.filter((e: any) => e.status === 'ACTIVE').length;
      const votedCount = voters.filter((v: any) => v.hasVoted).length;
      
      setStats({
        totalVoters: voters.length,
        activeElections: activeElections,
        votesCount: votedCount
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await api.admin.login(username, password);
      setIsLoggedIn(true);
    } catch (err) {
      setError('Invalid credentials. Use admin1/admin123');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Users className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-center mb-6 text-gray-900">Admin Login</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter username"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-center">Demo credentials:</p>
            <p className="text-gray-700 text-center">admin1 / admin123</p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'add-voter') {
    return <AddVoter onBack={() => { setView('dashboard'); loadStats(); }} />;
  }

  if (view === 'register-palm') {
    return <RegisterPalm onBack={() => setView('dashboard')} />;
  }

  if (view === 'create-election') {
    return <CreateElection onBack={() => { setView('dashboard'); loadStats(); }} />;
  }

  if (view === 'add-candidate') {
    return <AddCandidate onBack={() => setView('dashboard')} />;
  }

  if (view === 'view-results') {
    return <ViewResults onBack={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <p className="text-gray-600">Logged in as <span className="text-indigo-600">{username}</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="mb-2 text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage voters, elections, and view results</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">Total Voters</p>
                <p className="text-gray-900">{stats.totalVoters}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Vote className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">Active Elections</p>
                <p className="text-gray-900">{stats.activeElections}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600">Votes Cast</p>
                <p className="text-gray-900">{stats.votesCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => setView('add-voter')}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <UserPlus className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-gray-900">Add Voter</h3>
            </div>
            <p className="text-gray-600">Register new voter with personal details</p>
          </button>

          <button
            onClick={() => setView('register-palm')}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-gray-900">Register Palm</h3>
            </div>
            <p className="text-gray-600">Capture and register palm vein templates</p>
          </button>

          <button
            onClick={() => setView('create-election')}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-gray-900">Create Election</h3>
            </div>
            <p className="text-gray-600">Set up new election event</p>
          </button>

          <button
            onClick={() => setView('add-candidate')}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900">Add Candidate</h3>
            </div>
            <p className="text-gray-600">Add candidates to elections</p>
          </button>

          <button
            onClick={() => setView('view-results')}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900">View Results</h3>
            </div>
            <p className="text-gray-600">Live election results and analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}