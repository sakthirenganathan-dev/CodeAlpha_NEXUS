import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Terminal } from 'lucide-react';

const BOOT_LOGS = [
  "> INITIALIZING CORE...",
  "> LOADING WORD DATABASE...",
  "> ANALYZING SECURITY PROTOCOL...",
  "> CONNECTING TO NEXUS...",
  "> DECRYPTION ENGINE READY..."
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_LOGS.length) {
        setVisibleLines(prev => [...prev, BOOT_LOGS[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsReady(true);
      }
    }, 220);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="boot-container">
      <div className="boot-terminal-window">
        {/* Terminal Header */}
        <div className="terminal-topbar">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">
            <Cpu size={14} className="title-icon" />
            <span>NEXUS-OS // BOOT_LOADER_v5.0</span>
          </div>
          <div className="terminal-timestamp">SYS://ONLINE</div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          <div className="boot-branding">
            <h1 className="boot-glitch-title">NEXUS</h1>
            <p className="boot-subtitle">WORD DECRYPTION SYSTEM</p>
            <div className="boot-badge">OPERATOR ACCESS PROTOCOL</div>
          </div>

          <div className="boot-logs-section">
            {visibleLines.map((line, index) => (
              <div key={index} className="boot-log-line">
                <span className="log-prefix">SYS:</span>
                <span className="log-text">{line}</span>
              </div>
            ))}
            {!isReady && <div className="boot-cursor"></div>}
          </div>

          <div className={`boot-status-panel ${isReady ? 'revealed' : 'pending'}`}>
            <div className="status-label-group">
              <span className="status-key">SYSTEM STATUS:</span>
              <span className="status-val online">● ONLINE</span>
            </div>
            <div className="status-label-group">
              <span className="status-key">CLEARANCE:</span>
              <span className="status-val secure">LEVEL 4 OPERATOR</span>
            </div>
          </div>

          <div className="boot-action-area">
            <button
              className="btn-start-mission"
              onClick={onComplete}
              autoFocus
            >
              <span className="btn-content">
                <span>START MISSION</span>
                <ArrowRight size={18} className="btn-arrow" />
              </span>
            </button>
            <p className="boot-hint">
              Press to bypass boot sequence and enter command terminal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
