import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { api } from '../../services/api';

interface AddVoterProps {
  onBack: () => void;
}

export function AddVoter({ onBack }: AddVoterProps) {
  const [formData, setFormData] = useState({
    name: '',
    voterCode: '',
    mobile: '',
    dob: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert date string to ISO 8601 datetime
      const payload = {
        ...formData,
        dob: formData.dob ? `${formData.dob}T00:00:00` : null
      };

      await api.admin.createVoter(payload);

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', voterCode: '', mobile: '', dob: '' });
      }, 2000);
    } catch (err: any) {
      // Show backend error if available
      setError(err.response?.data || err.message || 'Failed to add voter');
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
          <h2 className="mb-6 text-gray-900">Add New Voter</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter full name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Voter ID Code *</label>
                <input
                  type="text"
                  required
                  value={formData.voterCode}
                  onChange={(e) => setFormData({ ...formData, voterCode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., VTR123456"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="10-digit mobile number"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitted || loading}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-green-500 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Voter Added Successfully
                  </>
                ) : loading ? (
                  'Adding Voter...'
                ) : (
                  'Add Voter'
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

          {submitted && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                Voter registered successfully! You can now register palm vein templates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
