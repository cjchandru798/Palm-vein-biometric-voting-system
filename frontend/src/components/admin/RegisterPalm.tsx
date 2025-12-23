import { useState } from "react";
import { ArrowLeft, Camera, Check } from "lucide-react";

interface RegisterPalmProps {
  onBack: () => void;
}

export function RegisterPalm({ onBack }: RegisterPalmProps) {
  const [voterCode, setVoterCode] = useState("");
  const [selectedHand, setSelectedHand] = useState<"left" | "right" | "both">("both");

  const [scanningLeft, setScanningLeft] = useState(false);
  const [scanningRight, setScanningRight] = useState(false);

  const [leftCaptured, setLeftCaptured] = useState(false);
  const [rightCaptured, setRightCaptured] = useState(false);

  const [leftTemplate, setLeftTemplate] = useState("");
  const [rightTemplate, setRightTemplate] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const safeJson = async (res: Response) => {
    try { return await res.json(); } catch { return null; }
  };

  const captureFromPython = async (hand: "left" | "right") => {
    if (!voterCode.trim()) throw new Error("Enter voter ID code.");

    const res = await fetch(`http://127.0.0.1:5000/capture?hand=${hand}&voterCode=${voterCode}`);
    const data = await safeJson(res);

    if (!data || data.status !== "success") throw new Error(data?.message || "Capture failed.");
    return data.template; // raw base64
  };

  const handleCapture = async (hand: "left" | "right") => {
    setError("");
    if (hand === "left") setScanningLeft(true);
    if (hand === "right") setScanningRight(true);

    try {
      const template = await captureFromPython(hand);
      if (hand === "left") { setLeftTemplate(template); setLeftCaptured(true); }
      else { setRightTemplate(template); setRightCaptured(true); }
    } catch (err: any) { setError(err.message); }

    setScanningLeft(false);
    setScanningRight(false);
  };

  const handleRegister = async () => {
    setError("");
    if (!voterCode.trim()) { setError("Voter ID required"); return; }
    if (!leftCaptured && !rightCaptured) { setError("Capture at least one hand"); return; }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/api/admin/voters/${voterCode}/register-template`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leftTemplate: leftCaptured ? leftTemplate : null,
          rightTemplate: rightCaptured ? rightTemplate : null
        })
      });

      if (!res.ok) {
        const data = await safeJson(res);
        throw new Error(data?.message || "Registration failed");
      }

      setRegistered(true);
      setTimeout(() => {
        setRegistered(false);
        setVoterCode("");
        setLeftCaptured(false);
        setRightCaptured(false);
        setLeftTemplate("");
        setRightTemplate("");
      }, 2500);

    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 mb-6">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Register Palm Vein Templates</h2>

          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded">{error}</div>}

          <input
            value={voterCode}
            onChange={e => setVoterCode(e.target.value)}
            className="w-full mb-6 p-3 border rounded"
            placeholder="Voter ID Code"
          />

          <div className="flex gap-4 mb-6">
            {["left", "right", "both"].map(h => (
              <button
                key={h}
                onClick={() => setSelectedHand(h as any)}
                className={`flex-1 py-3 rounded border-2 ${selectedHand===h?"border-indigo-600 bg-indigo-50":"border-gray-300"}`}
              >
                {h.charAt(0).toUpperCase() + h.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(selectedHand==="left"||selectedHand==="both") &&
              <HandCapture title="Left Hand" captured={leftCaptured} scanning={scanningLeft} onCapture={()=>handleCapture("left")} />}
            {(selectedHand==="right"||selectedHand==="both") &&
              <HandCapture title="Right Hand" captured={rightCaptured} scanning={scanningRight} onCapture={()=>handleCapture("right")} />}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleRegister}
              disabled={loading||(!leftCaptured&&!rightCaptured)}
              className="flex-1 bg-green-600 text-white py-3 rounded"
            >
              {loading?"Registering...":"Register Templates"}
            </button>
            <button onClick={onBack} className="px-6 py-3 border rounded">Cancel</button>
          </div>

          {registered &&
            <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded">
              Templates Registered Successfully!
            </div>}
        </div>
      </div>
    </div>
  );
}

const HandCapture = ({title,captured,scanning,onCapture}:{title:string,captured:boolean,scanning:boolean,onCapture:()=>void}) => (
  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
    <h3 className="text-center mb-4">{title}</h3>
    <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
      {scanning ? <span className="text-white">Opening Camera...</span>
        : captured ? <div className="text-green-500 flex flex-col items-center"><Check className="w-12 h-12"/><span>Captured</span></div>
        : <div className="text-gray-400 flex flex-col items-center"><Camera className="w-12 h-12"/><span>Ready</span></div>}
    </div>
    <button onClick={onCapture} disabled={scanning||captured} className="w-full py-3 bg-indigo-600 text-white rounded">
      {scanning?"Capturing...":captured?"Captured":`Capture ${title}`}
    </button>
  </div>
);
