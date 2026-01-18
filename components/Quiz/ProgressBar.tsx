import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progress = Math.min(((currentStep) / totalSteps) * 100, 100);

    return (
        <div className="w-full fixed top-0 left-0 z-50">
            <div className="h-1.5 w-full bg-[#050505]">
                <div
                    className="h-full bg-gradient-to-r from-er-red to-[#ff4d4d] transition-all duration-700 ease-out shadow-[0_0_10px_rgba(230,0,0,0.5)]"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="absolute top-3 right-4 text-xs font-mono text-gray-400">
                {Math.round(progress)}% COMPLETO
            </div>
        </div>
    );
};

export default ProgressBar;
