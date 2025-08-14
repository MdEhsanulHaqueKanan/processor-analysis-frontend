
import React, { useState } from 'react';
import { Header } from './components/Header';
import { RecommendationEngine } from './components/RecommendationEngine';
import { ProcessorAnalyzer } from './components/ProcessorAnalyzer';
import type { View } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('recommender');

  const TABS: { id: View; label: string }[] = [
    { id: 'recommender', label: 'Recommendation Engine' },
    { id: 'analyzer', label: 'AI Processor Analyzer' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8">
          <div className="mb-8 border-b border-slate-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`${
                    activeView === tab.id
                      ? 'border-brand-accent text-brand-accent'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-t-sm`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            {activeView === 'recommender' && <RecommendationEngine />}
            {activeView === 'analyzer' && <ProcessorAnalyzer />}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        Processor Analysis Engine &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
