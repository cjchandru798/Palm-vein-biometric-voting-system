import { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { api } from '../../services/api';

interface AddCandidateProps {
  onBack: () => void;
}

export function AddCandidate({ onBack }: AddCandidateProps) {
  const [elections, setElections] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    election: '',
    leaderName: '',
    partyName: '',
    city: ''
  });
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const data = await api.admin.getAllElections();
      setElections(data.filter((e: any) => e.status === 'ACTIVE'));
    } catch (err) {
      console.error('Failed to load elections:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const candidateData = {
        leaderName: formData.leaderName,
        partyName: formData.partyName,
        city: formData.city
      };
      
      await api.admin.addCandidate(formData.election, candidateData);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        setFormData({ ...formData, leaderName: '', partyName: '', city: '' });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to add candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="mb-6 text-gray-900">Add Candidate</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Select Election *</label>
              <select
                required
                value={formData.election}
                onChange={(e) => setFormData({ ...formData, election: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              >
                <option value="">Choose an election</option>
                {elections.map((election) => (
                  <option key={election.electionId} value={election.electionId}>
                    {election.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Leader Name *</label>
                <input
                  type="text"
                  required
                  value={formData.leaderName}
                  onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter candidate name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Party Name *</label>
                <input
                  type="text"
                  required
                  value={formData.partyName}
                  onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter party name"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">City/Constituency *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter city or constituency"
                disabled={loading}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={added || loading}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-green-500 flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Candidate Added
                  </>
                ) : loading ? (
                  'Adding Candidate...'
                ) : (
                  'Add Candidate'
                )}
              </button>
              <button
                type="button"
                onClick={onBack}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>

          {added && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                Candidate added successfully to the election!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}