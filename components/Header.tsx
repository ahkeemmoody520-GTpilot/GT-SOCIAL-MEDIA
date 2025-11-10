import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6 text-white">
      <h1 className="text-3xl md:text-4xl font-bold tracking-wider uppercase drop-shadow-[0_2px_2px_rgba(0,255,255,0.4)]">
        GT Pilot Intelligence Dashboard
      </h1>
      <p className="text-sm md:text-base text-cyan-300/80 mt-1 tracking-widest">
        Social Media Performance Cockpit
      </p>
    </header>
  );
};

export default Header;
