
import React from 'react';

const ChipIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m1.5-7.5h15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5.25 6.375v1.5m-1.5-18v1.5m1.5 15h-1.5m10.5-1.5h-1.5m-1.5 0v-1.5m-6 0v1.5m-1.5-1.5h-1.5" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="py-6 sm:py-10">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center items-center gap-4">
                    <ChipIcon className="w-12 h-12 text-brand-accent" />
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-violet-500">
                        Processor Analysis Engine
                    </h1>
                </div>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                    A decision-support tool to analyze and select the perfect processor for your next-gen smart devices.
                </p>
            </div>
        </header>
    );
};
