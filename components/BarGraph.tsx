import React from 'react';

interface BarGraphProps {
  label: string;
  value: number; // 0-100
  isSelected: boolean;
}

const BarGraph: React.FC<BarGraphProps> = ({ label, value, isSelected }) => {
  const barHeight = Math.max(0, Math.min(100, value));

  return (
    <div className={`w-full max-w-sm px-4 py-2 mx-auto transition-all duration-300 ${isSelected ? 'scale-105' : 'scale-100'}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-bold text-cyan-300">{value.toFixed(1)}%</span>
      </div>
      <div className={`
        h-8 w-full rounded-md p-1
        bg-gradient-to-b from-gray-800 via-gray-900 to-black
        shadow-inner shadow-black/50
        border border-gray-700
        transition-all duration-300
        ${isSelected ? 'ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]' : 'ring-0'}
      `}>
        <div className="relative h-full w-full rounded-[3px] overflow-hidden bg-black/30">
           {/* Track lighting effect */}
           <div className="absolute top-0 left-0 h-1/2 w-full bg-white/5 blur-sm"></div>
          <div
            className="h-full rounded-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700 ease-out"
            style={{ width: `${barHeight}%` }}
          >
             {/* Bar gloss effect */}
             <div className="absolute top-0 left-0 h-1/2 w-full bg-white/20 rounded-t-[3px] blur-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
