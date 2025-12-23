import { useState } from 'react';
import { UserCheck } from 'lucide-react';
import { api } from '../../services/api';

interface VoterLoginProps {
  onLogin: (voterCode: string, voter: any) => void;
}

export function VoterLogin({ onLogin }: VoterLoginProps) {
  const [voterCode, setVoterCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterCode) return;
    
    setError('');
    setLoading(true);
    
    try {
      const voter = await api.voter.login(voterCode);
      
      if (voter.hasVoted) {
        setError('You have already voted in this election');
        setLoading(false);
        return;
      }
      
      onLogin(voterCode, voter);
    } catch (err: any) {
      setError(err.message || 'Voter not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <UserCheck className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h2 className="text-center mb-2 text-gray-900">Voter Login</h2>
        <p className="text-center text-gray-600 mb-6">Enter your Voter ID to begin</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Voter ID Code</label>
            <input
              type="text"
              value={voterCode}
              onChange={(e) => setVoterCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., VTR123456"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Verifying...' : 'Continue to Palm Scan'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900">Next Step:</p>
          <p className="text-blue-800">Palm vein authentication</p>
        </div>
      </div>
    </div>
  );
}