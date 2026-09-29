import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Home, Award, Clock, Zap, BookOpen, Palette } from 'lucide-react';
import { getRankByScore } from '../data/words';

export default function GameHeader({
  score,
  scoreDelta,
  missionNumber,
  totalMissions,
  difficultyLabel = 'SIMPLE',
  difficultyColor = '#00ff88',
  totalSolved = 0,
  timeLeft = 60,
  streak = 1,
  theme = 'cyan',
  onChangeTheme,
  onOpenCodex,
  soundEnabled,
  onToggleSound,
  onReturnHome
}) {
  const currentRank = getRankByScore(totalSolved);
  const isTimeCritical = timeLeft <= 15;
  const isTimeUrgent = timeLeft <= 8;

  const cycleTheme = () => {
    const themes = ['cyan', 'matrix', 'violet'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    onChangeTheme(themes[nextIdx]);
  };

  return (
    <header className="nexus-game-header">
      <div className="header-left">
        <button
          className="brand-link"
          onClick={onReturnHome}
          title="Return to Nexus Landing"
          aria-label="Return to Nexus Landing"
        >
          <Terminal size={18} className="brand-icon" />
          <span className="brand-name">NEXUS</span>
          <span className="brand-sep">//</span>
          <span className="brand-sub">DECRYPTION</span>
        </button>

        {/* Difficulty Pill Badge */}
        <div
          className="header-diff-badge"
          style={{
            borderColor: `${difficultyColor}40`,
            backgroundColor: `${difficultyColor}12`,
            color: difficultyColor
          }}
        >
          <span
            className="diff-badge-dot"
            style={{ backgroundColor: difficultyColor, boxShadow: `0 0 8px ${difficultyColor}` }}
          ></span>
          <span className="diff-badge-label">{difficultyLabel}</span>
        </div>

        {/* Mission Counter */}
        <div className="mission-counter-badge">
          <span className="mission-prefix">MISSION</span>
          <span className="mission-nums">
            {String(missionNumber).padStart(2, '0')} / {String(totalMissions).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="header-center">
        {/* Mission Countdown Timer */}
        <div className={`mission-timer-pill ${isTimeCritical ? 'timer-critical' : ''} ${isTimeUrgent ? 'timer-urgent' : ''}`}>
          <Clock size={14} className="timer-clock-icon" />
          <span className="timer-seconds-text">{String(timeLeft).padStart(2, '0')}s</span>
          {isTimeCritical && <span className="timer-warning-blip"></span>}
        </div>

        {/* Decryption Streak Combo Badge */}
        {streak > 1 && (
          <div className="decryption-streak-pill">
            <Zap size={13} className="streak-zap-icon" />
            <span className="streak-multiplier-text">x{streak} COMBO</span>
          </div>
        )}
      </div>

      <div className="header-right">
        {/* Operator Rank Badge */}
        <div className="operator-rank-badge" title="Current Operator Rank">
          <Award size={13} style={{ color: currentRank.badgeColor }} />
          <span className="rank-text" style={{ color: currentRank.badgeColor }}>
            {currentRank.rank}
          </span>
        </div>

        {/* Animated Score Display */}
        <div className="score-badge-container">
          <span className="score-label">SCORE</span>
          <div className="score-val-wrapper">
            <span className="score-digits">{score.toLocaleString()}</span>
            {scoreDelta && (
              <span
                key={scoreDelta.id}
                className={`score-delta-floater ${scoreDelta.value >= 0 ? 'delta-positive' : 'delta-negative'}`}
              >
                {scoreDelta.value >= 0 ? `+${scoreDelta.value}` : scoreDelta.value}
              </span>
            )}
          </div>
        </div>

        {/* Theme Switcher Button */}
        <button
          className="theme-btn"
          onClick={cycleTheme}
          title={`Theme: ${theme.toUpperCase()} (Click to Switch: Cyan / Matrix / Violet)`}
          aria-label="Switch Cyberpunk Theme"
        >
          <Palette size={16} />
          <span className="theme-text-tag">{theme.slice(0, 3).toUpperCase()}</span>
        </button>

        {/* Codex Archive Button */}
        <button
          className="codex-trigger-btn"
          onClick={onOpenCodex}
          title="Open Intelligence Archive / Codex"
          aria-label="Open Intelligence Archive"
        >
          <BookOpen size={16} />
        </button>

        {/* Sound Toggle */}
        <button
          className={`sound-btn ${soundEnabled ? 'active' : 'muted'}`}
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          aria-label={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Home / Exit */}
        <button
          className="home-btn"
          onClick={onReturnHome}
          title="Exit to Landing"
          aria-label="Exit to Landing"
        >
          <Home size={16} />
        </button>
      </div>
    </header>
  );
}
