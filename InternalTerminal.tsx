
import React, { useState, useRef, useEffect } from 'react';

interface InternalTerminalProps {
  onAnalyze: () => void;
  logAuditEvent: (event: string) => void;
}

const HELP_MESSAGE = `
GT Pilot Internal Cognition Terminal v71.0.1
Available commands:
  analyze   - Triggers performance analysis with Gemini.
  import    - Simulates a timestamp-based data import.
  exec      - Simulates executing a named hook.
  echo      - Prints the arguments back to the terminal.
  help      - Displays this help message.
  clear     - Clears the terminal screen.
`;

const InternalTerminal: React.FC<InternalTerminalProps> = ({ onAnalyze, logAuditEvent }) => {
  const [history, setHistory] = useState<string[]>(['Welcome to the GT Pilot Internal Terminal. Type `help` for commands.']);
  const [input, setInput] = useState('');
  const endOfHistoryRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addHistory = (line: string) => {
    setHistory(prev => [...prev, line]);
  }

  const processCommand = (command: string) => {
    addHistory(`> ${command}`);
    const [cmd, ...args] = command.trim().split(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        addHistory(HELP_MESSAGE);
        break;
      case 'analyze':
        addHistory('Executing analysis trigger...');
        logAuditEvent('Analysis triggered via terminal');
        onAnalyze();
        break;
      case 'import':
        const importTime = new Date().toISOString();
        addHistory(`Import hook triggered. Timestamp: ${importTime}`);
        logAuditEvent(`Data import triggered via terminal at ${importTime}`);
        break;
      case 'exec':
        const hookName = args[0] || 'unnamed_hook';
        addHistory(`Executing hook: ${hookName}...`);
        logAuditEvent(`Hook '${hookName}' executed via terminal`);
        break;
      case 'echo':
        addHistory(args.join(' '));
        break;
      case 'clear':
        setHistory([]);
        break;
      case '':
        break;
      default:
        addHistory(`Error: command not found: ${cmd}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-96 flex flex-col bg-black/50 p-2 font-mono text-sm text-green-400 rounded-md border border-gray-600">
      <div className="flex-grow overflow-y-auto pr-2">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap leading-tight">{line}</div>
        ))}
        <div ref={endOfHistoryRef} />
      </div>
      <form onSubmit={handleFormSubmit} className="flex items-center mt-2">
        <span className="text-cyan-400 mr-2">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow bg-transparent focus:outline-none"
          autoFocus
          aria-label="Terminal Input"
        />
      </form>
    </div>
  );
};

export default InternalTerminal;
