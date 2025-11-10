
import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import BarGraph from './components/BarGraph';
import Dial from './components/Dial';
import ControlPanel from './components/ControlPanel';
import { METRICS } from './constants';
import type { MetricData } from './types';
import { analyzePerformance } from './services/geminiService';

const App: React.FC = () => {
  const [metricsData, setMetricsData] = useState<MetricData[]>([]);
  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number>(0);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState<boolean>(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [auditLog, setAuditLog] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with random data
    const initialData = METRICS.map(metric => ({
      ...metric,
      value: Math.random() * 80 + 20, // Random value between 20 and 100
    }));
    setMetricsData(initialData);

    // Load audit log from local storage
    const storedLog = localStorage.getItem('gtp_auditLog');
    if (storedLog) {
      try {
        const parsedLog = JSON.parse(storedLog);
        if (Array.isArray(parsedLog)) {
          setAuditLog(parsedLog);
        }
      } catch (e) {
        console.error("Failed to parse audit log from localStorage", e);
        localStorage.removeItem('gtp_auditLog');
      }
    }
  }, []);

  const logAuditEvent = useCallback((event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLogEntry = `[${timestamp}] ${event}`;
    setAuditLog(prevLog => {
      const newLog = [newLogEntry, ...prevLog].slice(0, 100); // Keep last 100 entries
      localStorage.setItem('gtp_auditLog', JSON.stringify(newLog));
      return newLog;
    });
  }, []);

  const handleAnalyze = useCallback(async () => {
    setIsLoadingAnalysis(true);
    setAnalysisResult(null);
    logAuditEvent('Analysis started');
    const result = await analyzePerformance(metricsData);
    setAnalysisResult(result);
    setIsLoadingAnalysis(false);
    logAuditEvent('Analysis finished');
  }, [metricsData, logAuditEvent]);
  
  const handleOpenControlPanel = () => {
    logAuditEvent('Control Panel opened');
    setIsControlPanelOpen(true);
  }

  const handleCloseControlPanel = () => {
    setIsControlPanelOpen(false);
  }

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
          onCenterClick={handleOpenControlPanel}
        />
        
        <ControlPanel
          isOpen={isControlPanelOpen}
          onClose={handleCloseControlPanel}
          onAnalyze={handleAnalyze}
          isLoadingAnalysis={isLoadingAnalysis}
          analysisResult={analysisResult}
          auditLog={auditLog}
          logAuditEvent={logAuditEvent}
        />
      </div>
    </main>
  );
};

export default App;
