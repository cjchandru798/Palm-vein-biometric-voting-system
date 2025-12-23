import React from 'react';
import { Card } from './Card';
import { AlertTriangle, Terminal, Camera } from 'lucide-react';
import { motion } from 'motion/react';

interface PythonClientInstructionsProps {
  mode: 'register' | 'verify';
  voterCode: string;
}

export function PythonClientInstructions({ mode, voterCode }: PythonClientInstructionsProps) {
  const isRegister = mode === 'register';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6"
    >
      <Card className="bg-[#FFF9E6] border-2 border-[#FFC107]/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#FFC107]/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Camera className="w-6 h-6 text-[#FFC107]" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#FFC107]" />
              Python Client Required
            </h3>
            <p className="text-[#6B6B6B] mb-4">
              {isRegister 
                ? 'Palm template registration requires the Python capture client with camera access.'
                : 'Palm verification requires the Python capture client with camera access.'}
            </p>

            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-[#3E7BFA]" />
                <p>Run the following command:</p>
              </div>
              <code className="block bg-[#1A1A1A] text-[#0ACF83] p-3 rounded-lg">
                python {isRegister ? 'capture_register.py' : 'capture_verify.py'}
              </code>
            </div>

            <div className="space-y-2">
              <p className="text-[#6B6B6B]">
                <strong>Step 1:</strong> Run the Python client on a device with camera access
              </p>
              <p className="text-[#6B6B6B]">
                <strong>Step 2:</strong> Enter voter code: <code className="text-[#3E7BFA] bg-white px-2 py-1 rounded">{voterCode}</code>
              </p>
              <p className="text-[#6B6B6B]">
                <strong>Step 3:</strong> Press 'C' to capture palm image
              </p>
              <p className="text-[#6B6B6B]">
                <strong>Step 4:</strong> The system will automatically process and {isRegister ? 'register' : 'verify'} the template
              </p>
            </div>

            <div className="mt-4 p-3 bg-[#3E7BFA]/10 rounded-lg border border-[#3E7BFA]/30">
              <p className="text-[#3E7BFA]">
                ℹ️ Make sure the Python client is configured to connect to: <code>http://localhost:8080</code>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
