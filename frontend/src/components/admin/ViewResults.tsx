import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';

interface ViewResultsProps {
  onBack: () => void;
}

export function ViewResults({ onBack }: ViewResultsProps) {
  const [elections, setElections] = useState<any[]>([]);
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    setLoading(true);
    try {
      const data = await api.admin.getAllElections();
      setElections(data);
      if (data.length > 0) {
        setSelectedElection(data[0]);
        loadCandidates(data[0].electionId);
      }
    } catch (err) {
      console.error('Failed to load elections:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCandidates = async (electionId: string) => {
    // Since there's no direct endpoint to get candidates by election,
    // we'll fetch from the election object (if available) or use mock data
    // In production, you'd add a GET /api/elections/{id}/candidates endpoint
    try {
      const elections = await api.admin.getAllElections();
      const election = elections.find((e: any) => e.electionId === electionId);
      if (election && election.candidates) {
        setCandidates(election.candidates);
      } else {
        setCandidates([]);
      }
    } catch (err) {
      console.error('Failed to load candidates:', err);
      setCandidates([]);
    }
  };

  const handleElectionChange = (electionId: string) => {
    const election = elections.find((e) => e.electionId === electionId);
    setSelectedElection(election);
    if (election) {
      loadCandidates(election.electionId);
    }
  };

  const totalVotes = candidates.reduce((sum, c) => sum + (c.votesCount || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading results...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="mb-4 text-gray-900">Live Election Results</h2>
            
            {elections.length > 0 ? (
              <div>
                <label className="block text-gray-700 mb-2">Select Election:</label>
                <select
                  value={selectedElection?.electionId || ''}
                  onChange={(e) => handleElectionChange(e.target.value)}
                  className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {elections.map((election) => (
                    <option key={election.electionId} value={election.electionId}>
                      {election.title} ({election.status})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-gray-600">No elections found</p>
            )}
          </div>

          {selectedElection && (
            <>
              <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-indigo-900">Total Votes Cast:</span>
                  <span className="text-indigo-900">{totalVotes.toLocaleString()}</span>
                </div>
              </div>

              {candidates.length > 0 ? (
                <div className="space-y-4">
                  {candidates
                    .sort((a, b) => (b.votesCount || 0) - (a.votesCount || 0))
                    .map((candidate, index) => {
                      const percentage = totalVotes > 0 
                        ? ((candidate.votesCount || 0) / totalVotes * 100).toFixed(2)
                        : '0.00';
                      return (
                        <div key={candidate.candidateId} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-gray-900">
                                  {index === 0 && totalVotes > 0 && '🏆 '}
                                  {candidate.leaderName}
                                </span>
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                                  {candidate.partyName}
                                </span>
                              </div>
                              <p className="text-gray-600">{candidate.city}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-900">{(candidate.votesCount || 0).toLocaleString()}</p>
                              <p className="text-gray-600">{percentage}%</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                index === 0 ? 'bg-green-500' : 'bg-indigo-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No candidates found for this election</p>
                  <p className="text-gray-500 mt-2">Add candidates to see results</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-center">
                  Results are updated in real-time as votes are cast
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
