import React from 'react';

interface SettingsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: () => void;
  isLoadingAnalysis: boolean;
  analysisResult: string | null;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({ 
  isOpen, 
  onClose,
  onAnalyze,
  isLoadingAnalysis,
  analysisResult
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      <div className={`
        fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50
        transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="bg-gray-800/90 backdrop-blur-sm text-white p-6 rounded-t-2xl border-t-2 border-cyan-400/50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-cyan-300">Advanced Options</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Time Range</label>
              <select className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
              </select>
            </div>
            
            <button
              onClick={onAnalyze}
              disabled={isLoadingAnalysis}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 text-black font-bold py-2 px-4 rounded-md transition-all flex items-center justify-center"
            >
              {isLoadingAnalysis ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze Performance with Gemini'
              )}
            </button>

            {analysisResult && (
              <div className="mt-4 p-4 bg-black/30 rounded-md border border-gray-600 max-h-48 overflow-y-auto">
                <h4 className="font-semibold text-cyan-400 mb-2">Analysis Result:</h4>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{analysisResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsDropdown;
