import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Terminal, Shield, Zap, Terminal as TermIcon } from 'lucide-react';
import { soundManager } from '../utils/sound';

const BOOT_LOGS = [
  "> INITIALIZING QUANTUM CORE ARCHITECTURE...",
  "> LOADING ENCRYPTED MISSION DATABASE (15 CIPHERS)...",
  "> CONFIGURING NEURAL SECURITY FIREWALL...",
  "> SYNCING OPERATOR CLEARANCE PROTOCOLS...",
  "> NEXUS DECRYPTION ENGINE 100% OPERATIONAL..."
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_LOGS.length) {
        setVisibleLines(prev => [...prev, BOOT_LOGS[currentLine]]);
        currentLine++;
        setProgress(Math.min(100, Math.round((currentLine / BOOT_LOGS.length) * 100)));
        try { soundManager.playKeyClick(); } catch (_) {}
      } else {
        clearInterval(interval);
        setIsReady(true);
        setProgress(100);
        try { soundManager.playPowerup(); } catch (_) {}
      }
    }, 280);

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        try { soundManager.playVictory(); } catch (_) {}
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleStart = () => {
    try { soundManager.playVictory(); } catch (_) {}
    onComplete();
  };

  return (
    <div className="boot-container">
      {/* Background Animated Cyber Mesh */}
      <div className="boot-ambient-bg" aria-hidden="true">
        <div className="boot-grid-overlay"></div>
        <div className="boot-radial-spot"></div>
        <div className="boot-scanlines"></div>
      </div>

      <div className="boot-terminal-window">
        {/* Terminal Window Header Bar */}
        <div className="terminal-topbar">
          <div className="terminal-dots">
            <span className="dot red" title="Diagnostic Node"></span>
            <span className="dot yellow" title="Sync Node"></span>
            <span className="dot green" title="Operational Node"></span>
          </div>

          <div className="terminal-title">
            <Cpu size={14} className="title-icon" />
            <span>NEXUS-OS // BOOT_LOADER_v5.0</span>
          </div>

          <div className="terminal-timestamp">
            <span className="status-blink-dot"></span>
            <span>SYS://ONLINE</span>
          </div>
        </div>

        {/* Terminal Window Main Body */}
        <div className="terminal-body">
          {/* Futuristic Branding */}
          <div className="boot-branding">
            <div className="boot-brand-tag">
              <Shield size={13} />
              <span>CLASSIFIED CYBER WARFARE TERMINAL</span>
            </div>
            <h1 className="boot-glitch-title" data-text="NEXUS">NEXUS</h1>
            <p className="boot-subtitle">WORD DECRYPTION SYSTEM</p>
            <div className="boot-badge">
              <Zap size={12} />
              <span>OPERATOR ACCESS PROTOCOL • CLEARANCE LEVEL 4</span>
            </div>
          </div>

          {/* Progress Bar Gauge */}
          <div className="boot-progress-wrap">
            <div className="boot-progress-label-row">
              <span className="progress-title">SYSTEM INITIALIZATION</span>
              <span className="progress-percent">{progress}%</span>
            </div>
            <div className="boot-progress-track">
              <div
                className="boot-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Terminal Console Logs */}
          <div className="boot-logs-section">
            <div className="logs-header-bar">
              <TermIcon size={12} />
              <span>CONSOLE DIAGNOSTIC STREAM</span>
            </div>
            <div className="logs-content-area">
              {visibleLines.map((line, index) => (
                <div key={index} className="boot-log-line">
                  <span className="log-prefix">SYS:&gt;</span>
                  <span className="log-text">{line}</span>
                </div>
              ))}
              {!isReady && <div className="boot-cursor"></div>}
            </div>
          </div>

          {/* System Diagnostics Status Panel */}
          <div className={`boot-status-panel ${isReady ? 'revealed' : 'pending'}`}>
            <div className="status-label-group">
              <span className="status-key">SYSTEM STATUS:</span>
              <span className="status-val online">● ONLINE</span>
            </div>
            <div className="status-label-group">
              <span className="status-key">MISSIONS READY:</span>
              <span className="status-val secure">15 CIPHERS (3 TIERS)</span>
            </div>
          </div>

          {/* Action CTA Area */}
          <div className="boot-action-area">
            <button
              type="button"
              className="btn-start-mission"
              onClick={handleStart}
              autoFocus
            >
              <span className="btn-glow-layer"></span>
              <span className="btn-content">
                <span>START MISSION // ACCESS NEXUS</span>
                <ArrowRight size={18} className="btn-arrow" />
              </span>
            </button>
            <p className="boot-hint">
              Press <kbd>[ENTER]</kbd> or <kbd>[SPACE]</kbd> to bypass boot sequence and enter command terminal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
