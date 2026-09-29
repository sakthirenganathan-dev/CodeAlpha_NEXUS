import React from 'react';
import { Lock, RotateCcw, Home, AlertOctagon } from 'lucide-react';

export default function GameOverModal({
  secretWord,
  incorrectGuesses,
  maxFailures = 6,
  onTryAgain,
  onReturnToBoot
}) {
  return (
    <div className="modal-overlay gameover-overlay" role="dialog" aria-modal="true">
      <div className="nexus-modal gameover-card">
        {/* Glow and scanline effect */}
        <div className="card-ambient-glow gameover-glow"></div>
        <div className="gameover-scanline"></div>

        <div className="modal-top-tag tag-warning">
          <AlertOctagon size={14} className="tag-alert" />
          <span>SECURITY THREAT DEFENSE TRIGGERED</span>
        </div>

        <div className="modal-hero-icon gameover-icon-wrap">
          <Lock size={44} className="gameover-icon" />
        </div>

        <h2 className="modal-headline text-red">SYSTEM LOCKED</h2>
        <p className="modal-subheadline">DECRYPTION FAILED</p>

        <div className="modal-stats-card gameover-stats">
          <div className="stat-line">
            <span className="stat-label">TARGET WORD</span>
            <span className="stat-value highlight-word-red">{secretWord}</span>
          </div>
          <div className="stat-line">
            <span className="stat-label">FAILED ATTEMPTS</span>
            <span className="stat-value text-red">{incorrectGuesses} / {maxFailures}</span>
          </div>
          <div className="stat-line">
            <span className="stat-label">SYSTEM INTEGRITY</span>
            <span className="stat-value text-red">0%</span>
          </div>
          <div className="stat-line">
            <span className="stat-label">MISSION STATUS</span>
            <span className="stat-value status-badge-locked">LOCKED</span>
          </div>
        </div>

        <div className="modal-actions-row">
          <button className="btn-modal btn-primary-gameover" onClick={onTryAgain} autoFocus>
            <RotateCcw size={16} />
            <span>TRY AGAIN</span>
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
