import React, { useState } from 'react';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

interface CreateVoterProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function CreateVoter({ onBack, onSuccess }: CreateVoterProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [voterCode, setVoterCode] = useState('');

  const generateVoterCode = () => {
    const code = 'V' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setVoterCode(code);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-[#F4F6FA] via-white to-[#3E7BFA]/5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#3E7BFA] mb-6 transition-colors duration-300"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </motion.button>

          <div className="mb-8">
            <h1 className="mb-2">Create New Voter</h1>
            <p className="text-[#6B6B6B]">Register a new voter in the system</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <Input
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={setName}
                    required
                  />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={setDob}
                    required
                  />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <Input
                    label="Mobile Number"
                    type="tel"
                    value={mobile}
                    onChange={setMobile}
                    required
                  />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <Input
                    label="City"
                    type="text"
                    value={city}
                    onChange={setCity}
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="border-t border-[#E5E5E5] pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="mb-4">Voter Identification</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      label="Voter Code"
                      type="text"
                      value={voterCode}
                      onChange={setVoterCode}
                      disabled
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={generateVoterCode}
                    className="sm:mt-auto whitespace-nowrap"
                  >
                    Generate Code
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button type="button" variant="secondary" onClick={onBack} className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  icon={<UserPlus className="w-5 h-5" />}
                  disabled={!voterCode}
                >
                  Save Voter
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}