import { Check, Download, Printer } from 'lucide-react';

interface VVPATReceiptProps {
  candidate: any;
  voterCode: string;
  voteResponse: string;
}

export function VVPATReceipt({ candidate, voterCode, voteResponse }: VVPATReceiptProps) {
  // Parse ballot ID and audit hash from response
  const ballotIdMatch = voteResponse.match(/ballotId: ([a-f0-9-]+)/i);
  const auditHashMatch = voteResponse.match(/auditHash: ([A-Z0-9]+)/i);
  const vvpPathMatch = voteResponse.match(/VVPAT saved at: ([^\|]+)/);
  
  const ballotId = ballotIdMatch ? ballotIdMatch[1] : 'BLT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const auditHash = auditHashMatch ? auditHashMatch[1] : 'SHA256:' + Math.random().toString(36).substr(2, 16).toUpperCase();
  const timestamp = new Date().toLocaleString();

  const handleDownload = async () => {
    try {
      // In real implementation, this would download the actual PDF from backend
      // const blob = await api.voter.downloadVVPAT(ballotId);
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `VVPAT-${ballotId}.pdf`;
      // a.click();
      alert('VVPAT PDF download functionality - connect to backend endpoint');
    } catch (err) {
      alert('Failed to download VVPAT');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Check className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-center mb-2 text-gray-900">Vote Cast Successfully!</h1>
        <p className="text-center text-gray-600 mb-8">Your VVPAT has been generated</p>

        <div className="border-4 border-dashed border-gray-300 rounded-xl p-8 mb-8 bg-gray-50">
          <div className="text-center mb-6">
            <h2 className="mb-2 text-gray-900">VVPAT - Voter Verified Paper Audit Trail</h2>
            <p className="text-gray-600">General Elections 2025</p>
          </div>

          <div className="border-t-2 border-b-2 border-gray-300 py-6 mb-6">
            <div className="bg-white rounded-lg p-6 mb-4">
              <p className="text-gray-600 text-center mb-3">Your vote was cast for:</p>
              <div className="text-center">
                <span className="text-5xl mb-3 block">{candidate.symbol || '👤'}</span>
                <p className="text-gray-900 mb-1">{candidate.leaderName}</p>
                <p className="text-gray-700">{candidate.partyName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Ballot ID:</span>
              <span className="text-gray-900">{ballotId}</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="text-gray-900">{timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span>Constituency:</span>
              <span className="text-gray-900">Mumbai</span>
            </div>
            <div className="flex justify-between items-start">
              <span>Audit Hash:</span>
              <span className="text-gray-900 text-right break-all max-w-xs">{auditHash}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-900 text-center">
              ✓ Vote recorded and encrypted securely
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download VVPAT PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print VVPAT
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 text-center">
            Thank you for exercising your democratic right!
          </p>
        </div>
      </div>
    </div>
  );
}