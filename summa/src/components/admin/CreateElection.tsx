import React, { useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { StatusChip } from '../StatusChip';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Candidate {
  id: string;
  name: string;
  party: string;
  city: string;
}

interface CreateElectionProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function CreateElection({ onBack, onSuccess }: CreateElectionProps) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState<'draft' | 'active'>('draft');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  
  // New candidate form
  const [newCandidateName, setNewCandidateName] = useState('');
  const [newCandidateParty, setNewCandidateParty] = useState('');
  const [newCandidateCity, setNewCandidateCity] = useState('');

  const addCandidate = () => {
    if (newCandidateName && newCandidateParty && newCandidateCity) {
      const newCandidate: Candidate = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCandidateName,
        party: newCandidateParty,
        city: newCandidateCity
      };
      setCandidates([...candidates, newCandidate]);
      setNewCandidateName('');
      setNewCandidateParty('');
      setNewCandidateCity('');
      setShowAddCandidate(false);
    }
  };

  const removeCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
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

          <div className="mb-8">
            <h1 className="mb-2">Create New Election</h1>
            <p className="text-[#6B6B6B]">Set up a new election and add candidates</p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Election Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h3 className="mb-6">Election Details</h3>
              <div className="space-y-6">
                <Input
                  label="Election Name"
                  type="text"
                  value={name}
                  onChange={setName}
                  required
                  placeholder="e.g., 2025 General Election"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Start Date"
                    type="datetime-local"
                    value={startDate}
                    onChange={setStartDate}
                    required
                  />

                  <Input
                    label="End Date"
                    type="datetime-local"
                    value={endDate}
                    onChange={setEndDate}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-3">Status</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStatus('draft')}
                      className={`px-6 py-3 rounded-xl border-2 transition-all ${
                        status === 'draft'
                          ? 'border-[#3E7BFA] bg-[#3E7BFA]/10'
                          : 'border-[#E5E5E5] hover:border-[#3E7BFA]/50'
                      }`}
                    >
                      <StatusChip status="draft">Draft</StatusChip>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus('active')}
                      className={`px-6 py-3 rounded-xl border-2 transition-all ${
                        status === 'active'
                          ? 'border-[#3E7BFA] bg-[#3E7BFA]/10'
                          : 'border-[#E5E5E5] hover:border-[#3E7BFA]/50'
                      }`}
                    >
                      <StatusChip status="active">Active</StatusChip>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Candidates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3>Candidates ({candidates.length})</h3>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setShowAddCandidate(true)}
                  icon={<Plus className="w-5 h-5" />}
                >
                  Add Candidate
                </Button>
              </div>

              {/* Candidates List */}
              {candidates.length > 0 ? (
                <div className="space-y-3">
                  {candidates.map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      className="flex items-center justify-between p-4 bg-[#F4F6FA] rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div>
                        <p className="mb-1">{candidate.name}</p>
                        <p className="text-[#6B6B6B]">
                          {candidate.party} • {candidate.city}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="icon"
                        onClick={() => removeCandidate(candidate.id)}
                      >
                        <X className="w-4 h-4 text-[#FF4D4F]" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#6B6B6B]">
                  <p>No candidates added yet</p>
                  <p>Click "Add Candidate" to get started</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Submit */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button type="button" variant="secondary" onClick={onBack} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-1"
              disabled={candidates.length === 0}
            >
              Create Election
            </Button>
          </motion.div>
        </form>
      </div>

      {/* Add Candidate Modal */}
      <AnimatePresence>
        {showAddCandidate && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddCandidate(false)}
          >
            <motion.div
              className="w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card>
                <h3 className="mb-6">Add Candidate</h3>
                <div className="space-y-4">
                  <Input
                    label="Candidate Name"
                    type="text"
                    value={newCandidateName}
                    onChange={setNewCandidateName}
                    required
                  />
                  <Input
                    label="Party Name"
                    type="text"
                    value={newCandidateParty}
                    onChange={setNewCandidateParty}
                    required
                  />
                  <Input
                    label="City"
                    type="text"
                    value={newCandidateCity}
                    onChange={setNewCandidateCity}
                    required
                  />
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowAddCandidate(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={addCandidate}
                      className="flex-1"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
