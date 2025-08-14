// components/RecommendationEngine.tsx (Final Polished Version)

import React, { useState, useEffect, useCallback } from 'react';
import { PROCESSOR_DESIGNERS } from '../constants';
import { getRecommendations } from '../services/geminiService';
import { ProcessorCard } from './ProcessorCard';
import { Loader } from './Loader';
import type { FilterCriteria, Processor } from '../types';

const ToggleButton: React.FC<{
  label: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
}> = ({ label, value, onChange }) => {
  const states: (boolean | null)[] = [true, false, null];
  const nextState = () => {
    const currentIndex = states.indexOf(value);
    onChange(states[(currentIndex + 1) % states.length]);
  };
  const getButtonClass = () => {
    if (value === true) return 'bg-green-600 hover:bg-green-500';
    if (value === false) return 'bg-red-600 hover:bg-red-500';
    return 'bg-slate-600 hover:bg-slate-500';
  };
  const getButtonText = () => {
    if (value === true) return `${label}: Yes`;
    if (value === false) return `${label}: No`;
    return `${label}: Any`;
  };
  return (
    <button onClick={nextState} className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-accent ${getButtonClass()}`}>
      {getButtonText()}
    </button>
  );
};

export const RecommendationEngine: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria>({
    designer: 'All',
    releaseYearRange: [2021, 2024],
    minCores: 4,
    has5g: null,
    hasWifi6: null,
  });
  
  const [processors, setProcessors] = useState<Processor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = useCallback(<K extends keyof FilterCriteria>(key: K, value: FilterCriteria[K]) => {
      setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsLoading(true);
      setError(null);
      
      getRecommendations(filters)
        .then(data => {
          setProcessors(data);
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Filter Processors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6 bg-slate-900/50 rounded-lg">
        <div>
          <label htmlFor="designer" className="block text-sm font-medium text-slate-400 mb-2">Designer</label>
          <select id="designer" value={filters.designer} onChange={(e) => handleFilterChange('designer', e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent">
            {PROCESSOR_DESIGNERS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="minCores" className="block text-sm font-medium text-slate-400 mb-2">Minimum Cores: {filters.minCores}</label>
          <input id="minCores" type="range" min="1" max="16" step="1" value={filters.minCores} onChange={(e) => handleFilterChange('minCores', parseInt(e.target.value, 10))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Release Year: {`${filters.releaseYearRange[0]} - ${filters.releaseYearRange[1]}`}</label>
            <div className="flex items-center space-x-2">
                {/* === FINAL FIX 1 === */}
                <span>1995</span>
                <input
                    type="range"
                    min="1995" 
                    max="2024"
                    value={filters.releaseYearRange[0]}
                    onChange={(e) => handleFilterChange('releaseYearRange', [Math.min(parseInt(e.target.value, 10), filters.releaseYearRange[1]), filters.releaseYearRange[1]])}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                 <input
                    type="range"
                    min="1995"
                    max="2024"
                    value={filters.releaseYearRange[1]}
                    onChange={(e) => handleFilterChange('releaseYearRange', [filters.releaseYearRange[0], Math.max(parseInt(e.target.value, 10), filters.releaseYearRange[0])])}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <span>2024</span>
            </div>
        </div>
        <div className="md:col-span-2 lg:col-span-3 flex items-center justify-center gap-4 flex-wrap">
          <ToggleButton label="5G Support" value={filters.has5g} onChange={(v) => handleFilterChange('has5g', v)} />
          <ToggleButton label="Wi-Fi 6 Support" value={filters.hasWifi6} onChange={(v) => handleFilterChange('hasWifi6', v)} />
        </div>
      </div>
      
      <div className="border-t border-slate-700 pt-8">
        <h3 className="text-xl font-bold text-slate-100 mb-6">{!isLoading && !error ? `${processors.length} Processors Found` : ' '}</h3>
        
        {isLoading && <div className="flex justify-center items-center py-16"><Loader /></div>}
        {error && <div className="text-center py-16 px-6 bg-red-900/50 text-red-300 border border-red-700 rounded-lg"><h4 className="text-xl font-medium">An Error Occurred</h4><p className="text-slate-400 mt-2">{error}</p></div>}
        {!isLoading && !error && processors.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{processors.map(proc => <ProcessorCard key={proc.id} processor={proc} />)}</div>}
        {!isLoading && !error && processors.length === 0 && <div className="text-center py-16 px-6 bg-slate-800 rounded-lg"><h4 className="text-xl font-medium text-slate-300">No Processors Match Your Criteria</h4><p className="text-slate-400 mt-2">Try adjusting your filters to find more results.</p></div>}
      </div>
    </div>
  );
};