import React from 'react';
import type { Metric } from '../types';
import HamburgerIcon from './icons/HamburgerIcon';

interface DialProps {
  metrics: Metric[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onCenterClick: () => void;
}

const Dial: React.FC<DialProps> = ({ metrics, selectedIndex, onSelect, onCenterClick }) => {
  const rotationAngle = selectedIndex * (360 / metrics.length);

  const handleDialClick = () => {
    onSelect((selectedIndex + 1) % metrics.length);
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mt-8">
      {/* Outer Dial with Markers */}
      <div
        className="w-64 h-64 rounded-full transition-transform duration-500 ease-out cursor-pointer"
        style={{ transform: `rotate(-${rotationAngle}deg)` }}
        onClick={handleDialClick}
      >
        {metrics.map((metric, index) => {
          const angle = index * (360 / metrics.length);
          return (
            <div
              key={metric.id}
              className="absolute top-1/2 left-1/2 w-32 h-px -translate-y-1/2"
              style={{ transform: `rotate(${angle}deg) translateX(50%)` }}
            >
              <div className="w-4 h-full bg-gray-500 rounded-full"></div>
            </div>
          );
        })}
      </div>
      
      {/* Static indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-x-8 border-x-transparent border-t-[12px] border-t-cyan-400 drop-shadow-[0_0_5px_rgba(56,189,248,1)]"></div>

      {/* Main Dial Body */}
      <div 
        className="absolute w-56 h-56 rounded-full
          bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-500 via-gray-700 to-gray-800
          shadow-[0_0_40px_rgba(0,0,0,0.7)]
          border-4 border-gray-900
          flex items-center justify-center select-none"
      >
        {/* Reflection */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full"></div>

        {/* Center Button */}
        <div 
          className="w-24 h-24 rounded-full
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-800 to-gray-900
            shadow-inner shadow-black/80
            border-2 border-gray-900
            flex items-center justify-center
            cursor-pointer group transition-all duration-300
            hover:bg-gray-700"
          onClick={onCenterClick}
        >
          <HamburgerIcon className="w-10 h-10 text-gray-500 group-hover:text-cyan-300 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Dial;
