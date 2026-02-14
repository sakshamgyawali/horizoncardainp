import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <div className="relative">
                <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white dark:bg-slate-800 p-8 rounded-full shadow-2xl mb-6">
                    <Sparkles className="w-12 h-12 text-primary-500 animate-spin-slow" />
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Generating Flashcards</h3>
            <p className="text-slate-500 animate-pulse">Our AI is distilling your notes into bite-sized facts...</p>
        </div>
    );
};

export default LoadingOverlay;
