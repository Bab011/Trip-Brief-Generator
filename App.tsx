import React from 'react';
import Sidebar from './components/Sidebar';
import TripBriefGenerator from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="h-screen flex bg-[#030303] text-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-[#09090b] border-b border-slate-800 flex items-center justify-between px-4">
             <h1 className="text-xl font-bold text-slate-50">TripGen</h1>
             <button className="text-slate-400">
                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
             </button>
        </header>
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <TripBriefGenerator />
        </div>
      </div>
    </div>
  );
};

export default App;