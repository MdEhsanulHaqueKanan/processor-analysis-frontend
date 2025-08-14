// components/ProcessorAnalyzer.tsx 

import React, { useState, useCallback } from 'react';
// This import will now work correctly
import { analyzeProcessor, AnalysisInput, AnalysisResult } from '../services/geminiService';
import { Loader } from './Loader';

// Default state matches the inputs required by our Flask backend
const initialInput: AnalysisInput = {
    designer: 'Qualcomm',
    yearReleased: 2024,
    numCores: 8,
    featureSize: 4.0,
    hasPerformanceCores: true,
    has5g: true,
};

// --- Sub-components for UI ---

const ToggleSwitch: React.FC<{
    checked: boolean;
    onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => {
    return (
        <button
            type="button"
            className={`${checked ? 'bg-brand-accent' : 'bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-slate-800`}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
        >
            <span
                aria-hidden="true"
                className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    );
};

// This component correctly displays the array of strings from our Flask API
const AnalysisResultDisplay: React.FC<{ result: AnalysisResult }> = ({ result }) => (
    <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 shadow-lg border border-slate-700">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-violet-400 mb-6">
        Analysis Complete
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Primary Function</h4>
          <p className="text-lg text-slate-100 mt-1">{result.primaryFunction}</p>
        </div>
        <div className="border-t border-slate-700 my-4"></div>
        <div>
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Predicted Wireless Capabilities</h4>
          <p className="text-lg text-slate-100 mt-1">{Array.isArray(result.wirelessCapabilities) ? result.wirelessCapabilities.join(', ') : result.wirelessCapabilities}</p>
        </div>
      </div>
    </div>
);


// --- Main Analyzer Component ---

export const ProcessorAnalyzer: React.FC = () => {
    const [input, setInput] = useState<AnalysisInput>(initialInput);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = useCallback(<K extends keyof AnalysisInput>(key: K, value: AnalysisInput[K]) => {
        setInput(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const analysisResult = await analyzeProcessor(input);
            setResult(analysisResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Analyze a Processor</h2>
            <p className="text-slate-400 mb-6">Input processor specs to get predictions from your custom-trained machine learning model.</p>
            
            {/* Form with inputs that match the Flask model */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-6 bg-slate-900/50 rounded-lg">
                    
                    {/* Designer Dropdown */}
                    <div>
                        <label htmlFor="designer" className="block text-sm font-medium text-slate-400">Designer</label>
                        <select
                            id="designer"
                            value={input.designer}
                            onChange={e => handleInputChange('designer', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md text-white"
                        >
                            <option>Qualcomm</option>
                            <option>Apple</option>
                            <option>Samsung</option>
                            <option>MediaTek</option>
                            <option>Google</option>
                        </select>
                    </div>

                    {/* Year Released Slider */}
                    <div>
                        <label htmlFor="yearReleased" className="block text-sm font-medium text-slate-400">Year Released: {input.yearReleased}</label>
                        <input id="yearReleased" type="range" min="2020" max="2025" step="1" value={input.yearReleased} onChange={e => handleInputChange('yearReleased', +e.target.value)} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent mt-1"/>
                    </div>
                    
                    {/* Number of Cores Slider */}
                    <div>
                        <label htmlFor="numCores" className="block text-sm font-medium text-slate-400">Number of Cores: {input.numCores}</label>
                        <input id="numCores" type="range" min="1" max="16" value={input.numCores} onChange={e => handleInputChange('numCores', +e.target.value)} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent mt-1"/>
                    </div>

                    {/* Feature Size (Process Node) Slider */}
                    <div>
                        <label htmlFor="featureSize" className="block text-sm font-medium text-slate-400">Feature Size (nm): {input.featureSize}</label>
                        <input id="featureSize" type="range" min="1" max="14" step="1" value={input.featureSize} onChange={e => handleInputChange('featureSize', +e.target.value)} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent mt-1"/>
                    </div>

                    {/* Toggles */}
                    <div className="flex items-center justify-between col-span-1 md:col-span-2 border-t border-slate-700 pt-6 mt-2 space-y-4 md:space-y-0 md:space-x-8 flex-col md:flex-row">
                        <div className="flex items-center justify-between w-full">
                           <span className="text-sm font-medium text-slate-300">Supports Performance Cores</span>
                           <ToggleSwitch checked={input.hasPerformanceCores} onChange={v => handleInputChange('hasPerformanceCores', v)} />
                        </div>
                        <div className="flex items-center justify-between w-full">
                           <span className="text-sm font-medium text-slate-300">Supports 5G</span>
                           <ToggleSwitch checked={input.has5g} onChange={v => handleInputChange('has5g', v)} />
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary hover:to-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-accent">
                        {isLoading ? <Loader/> : 'Analyze Processor'}
                    </button>
                </div>
            </form>

            {error && <div className="mt-6 text-center p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-md">{error}</div>}
            {result && <AnalysisResultDisplay result={result} />}
        </div>
    );
};