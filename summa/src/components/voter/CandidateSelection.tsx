import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface Candidate {
  id: string;
  name: string;
  party: string;
  city: string;
  image: string;
}

const candidates: Candidate[] = [
  { id: '1', name: 'Sarah Johnson', party: 'Progressive Alliance', city: 'New York', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { id: '2', name: 'Michael Chen', party: 'Unity Party', city: 'San Francisco', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { id: '3', name: 'David Kumar', party: 'Democratic Front', city: 'Austin', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
  { id: '4', name: 'Lisa Wang', party: 'People First', city: 'Seattle', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' }
];

interface CandidateSelectionProps {
  onVote: (candidate: Candidate) => void;
}

export function CandidateSelection({ onVote }: CandidateSelectionProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (selectedCandidate) {
      onVote(selectedCandidate);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="mb-2">Select Your Candidate</h1>
          <p className="text-[#6B6B6B]">Choose the candidate you wish to vote for</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover onClick={() => handleSelect(candidate)}>
                <div className="text-center">
                  {/* Candidate Photo */}
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#E5E5E5]">
                    <ImageWithFallback
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Candidate Info */}
                  <h3 className="mb-2">{candidate.name}</h3>
                  <p className="text-[#6B6B6B] mb-1">{candidate.party}</p>
                  <p className="text-[#6B6B6B]">{candidate.city}</p>

                  {/* Select Button */}
                  <Button 
                    variant="primary" 
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(candidate);
                    }}
                  >
                    Select
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && selectedCandidate && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="max-w-md">
                <h2 className="mb-4">Confirm Your Vote</h2>
                <p className="text-[#6B6B6B] mb-6">
                  Are you sure you want to vote for{' '}
                  <span className="text-[#1A1A1A]">{selectedCandidate.name}</span> from{' '}
                  <span className="text-[#1A1A1A]">{selectedCandidate.party}</span>?
                </p>
                <p className="text-[#FF4D4F] mb-6">
                  ⚠️ This action cannot be undone. Your vote will be recorded permanently.
                </p>
                <div className="flex gap-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleConfirm}
                    className="flex-1"
                  >
                    Confirm Vote
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
