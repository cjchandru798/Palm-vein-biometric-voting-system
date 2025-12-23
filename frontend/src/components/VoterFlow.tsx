import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { VoterLogin } from './voter/VoterLogin';
import { PalmScan } from './voter/PalmScan';
import { ConfirmIdentity } from './voter/ConfirmIdentity';
import { VotingScreen } from './voter/VotingScreen';
import { VVPATReceipt } from './voter/VVPATReceipt';

interface VoterFlowProps {
  onBack: () => void;
}

type VoterStep = 'login' | 'scan' | 'confirm' | 'vote' | 'vvpat';

export function VoterFlow({ onBack }: VoterFlowProps) {
  const [step, setStep] = useState<VoterStep>('login');
  const [voterData, setVoterData] = useState<any>({
    voterCode: '',
    name: '',
    voterId: '',
    selectedCandidate: null,
    ballotId: '',
    voteResponse: ''
  });

  const handleLogin = (code: string, voter: any) => {
    setVoterData({ 
      ...voterData, 
      voterCode: code, 
      name: voter.name,
      voterId: voter.voterId 
    });
    setStep('scan');
  };

  const handleScanComplete = () => setStep('confirm');
  const handleConfirm = () => setStep('vote');

  const handleVoteCast = (candidate: any, response: string) => {
    setVoterData({
      ...voterData,
      selectedCandidate: candidate,
      voteResponse: response
    });
    setStep('vvpat');
  };

  return (
    <div className="min-h-screen">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      {step === 'login' && <VoterLogin onLogin={handleLogin} />}
      {step === 'scan' && <PalmScan voterCode={voterData.voterCode} onComplete={handleScanComplete} />}
      {step === 'confirm' && <ConfirmIdentity voterName={voterData.name} onConfirm={handleConfirm} />}
      {step === 'vote' && <VotingScreen voterCode={voterData.voterCode} onVoteCast={handleVoteCast} />}
      {step === 'vvpat' && <VVPATReceipt candidate={voterData.selectedCandidate} voterCode={voterData.voterCode} voteResponse={voterData.voteResponse} />}
    </div>
  );
}
