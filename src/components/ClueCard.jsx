import React from 'react';
import { Lightbulb, Lock, Unlock, Shield, Tag, Eye } from 'lucide-react';
import { DIFFICULTY_TIERS } from '../data/words';

export default function ClueCard({
  missionWord,
  hintLevel,
  onRevealHint,
  score
}) {
  const { category, difficulty, primaryClue, hint1, hint2 } = missionWord;
  const tierConfig = DIFFICULTY_TIERS[difficulty] || DIFFICULTY_TIERS.EASY;

  return (
    <div className="mission-clue-card">
      {/* Ambient Laser Scanner Line */}
      <div className="clue-scanner-beam" aria-hidden="true"></div>

      {/* Top Intel Meta Header */}
      <div className="clue-meta-header">
        <div className="meta-left">
          <div className="intel-title-group">
            <Shield size={14} className="intel-shield-icon" />
            <span className="intel-title">MISSION INTELLIGENCE</span>
          </div>
          <span className="intel-id-tag">{missionWord.id}</span>
        </div>

        <div className="meta-right">
          <div className="category-pill">
            <Tag size={11} />
            <span>{category}</span>
          </div>
          <div
            className={`difficulty-pill diff-${difficulty.toLowerCase()}`}
            title={`Tier: ${tierConfig.label} (Multiplier: x${tierConfig.multiplier})`}
          >
            <span>
              {difficulty === 'EASY' ? '🟢 SIMPLE (+100 PTS)' : difficulty === 'MEDIUM' ? '🟡 MEDIUM (+150 PTS)' : '🔴 HARD (+200 PTS)'}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Clue Section */}
      <div className="primary-clue-box">
        <div className="clue-tag-row">
          <span className="clue-level-tag">PRIMARY TRANSMISSION</span>
          <span className="clue-clearance" style={{ color: tierConfig.color }}>
            {tierConfig.label} TIER INTEL
          </span>
        </div>
        <p className="primary-clue-text">
          "{primaryClue}"
        </p>
      </div>

      {/* Hint Decryption Intelligence Section */}
      <div className="tactical-hints-container">
        <div className="hints-header-row">
          <span className="hints-section-title">DECRYPTED TACTICAL HINTS</span>
          <span className="hints-used-badge">
            {hintLevel === 0 ? '0 / 2 UNLOCKED' : `${hintLevel} / 2 UNLOCKED`}
          </span>
        </div>

        {/* Hint 01 Card */}
        <div className={`hint-slot-card ${hintLevel >= 1 ? 'hint-unlocked' : 'hint-locked'}`}>
          <div className="hint-slot-indicator">
            {hintLevel >= 1 ? (
              <Unlock size={13} className="hint-unlocked-icon" />
            ) : (
              <Lock size={13} className="hint-locked-icon" />
            )}
            <span className="hint-slot-label">HINT 01</span>
          </div>

          <div className="hint-slot-body">
            {hintLevel >= 1 ? (
              <p className="hint-revealed-text">"{hint1}"</p>
            ) : (
              <div className="hint-placeholder-mask">
                <span className="mask-bar"></span>
                <span className="mask-text">TACTICAL CLUE ENCRYPTED</span>
              </div>
            )}
          </div>
        </div>

        {/* Hint 02 Card */}
        <div className={`hint-slot-card ${hintLevel >= 2 ? 'hint-unlocked' : 'hint-locked'}`}>
          <div className="hint-slot-indicator">
            {hintLevel >= 2 ? (
              <Unlock size={13} className="hint-unlocked-icon" />
            ) : (
              <Lock size={13} className="hint-locked-icon" />
            )}
            <span className="hint-slot-label">HINT 02 (FINAL)</span>
          </div>

          <div className="hint-slot-body">
            {hintLevel >= 2 ? (
              <p className="hint-revealed-text">"{hint2}"</p>
            ) : (
              <div className="hint-placeholder-mask">
                <span className="mask-bar"></span>
                <span className="mask-text">HIGH-LEVEL CLUE RESTRICTED</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hint Action CTA */}
      <div className="hint-action-bar">
        {hintLevel === 0 && (
          <button
            className="btn-reveal-hint"
            onClick={() => onRevealHint(1)}
            disabled={score < 100}
            title={score < 100 ? "Insufficient score to decrypt hint" : "Reveal Hint 01 (-100 Points)"}
          >
            <Lightbulb size={16} className="hint-btn-icon" />
            <span>REVEAL HINT 01</span>
            <span className="hint-cost-pill">-100 PTS</span>
          </button>
        )}

        {hintLevel === 1 && (
          <button
            className="btn-reveal-hint btn-final-hint"
            onClick={() => onRevealHint(2)}
            disabled={score < 200}
            title={score < 200 ? "Insufficient score to decrypt hint" : "Reveal Final Hint (-200 Points)"}
          >
            <Eye size={16} className="hint-btn-icon" />
            <span>REVEAL FINAL HINT</span>
            <span className="hint-cost-pill">-200 PTS</span>
          </button>
        )}

        {hintLevel >= 2 && (
          <div className="hints-depleted-state">
            <Unlock size={14} className="all-unlocked-icon" />
            <span>ALL TACTICAL INTELLIGENCE UNLOCKED</span>
          </div>
        )}
      </div>
    </div>
  );
}
