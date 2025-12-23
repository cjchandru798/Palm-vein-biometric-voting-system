import { useState } from 'react';
import { AdminDashboard } from './components/AdminDashboard';
import { VoterFlow } from './components/VoterFlow';
import { Home } from './components/Home';

type View = 'home' | 'admin' | 'voter';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentView === 'home' && <Home onSelectRole={setCurrentView} />}
      {currentView === 'admin' && <AdminDashboard onBack={() => setCurrentView('home')} />}
      {currentView === 'voter' && <VoterFlow onBack={() => setCurrentView('home')} />}
    </div>
  );
}
