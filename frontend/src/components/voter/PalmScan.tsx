import { useState, useEffect } from "react";
import { Camera, Check, AlertCircle } from "lucide-react";
import { api, generateMockPalmTemplate } from "../../services/api";

interface PalmScanProps {
  voterCode: string;
  onComplete: () => void;
}

export function PalmScan({ voterCode, onComplete }: PalmScanProps) {
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  // 1️⃣ CAPTURE PALM
  const triggerPalmCapture = async (): Promise<string> => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/capture?hand=left&voterCode=${voterCode}`);
      if (!res.ok) throw new Error(`Flask capture failed: ${res.status}`);
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message || "Palm capture failed");
      return data.rawTemplate; // BASE64
    } catch (err: any) {
      throw new Error(err.message || "Palm capture error");
    }
  };

  // 2️⃣ VERIFY PALM
  const verifyPalm = async () => {
    try {
      const rawTemplate = await triggerPalmCapture();
      const sessionKey = await api.security.getSessionKey();
      const encRes = await api.security.encrypt({ rawTemplate, sessionKey });
      const encryptedTemplate = await encRes.text();

      const res = await api.voter.scanPalm(voterCode, encryptedTemplate);
      const result = await res.json?.() || res;

      if (!result.verified) throw new Error("Verification failed");

      setVerified(true);
      setScanning(false);
      onComplete();
    } catch (err: any) {
      setError(err.message);
      setScanning(false);
      setProgress(0);
    }
  };

  // 3️⃣ SCAN PROGRESS
  useEffect(() => {
    if (scanning && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => Math.min(prev + 10, 100)), 200);
      return () => clearTimeout(timer);
    }
    if (scanning && progress >= 100) verifyPalm();
  }, [scanning, progress]);

  const handleStartScan = () => {
    setError("");
    setVerified(false);
    setProgress(0);
    setScanning(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-center mb-2 text-gray-900">Palm Vein Authentication</h2>
        <p className="text-center text-gray-600 mb-6">Voter ID: {voterCode}</p>

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>}

        <div className="mb-6">
          <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
            {!scanning && !verified && (
              <div className="text-gray-400 flex flex-col items-center">
                <Camera className="w-16 h-16 mb-3" />
                <span>Place your palm over the scanner</span>
              </div>
            )}
            {scanning && !verified && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-green-500 rounded-lg animate-pulse"></div>
              </div>
            )}
            {verified && (
              <div className="text-green-500 flex flex-col items-center animate-fade-in">
                <Check className="w-20 h-20 mb-3" />
                <span className="text-white">Palm Verified Successfully</span>
              </div>
            )}
          </div>

          {scanning && !verified && (
            <div className="mt-4">
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Verifying palm vein pattern...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        {!scanning && !verified && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900">Scanning Instructions:</p>
                <ul className="mt-2 text-blue-800 list-disc list-inside space-y-1">
                  <li>Place your registered palm flat over the scanner</li>
                  <li>Keep your hand steady during the scan</li>
                  <li>Template is encrypted using QKD session key internally</li>
                </ul>
              </div>
            </div>

            <button onClick={handleStartScan} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" /> Start Palm Scan
            </button>
          </>
        )}
      </div>
    </div>
  );
}
