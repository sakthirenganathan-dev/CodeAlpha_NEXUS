import React from 'react';
import { ArrowRight, Shield, KeyRound, Sparkles, Brain, Lock, Award, Flame, Zap, BookOpen, Palette } from 'lucide-react';
import { DIFFICULTY_TIERS, MISSION_WORDS, getRankByScore } from '../data/words';

export default function LandingScreen({
  onStartGame,
  selectedDifficulty,
  onChangeDifficulty,
  totalSolved = 0,
  highScore = 0,
  theme = 'cyan',
  onChangeTheme,
  onOpenCodex
}) {
  const currentRank = getRankByScore(totalSolved);

  const easyCount = MISSION_WORDS.filter(w => w.difficulty === 'EASY').length;
  const mediumCount = MISSION_WORDS.filter(w => w.difficulty === 'MEDIUM').length;
  const hardCount = MISSION_WORDS.filter(w => w.difficulty === 'HARD').length;
  const totalCount = MISSION_WORDS.length;

  const cycleTheme = () => {
    const themes = ['cyan', 'matrix', 'violet'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    onChangeTheme(themes[nextIdx]);
  };

  return (
    <div className="landing-container">
      {/* Background Cyber Radar Visual */}
      <div className="landing-radar-wrapper" aria-hidden="true">
        <div className="radar-circle circle-1"></div>
        <div className="radar-circle circle-2"></div>
        <div className="radar-circle circle-3"></div>
        <div className="radar-crosshair-h"></div>
        <div className="radar-crosshair-v"></div>
        <div className="radar-sweep"></div>
      </div>

      <div className="landing-content">
        {/* Top Controls Row */}
        <div className="landing-top-bar-controls">
          <div className="landing-top-tag">
            <span className="pulse-dot"></span>
            <span>CLEARANCE:</span>
            <span className="rank-name-tag" style={{ color: currentRank.badgeColor }}>
              {currentRank.rank}
            </span>
          </div>

          <div className="landing-quick-actions">
            <button
              className="landing-theme-pill"
              onClick={cycleTheme}
              title="Change Cyberpunk Color Theme"
            >
              <Palette size={13} />
              <span>THEME: {theme.toUpperCase()}</span>
            </button>

            <button
              className="landing-codex-pill"
              onClick={onOpenCodex}
              title="Open Classified Intelligence Archive"
            >
              <BookOpen size={13} />
              <span>ARCHIVE ({totalSolved}/{totalCount})</span>
            </button>
          </div>
        </div>

        <h1 className="landing-hero-title">
          <span className="hero-nexus">NEXUS</span>
          <span className="hero-sub">WORD DECRYPTION</span>
        </h1>

        <p className="landing-tagline">
          "Analyze the clue. Decode the word. Break the system."
        </p>

        {/* Difficulty Selection Deck */}
        <div className="difficulty-selection-deck">
          <div className="deck-header">
            <span className="deck-label">SELECT MISSION TIER:</span>
            <span className="deck-count-total">{totalCount} TOTAL QUESTIONS</span>
          </div>

          <div className="difficulty-tabs-row" role="tablist" aria-label="Difficulty Filter">
            <button
              type="button"
              className={`diff-tab-btn ${selectedDifficulty === 'ALL' ? 'tab-active' : ''}`}
              onClick={() => onChangeDifficulty('ALL')}
            >
              <Zap size={14} className="tab-icon" />
              <span className="tab-title">CAMPAIGN</span>
              <span className="tab-badge-count">{totalCount}</span>
            </button>

            <button
              type="button"
              className={`diff-tab-btn tab-easy ${selectedDifficulty === 'EASY' ? 'tab-active' : ''}`}
              onClick={() => onChangeDifficulty('EASY')}
            >
              <span className="tier-dot green-dot"></span>
              <span className="tab-title">SIMPLE</span>
              <span className="tab-badge-count">{easyCount}</span>
            </button>

            <button
              type="button"
              className={`diff-tab-btn tab-medium ${selectedDifficulty === 'MEDIUM' ? 'tab-active' : ''}`}
              onClick={() => onChangeDifficulty('MEDIUM')}
            >
              <span className="tier-dot yellow-dot"></span>
              <span className="tab-title">MEDIUM</span>
              <span className="tab-badge-count">{mediumCount}</span>
            </button>

            <button
              type="button"
              className={`diff-tab-btn tab-hard ${selectedDifficulty === 'HARD' ? 'tab-active' : ''}`}
              onClick={() => onChangeDifficulty('HARD')}
            >
              <Flame size={14} className="tab-icon red-icon" />
              <span className="tab-title">HARD</span>
              <span className="tab-badge-count">{hardCount}</span>
            </button>
          </div>

          <div className="diff-tier-description">
            {selectedDifficulty === 'ALL' && (
              <span>Progressive Full Campaign: Ascends from Simple foundation to Hard cryptography.</span>
            )}
            {selectedDifficulty === 'EASY' && (
              <span>🟢 Simple Tier: {DIFFICULTY_TIERS.EASY.desc} (+100 PTS / letter, 6 tries).</span>
            )}
            {selectedDifficulty === 'MEDIUM' && (
              <span>🟡 Medium Tier: {DIFFICULTY_TIERS.MEDIUM.desc} (+150 PTS / letter, 6 tries).</span>
            )}
            {selectedDifficulty === 'HARD' && (
              <span>🔴 Hard Tier: {DIFFICULTY_TIERS.HARD.desc} (+200 PTS / letter, 5 tries max).</span>
            )}
          </div>
        </div>

        {/* Main CTA Button */}
        <div className="landing-cta-wrap">
          <button
            className="btn-landing-cta"
            onClick={onStartGame}
            autoFocus
          >
            <span className="cta-glow"></span>
            <span className="cta-content">
              <span>DEPLOY MISSION</span>
              <ArrowRight size={20} className="cta-arrow" />
            </span>
          </button>
        </div>

        {/* Game Model Stat Cards with Question Segregation */}
        <div className="landing-stats-grid four-col">
          <div className="landing-stat-card">
            <span className="stat-big-val text-green">{easyCount}</span>
            <span className="stat-card-title">SIMPLE</span>
            <span className="stat-card-desc">Tier 1 Essentials</span>
          </div>

          <div className="landing-stat-card">
            <span className="stat-big-val text-yellow">{mediumCount}</span>
            <span className="stat-card-title">MEDIUM</span>
            <span className="stat-card-desc">Tier 2 Networks</span>
          </div>

          <div className="landing-stat-card">
            <span className="stat-big-val text-red">{hardCount}</span>
            <span className="stat-card-title">HARD</span>
            <span className="stat-card-desc">Tier 3 Ciphers</span>
          </div>

          <div className="landing-stat-card">
            <span className="stat-big-val text-cyan">{highScore > 0 ? highScore.toLocaleString() : '1,000'}</span>
            <span className="stat-card-title">BEST SCORE</span>
            <span className="stat-card-desc">{totalSolved} Solved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
