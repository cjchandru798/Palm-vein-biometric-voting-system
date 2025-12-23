import { Shield, UserCheck } from 'lucide-react';

interface HomeProps {
  onSelectRole: (role: 'admin' | 'voter') => void;
}

export function Home({ onSelectRole }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-4 rounded-full">
            <Shield className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="mb-3 text-indigo-900">Palm Vein Based Voting System</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Secure, biometric-based voter authentication using palm vein patterns
        </p>
        <div className="mt-4 inline-block bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2">
          <p className="text-yellow-800">Smart India Hackathon Prototype</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
        <button
          onClick={() => onSelectRole('admin')}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-500"
        >
          <div className="flex flex-col items-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Shield className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="mb-2 text-gray-900">Admin Portal</h3>
            <p className="text-gray-600 text-center">
              Manage voters, elections, and candidates
            </p>
          </div>
        </button>

        <button
          onClick={() => onSelectRole('voter')}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
        >
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <UserCheck className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="mb-2 text-gray-900">Voter Portal</h3>
            <p className="text-gray-600 text-center">
              Authenticate and cast your vote securely
            </p>
          </div>
        </button>
      </div>

      <div className="mt-12 text-center text-gray-500">
        <p>Powered by Palm Vein Biometric Authentication</p>
      </div>
    </div>
  );
}
