import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import BarGraph from './components/BarGraph';
import Dial from './components/Dial';
import SettingsDropdown from './components/SettingsDropdown';
import { METRICS } from './constants';
import type { MetricData } from './types';
import { analyzePerformance } from './services/geminiService';

const App: React.FC = () => {
  const [metricsData, setMetricsData] = useState<MetricData[]>([]);
  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number>(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with random data
    const initialData = METRICS.map(metric => ({
      ...metric,
      value: Math.random() * 80 + 20, // Random value between 20 and 100
    }));
    setMetricsData(initialData);
  }, []);

  const handleAnalyze = useCallback(async () => {
    setIsLoadingAnalysis(true);
    setAnalysisResult(null);
    const result = await analyzePerformance(metricsData);
    setAnalysisResult(result);
    setIsLoadingAnalysis(false);
  }, [metricsData]);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black flex flex-col items-center justify-start py-4 overflow-hidden">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <Header />
        
        <div className="w-full mt-4 md:mt-8 space-y-2">
          {metricsData.map((metric, index) => (
            <BarGraph
              key={metric.id}
              label={metric.label}
              value={metric.value}
              isSelected={index === selectedMetricIndex}
            />
          ))}
        </div>

        <Dial
          metrics={METRICS}
          selectedIndex={selectedMetricIndex}
          onSelect={setSelectedMetricIndex}
          onCenterClick={() => setIsSettingsOpen(true)}
        />
        
        <SettingsDropdown
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onAnalyze={handleAnalyze}
          isLoadingAnalysis={isLoadingAnalysis}
          analysisResult={analysisResult}
        />
      </div>
    </main>
  );
};

export default App;