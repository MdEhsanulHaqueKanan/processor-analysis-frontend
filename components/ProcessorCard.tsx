// components/ProcessorCard.tsx (Final Corrected Version)

import React from 'react';
import type { Processor } from '../types';

interface ProcessorCardProps {
  processor: Processor;
}

const CoreIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" clipRule="evenodd" /><path d="M7 7h2v2H7V7zm4 0h2v2h-2V7zm-4 4h2v2H7v-2zm4 0h2v2h-2v-2z" /></svg>;
// Note: The WifiIcon is not a perfect match for Wi-Fi, but it's a good placeholder.
const WifiIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M15.586 10.414a.5.5 0 00-.707 0L10 15.293l-4.879-4.879a.5.5 0 10-.707.707L10 16.707l5.586-5.586a.5.5 0 000-.707z" /><path d="M10 2a8 8 0 015.657 2.343l.707-.707A9 9 0 001 3.343l.707.707A8 8 0 0110 2z" /><path d="M10 6a4 4 0 012.828 1.172l.707-.707A5 5 0 005.172 6.464l.707.707A4 4 0 0110 6z" /></svg>;
const FiveGIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.789l.894.447A2 2 0 0011 16.223V10.5a1.5 1.5 0 00-3 0v5.123l-1-2v-3.123a1.5 1.5 0 00-2 0zM10 4.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM14 4.333v5.43a2 2 0 001.106 1.789l.894.447A2 2 0 0019 12.223V8.5a1.5 1.5 0 00-3 0v1.123l-1-2V4.333a1.5 1.5 0 00-2 0z" /></svg>;


export const ProcessorCard: React.FC<ProcessorCardProps> = ({ processor }) => {
  // Use fallback values (?? 0 or 'N/A') in case some data is missing from the API for a specific processor.
  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-lg shadow-lg hover:shadow-brand-accent/30 hover:border-brand-accent/50 transition-all duration-300 p-5 flex flex-col justify-between transform hover:-translate-y-1">
      <div>
        <div className="flex justify-between items-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{processor.designer ?? 'N/A'}</p>
            <span className="text-xs font-medium text-slate-400">{processor.releaseYear ?? 'N/A'}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 mt-2 truncate">{processor.name ?? 'Unknown Processor'}</h3>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="flex items-center gap-2 text-slate-400">
                <CoreIcon /> Cores
            </span>
            <span className="font-semibold">{processor.cores ?? '?'}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="flex items-center gap-2 text-slate-400">
                <FiveGIcon /> 5G Support
            </span>
            <span className={`font-semibold ${processor.has5g ? 'text-green-400' : 'text-red-400'}`}>
                {processor.has5g ? 'Yes' : 'No'}
            </span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="flex items-center gap-2 text-slate-400">
                <WifiIcon /> Wi-Fi 6
            </span>
             {/* THIS IS THE KEY FIX: Check for the correct property name from the API */}
            <span className={`font-semibold ${processor.hasWifi6 ? 'text-green-400' : 'text-red-400'}`}>
                {processor.hasWifi6 ? 'Yes' : 'No'}
            </span>
        </div>
      </div>
    </div>
  );
};