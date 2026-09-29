import React from 'react';
import { Volume2, VolumeX, Shield, Terminal } from 'lucide-react';

export default function Header({ soundEnabled, onToggleSound, onResetToBoot }) {
  return (
    <header className="nexus-header">
      <div className="header-left">
        <div className="logo-badge" onClick={onResetToBoot} role="button" tabIndex={0} title="Return to Nexus Boot">
          <Terminal className="logo-icon" size={20} />
          <span className="logo-title">NEXUS</span>
        </div>
        <div className="system-tag">
          <span className="separator">//</span>
          <span className="system-subtitle">WORD DECRYPTION SYSTEM</span>
        </div>
      </div>

      <div className="header-right">
        <div className="status-pill online">
          <span className="status-dot"></span>
          <span className="status-label">ONLINE</span>
        </div>

        <button
          className={`sound-toggle ${soundEnabled ? 'active' : 'muted'}`}
          onClick={onToggleSound}
          title={soundEnabled ? 'Audio Synthesis Active (Click to Mute)' : 'Audio Synthesis Muted (Click to Unmute)'}
          aria-label="Toggle Audio Sound"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span className="sound-text">{soundEnabled ? 'AUDIO' : 'MUTED'}</span>
        </button>
      </div>
    </header>
  );
}
