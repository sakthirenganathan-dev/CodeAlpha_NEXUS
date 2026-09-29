import React from 'react';
import { CheckCircle2, ArrowRight, RotateCcw, Home, Sparkles, Award } from 'lucide-react';
import { DIFFICULTY_TIERS, getRankByScore } from '../data/words';

export default function VictoryScreen({
  missionWord,
  score,
  wrongGuesses,
  maxFailures = 6,
  hintLevel,
  bonusPoints = 500,
  totalSolved = 1,
  isLastMission,
  onNextMission,
  onPlayAgain,
  onReturnToNexus
}) {
  const tierConfig = DIFFICULTY_TIERS[missionWord.difficulty] || DIFFICULTY_TIERS.EASY;
  const currentRank = getRankByScore(totalSolved);

  return (
    <div className="game-modal-overlay victory-mode" role="dialog" aria-modal="true">
      <div className="nexus-outcome-card victory-card">
        {/* Subtle Ambient Radial Glow */}
        <div className="outcome-ambient-glow glow-green"></div>

        <div className="outcome-top-pill pill-green">
          <Sparkles size={14} className="sparkle-icon" />
          <span>CYBER OVERRIDE SUCCESSFUL</span>
        </div>

        {/* Large Animated Check Icon */}
        <div className="outcome-hero-icon-wrap icon-green">
          <CheckCircle2 size={54} className="outcome-check-icon" />
        </div>

        <h2 className="outcome-headline text-green">ACCESS GRANTED</h2>
        <p className="outcome-subheadline">DECRYPTION COMPLETE</p>

        {/* Intelligence Statistics Card */}
        <div className="outcome-stats-panel">
          <div className="stat-row">
            <span className="stat-label">TARGET WORD</span>
            <span className="stat-val text-green highlight-word">{missionWord.word}</span>
          </div>

          <div className="stat-row">
            <span className="stat-label">TIER &amp; CATEGORY</span>
            <span className="stat-val">
              <span style={{ color: tierConfig.color, fontWeight: 800 }}>{tierConfig.label}</span> • {missionWord.category}
            </span>
          </div>

          <div className="stat-row">
            <span className="stat-label">SESSION SCORE</span>
            <div className="score-stat-group">
              <span className="stat-val text-cyan font-bold">{score.toLocaleString()} PTS</span>
              <span className="bonus-tag">+{bonusPoints} BONUS</span>
            </div>
          </div>

          <div className="stat-row">
            <span className="stat-label">FAILED ATTEMPTS</span>
            <span className="stat-val">{wrongGuesses} / {maxFailures}</span>
          </div>

          <div className="stat-row">
            <span className="stat-label">OPERATOR RANK</span>
            <span className="stat-val" style={{ color: currentRank.badgeColor, fontWeight: 800 }}>
              {currentRank.rank}
            </span>
          </div>

          <div className="stat-row">
            <span className="stat-label">MISSION STATUS</span>
            <span className="stat-badge badge-success">SUCCESS</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="outcome-actions-grid">
          <button
            className="btn-outcome btn-primary-next"
            onClick={onNextMission}
            autoFocus
          >
            <span>{isLastMission ? 'START NEXT CYCLE' : 'NEXT MISSION'}</span>
            <ArrowRight size={17} />
          </button>

          <button
            className="btn-outcome btn-secondary-replay"
            onClick={onPlayAgain}
          >
            <RotateCcw size={16} />
            <span>PLAY AGAIN</span>
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
