import React from 'react';
import { ShieldCheck, RotateCcw, Home, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VictoryModal({
  secretWord,
  incorrectGuesses,
  maxFailures = 6,
  onNewMission,
  onReturnToBoot
}) {
  const integrityPct = Math.round(((maxFailures - incorrectGuesses) / maxFailures) * 100);

  return (
    <div className="modal-overlay victory-overlay" role="dialog" aria-modal="true">
      <div className="nexus-modal victory-card">
        {/* Glow ambient background element */}
        <div className="card-ambient-glow victory-glow"></div>

        <div className="modal-top-tag">
          <Sparkles size={14} className="tag-sparkle" />
          <span>CYBER OVERRIDE SUCCESSFUL</span>
        </div>

        <div className="modal-hero-icon victory-icon-wrap">
          <CheckCircle2 size={44} className="victory-icon" />
        </div>

        <h2 className="modal-headline text-green">ACCESS GRANTED</h2>
        <p className="modal-subheadline">DECRYPTION COMPLETE</p>

        <div className="modal-stats-card">
          <div className="stat-line">
            <span className="stat-label">TARGET WORD</span>
            <span className="stat-value highlight-word">{secretWord}</span>
          </div>
          <div className="stat-line">
            <span className="stat-label">FAILED ATTEMPTS</span>
            <span className="stat-value">{incorrectGuesses} / {maxFailures}</span>
          </div>
          <div className="stat-line">
            <span className="stat-label">SYSTEM INTEGRITY</span>
            <span className="stat-value text-green">{integrityPct}%</span>
          </div>
          <div className="stat-line">
            <span className="stat-label">MISSION STATUS</span>
            <span className="stat-value status-badge-success">SUCCESS</span>
          </div>
        </div>

        <div className="modal-actions-row">
          <button className="btn-modal btn-primary-victory" onClick={onNewMission} autoFocus>
            <RotateCcw size={16} />
            <span>NEW MISSION</span>
          </button>
          <button className="btn-modal btn-secondary-nexus" onClick={onReturnToBoot}>
            <Home size={16} />
            <span>RETURN TO NEXUS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
