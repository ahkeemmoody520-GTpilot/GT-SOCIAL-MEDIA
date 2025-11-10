
import React, { useState, useEffect, useCallback } from 'react';

const generateNewApiKey = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = 'gtp_';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

interface ApiKeyDashboardProps {
  auditLog: string[];
  logAuditEvent: (event: string) => void;
}

const ApiKeyDashboard: React.FC<ApiKeyDashboardProps> = ({ auditLog, logAuditEvent }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isKeyVisible, setIsKeyVisible] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<string>('Copy');

  const logAndSetKey = useCallback((newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem('gtp_apiKey', newKey);
    logAuditEvent(`API Key Generated`);
  }, [logAuditEvent]);

  useEffect(() => {
    const storedKey = localStorage.getItem('gtp_apiKey');
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      logAndSetKey(generateNewApiKey());
    }
  }, [logAndSetKey]);

  const handleRegenerate = () => {
    if (window.confirm('Are you sure you want to regenerate the API key? The old key will be invalidated.')) {
      logAndSetKey(generateNewApiKey());
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    }, () => {
      setCopyStatus('Failed!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    });
  };

  return (
    <div className="space-y-6 p-2">
      <div>
        <h4 className="font-semibold text-cyan-400 mb-2">Your API Key</h4>
        <div className="flex items-center gap-2 p-2 bg-black/30 rounded-md border border-gray-600">
          <input
            type={isKeyVisible ? 'text' : 'password'}
            readOnly
            value={apiKey}
            className="flex-grow bg-transparent font-mono text-sm text-gray-300 focus:outline-none"
            aria-label="API Key"
          />
          <button onClick={() => setIsKeyVisible(!isKeyVisible)} className="text-gray-400 hover:text-white" title={isKeyVisible ? 'Hide key' : 'Show key'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d={isKeyVisible ? "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 1.95 1.95M12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" : "M2.036 12.322a1.012 1.012 0 0 1 0-.644l.662-1.066c.421-.676.982-1.223 1.626-1.631C5.044 8.25 6.463 7.5 8.25 7.5h7.5c1.786 0 3.206.75 4.198 1.481a9.208 9.208 0 0 1 1.626 1.631l.662 1.066c.27.434.27.97 0 1.404l-.662 1.066a9.208 9.208 0 0 1-1.626 1.631c-.992.73-2.412 1.481-4.198 1.481H8.25c-1.786 0-3.206-.75-4.198-1.481a9.209 9.209 0 0 1-1.626-1.631l-.662-1.066ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"} />
            </svg>
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button onClick={handleCopy} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">{copyStatus}</button>
          <button onClick={handleRegenerate} className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">Regenerate</button>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-cyan-400 mb-2">Audit Log</h4>
        <div className="bg-black/30 rounded-md border border-gray-600 h-32 p-2 overflow-y-auto">
          {auditLog.length > 0 ? (
            <ul className="text-sm text-gray-400 font-mono space-y-1">
              {auditLog.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center pt-8">No events logged.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeyDashboard;
