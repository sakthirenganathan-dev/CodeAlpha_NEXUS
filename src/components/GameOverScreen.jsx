import React from 'react';
import { Lock, RotateCcw, Home, AlertOctagon } from 'lucide-react';
import { DIFFICULTY_TIERS, getRankByScore } from '../data/words';

export default function GameOverScreen({
  missionWord,
  score,
  wrongGuesses,
  maxFailures = 6,
  hintLevel,
  totalSolved = 0,
  onTryAgain,
  onReturnToNexus
}) {
  const tierConfig = DIFFICULTY_TIERS[missionWord.difficulty] || DIFFICULTY_TIERS.EASY;
  const currentRank = getRankByScore(totalSolved);

  return (
    <div className="game-modal-overlay gameover-mode" role="dialog" aria-modal="true">
      <div className="nexus-outcome-card gameover-card">
        {/* Subtle Ambient Red Glow & Scanline */}
        <div className="outcome-ambient-glow glow-red"></div>
        <div className="gameover-scanline-stripes"></div>

        <div className="outcome-top-pill pill-red">
          <AlertOctagon size={14} className="alert-icon" />
          <span>SECURITY THREAT DEFENSE ACTIVATED</span>
        </div>

        {/* Warning Icon */}
        <div className="outcome-hero-icon-wrap icon-red">
          <Lock size={54} className="outcome-lock-icon" />
        </div>

        <h2 className="outcome-headline text-red">SYSTEM LOCKED</h2>
        <p className="outcome-subheadline">DECRYPTION FAILED</p>

        {/* Statistics Card */}
        <div className="outcome-stats-panel stats-red">
          <div className="stat-row">
            <span className="stat-label">TARGET WORD</span>
            <span className="stat-val text-red highlight-word">{missionWord.word}</span>
          </div>

          <div className="stat-row">
            <span className="stat-label">TIER &amp; CATEGORY</span>
            <span className="stat-val">
              <span style={{ color: tierConfig.color, fontWeight: 800 }}>{tierConfig.label}</span> • {missionWord.category}
            </span>
          </div>

          <div className="stat-row">
            <span className="stat-label">FINAL SCORE</span>
            <span className="stat-val text-red font-bold">{score.toLocaleString()} PTS</span>
          </div>

          <div className="stat-row">
            <span className="stat-label">FAILED ATTEMPTS</span>
            <span className="stat-val text-red">{wrongGuesses} / {maxFailures}</span>
          </div>

          <div className="stat-row">
            <span className="stat-label">OPERATOR RANK</span>
            <span className="stat-val" style={{ color: currentRank.badgeColor, fontWeight: 800 }}>
              {currentRank.rank}
            </span>
          </div>

          <div className="stat-row">
            <span className="stat-label">MISSION STATUS</span>
            <span className="stat-badge badge-locked">LOCKED</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="outcome-actions-grid two-col">
          <button
            className="btn-outcome btn-primary-tryagain"
            onClick={onTryAgain}
            autoFocus
          >
            <RotateCcw size={16} />
            <span>TRY AGAIN</span>
          </button>

          <button
            className="btn-outcome btn-tertiary-nexus"
            onClick={onReturnToNexus}
          >
            <Home size={16} />
            <span>RETURN TO NEXUS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
