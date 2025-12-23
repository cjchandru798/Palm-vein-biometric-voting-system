import { Check, X } from 'lucide-react';

interface ConfirmIdentityProps {
  voterName: string;
  onConfirm: () => void;
}

export function ConfirmIdentity({ voterName, onConfirm }: ConfirmIdentityProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Check className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h2 className="text-center mb-2 text-gray-900">Identity Verified</h2>
        <p className="text-center text-gray-600 mb-8">Please confirm your identity to proceed</p>

        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 mb-8">
          <p className="text-gray-600 text-center mb-2">Verified Voter:</p>
          <p className="text-center text-gray-900">{voterName}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Yes, I'm {voterName}
          </button>

          <button
            className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            No, This is Not Me
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-900 text-center">
            Confirming wrong identity may result in legal action
          </p>
        </div>
      </div>
    </div>
  );
}
