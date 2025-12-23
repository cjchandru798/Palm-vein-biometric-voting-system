import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Input } from '../Input';
import { StatusChip } from '../StatusChip';
import { ArrowLeft, Search, Fingerprint, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface Voter {
  id: string;
  code: string;
  name: string;
  registered: boolean;
  city: string;
  mobile: string;
}

const mockVoters: Voter[] = [
  { id: '1', code: 'V8X2K9PL', name: 'Sarah Johnson', registered: true, city: 'New York', mobile: '+1 555-0123' },
  { id: '2', code: 'V3M7N4QW', name: 'Michael Chen', registered: true, city: 'San Francisco', mobile: '+1 555-0124' },
  { id: '3', code: 'V5R8T2YU', name: 'David Kumar', registered: false, city: 'Austin', mobile: '+1 555-0125' },
  { id: '4', code: 'V9P1L6HJ', name: 'Lisa Wang', registered: true, city: 'Seattle', mobile: '+1 555-0126' },
  { id: '5', code: 'V2K4M8VB', name: 'James Miller', registered: false, city: 'Boston', mobile: '+1 555-0127' },
  { id: '6', code: 'V7N3Q9ZX', name: 'Emma Davis', registered: true, city: 'Chicago', mobile: '+1 555-0128' }
];

interface VoterListProps {
  onBack: () => void;
  onRegisterPalm: (voter: Voter) => void;
}

export function VoterList({ onBack, onRegisterPalm }: VoterListProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredVoters = mockVoters.filter(voter =>
    voter.name.toLowerCase().includes(search.toLowerCase()) ||
    voter.code.toLowerCase().includes(search.toLowerCase()) ||
    voter.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
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
            <h1 className="mb-2">Voter List</h1>
            <p className="text-[#6B6B6B]">Manage voter registrations and palm authentication</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            {/* Search Bar */}
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Search by name, voter code, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#E5E5E5] rounded-xl focus:border-[#3E7BFA] focus:ring-4 focus:ring-[#3E7BFA]/25 outline-none transition-all"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F4F6FA] sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left rounded-tl-xl">Voter Code</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">City</th>
                    <th className="px-6 py-4 text-left">Mobile</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVoters.map((voter, index) => (
                    <motion.tr 
                      key={voter.id}
                      className="border-t border-[#E5E5E5] hover:bg-[#F4F6FA]/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <code className="text-[#3E7BFA]">{voter.code}</code>
                      </td>
                      <td className="px-6 py-4">{voter.name}</td>
                      <td className="px-6 py-4 text-[#6B6B6B]">{voter.city}</td>
                      <td className="px-6 py-4 text-[#6B6B6B]">{voter.mobile}</td>
                      <td className="px-6 py-4">
                        <StatusChip status={voter.registered ? 'done' : 'pending'}>
                          {voter.registered ? 'Registered' : 'Pending'}
                        </StatusChip>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {!voter.registered && (
                            <Button 
                              variant="primary" 
                              onClick={() => onRegisterPalm(voter)}
                              icon={<Fingerprint className="w-4 h-4" />}
                            >
                              Register Palm
                            </Button>
                          )}
                          <Button variant="icon" onClick={() => {}}>
                            <Eye className="w-4 h-4 text-[#6B6B6B]" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-[#6B6B6B]">
                Showing {filteredVoters.length} of {mockVoters.length} voters
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button variant="secondary">
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
