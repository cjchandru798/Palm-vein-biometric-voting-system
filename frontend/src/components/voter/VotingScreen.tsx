import { useState, useEffect } from 'react';
import { Vote, Check } from 'lucide-react';
import { api } from '../../services/api';

interface VotingScreenProps {
  voterCode: string;
  onVoteCast: (candidate: any, response: string) => void;
}

export function VotingScreen({ voterCode, onVoteCast }: VotingScreenProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [elections, setElections] = useState<any[]>([]);
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const data = await api.admin.getAllElections();
      const active = data.filter((e: any) => e.status === 'ACTIVE');
      setElections(active);
      if (active.length > 0) {
        setSelectedElection(active[0]);
        // In real implementation, fetch candidates from backend
        // For now, using mock data or empty array
        setCandidates([]);
      }
    } catch (err) {
      console.error('Failed to load elections:', err);
      setError('Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowConfirm(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedElection || !selectedCandidate) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await api.voter.castVote(
        voterCode,
        selectedElection.electionId,
        selectedCandidate.candidateId
      );
      onVoteCast(selectedCandidate, response);
    } catch (err: any) {
      setError(err.message || 'Failed to cast vote');
      setLoading(false);
      setShowConfirm(false);
    }
  };

  // Mock candidates for demonstration (since backend might not have any yet)
  const mockCandidates = [
    { candidateId: '1', leaderName: 'Rajesh Kumar', partyName: 'Progressive Party', city: 'Mumbai', symbol: '🌟' },
    { candidateId: '2', leaderName: 'Priya Sharma', partyName: 'National Alliance', city: 'Mumbai', symbol: '🔥' },
    { candidateId: '3', leaderName: 'Amit Patel', partyName: 'People\'s Front', city: 'Mumbai', symbol: '🌊' },
    { candidateId: '4', leaderName: 'Sunita Reddy', partyName: 'Democratic Union', city: 'Mumbai', symbol: '🌺' }
  ];

  const displayCandidates = candidates.length > 0 ? candidates : mockCandidates;

  if (loading && !showConfirm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading candidates...</div>
      </div>
    );
  }

  if (showConfirm && selectedCandidate) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-center mb-6 text-gray-900">Confirm Your Vote</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl p-6 mb-6">
            <div className="text-center mb-4">
              <span className="text-6xl">{selectedCandidate.symbol}</span>
            </div>
            <h3 className="text-center mb-2 text-gray-900">{selectedCandidate.leaderName}</h3>
            <p className="text-center text-gray-700">{selectedCandidate.partyName}</p>
            <p className="text-center text-gray-600">{selectedCandidate.city}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
            <p className="text-yellow-900 text-center">
              ⚠️ Once confirmed, your vote cannot be changed
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleConfirmVote}
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
              <Check className="w-5 h-5" />
              {loading ? 'Casting Vote...' : 'Confirm & Cast Vote'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              disabled={loading}
              className="w-full bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Vote className="w-8 h-8 text-indigo-600" />
            <h1 className="text-gray-900">Cast Your Vote</h1>
          </div>
          <p className="text-center text-gray-600">
            {selectedElection ? selectedElection.title : 'General Elections 2025'} - Mumbai Constituency
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {displayCandidates.map((candidate: any) => (
            <button
              key={candidate.candidateId}
              onClick={() => handleSelect(candidate)}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-indigo-500 text-left"
            >
              <div className="flex items-start gap-6">
                <div className="text-6xl">{candidate.symbol || '👤'}</div>
                <div className="flex-1">
                  <h3 className="mb-2 text-gray-900">{candidate.leaderName}</h3>
                  <p className="text-gray-700 mb-1">{candidate.partyName}</p>
                  <p className="text-gray-600">{candidate.city}</p>
                  <div className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg inline-block">
                    Select Candidate
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-900">Select a candidate to proceed with voting</p>
        </div>
      </div>
    </div>
  );
}