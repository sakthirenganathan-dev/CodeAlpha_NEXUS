import React, { useState, useEffect } from 'react';
import { ArrowRight, Volume2, VolumeX, BookOpen, Palette, Sparkles, Shield, Cpu, Zap } from 'lucide-react';
import { DIFFICULTY_TIERS, MISSION_WORDS } from '../data/words';
import { soundManager } from '../utils/sound';

export default function LandingScreen({
  onStartGame,
  selectedDifficulty = 'ALL',
  onChangeDifficulty,
  totalSolved = 0,
  highScore = 0,
  theme = 'cyan',
  onChangeTheme,
  onOpenCodex,
  soundEnabled = true,
  onToggleSound
}) {
  // Boot status sequence states: 'init' -> 'analyzing' -> 'ready'
  const [bootPhase, setBootPhase] = useState('init');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBootPhase('analyzing'), 500);
    const t2 = setTimeout(() => setBootPhase('ready'), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const cycleTheme = () => {
    const themes = ['cyan', 'matrix', 'violet'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    onChangeTheme(themes[nextIdx]);
  };

  const handleStartMissionClick = () => {
    if (isTransitioning) return;
    try {
      soundManager.playPowerup();
    } catch (_) {}
    setIsTransitioning(true);

    // Cinematic exit transition timing (380ms)
    setTimeout(() => {
      onStartGame();
    }, 380);
  };

  const easyCount = MISSION_WORDS.filter(w => w.difficulty === 'EASY').length;
  const mediumCount = MISSION_WORDS.filter(w => w.difficulty === 'MEDIUM').length;
  const hardCount = MISSION_WORDS.filter(w => w.difficulty === 'HARD').length;
  const activeWordCount = selectedDifficulty === 'ALL'
    ? MISSION_WORDS.length
    : selectedDifficulty === 'EASY'
    ? easyCount
    : selectedDifficulty === 'MEDIUM'
    ? mediumCount
    : hardCount;

  const currentFailures = selectedDifficulty === 'HARD' ? 5 : 6;

  return (
    <div className={`nexus-launch-viewport ${isTransitioning ? 'launch-transition-out' : ''}`}>
      {/* Deep Atmospheric Background & Core Lighting */}
      <div className="launch-ambient-canvas" aria-hidden="true">
        <div className="launch-vignette-overlay"></div>
        <div className="launch-grid-mesh"></div>
        <div className="launch-core-glow-spot"></div>
      </div>

      {/* Decorative System Telemetry Labels (Subtle Corner Data) */}
      <div className="telemetry-node telemetry-tl" aria-hidden="true">
        <span className="node-dot"></span>
        <span className="node-text">NEXUS CORE: ONLINE</span>
      </div>
      <div className="telemetry-node telemetry-tr" aria-hidden="true">
        <span className="node-dot"></span>
        <span className="node-text">ENCRYPTION: ACTIVE</span>
      </div>
      <div className="telemetry-node telemetry-bl" aria-hidden="true">
        <span className="node-dot"></span>
        <span className="node-text">SECURITY: LEVEL 04</span>
      </div>
      <div className="telemetry-node telemetry-br" aria-hidden="true">
        <span className="node-dot"></span>
        <span className="node-text">PROTOCOL: READY</span>
      </div>

      {/* Minimal Top Navigation Header */}
      <header className="launch-minimal-header">
        <div className="header-brand-group">
          <span className="brand-primary">NEXUS</span>
          <span className="brand-divider">//</span>
          <span className="brand-secondary">WORD DECRYPTION</span>
        </div>

        <div className="header-status-controls">
          <div className="system-online-pill">
            <span className="pulse-green-indicator"></span>
            <span className="status-label">SYSTEM ONLINE</span>
          </div>

          <div className="header-actions-row">
            {onToggleSound && (
              <button
                type="button"
                className="header-ctrl-btn"
                onClick={onToggleSound}
                title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
                aria-label="Toggle Audio"
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span className="ctrl-btn-text">SOUND</span>
              </button>
            )}

            <button
              type="button"
              className="header-ctrl-btn"
              onClick={onOpenCodex}
              title="Open Intelligence Archive (Codex)"
              aria-label="Open Intel Archive"
            >
              <BookOpen size={14} />
              <span className="ctrl-btn-text">INTEL</span>
            </button>

            <button
              type="button"
              className="header-ctrl-btn theme-toggle-btn"
              onClick={cycleTheme}
              title={`Switch Theme: Current ${theme.toUpperCase()}`}
              aria-label="Cycle Theme"
            >
              <Palette size={14} />
              <span className="ctrl-btn-text">{theme.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Centered Cinematic Hero */}
      <main className="launch-center-stage">
        {/* Central Decryption Core Visual (CSS/SVG Layer) */}
        <div className="decryption-core-container" aria-hidden="true">
          {/* Subtle Outer Rotating Ring */}
          <div className="core-ring core-ring-outer"></div>

          {/* Counter-Rotating Segmented Ring */}
          <div className="core-ring core-ring-segmented"></div>

          {/* Inner Dashed Precision Ring */}
          <div className="core-ring core-ring-inner"></div>

          {/* Orbiting Tech Nodes */}
          <div className="core-orbital-track orbit-1">
            <span className="orbit-node node-a"></span>
          </div>
          <div className="core-orbital-track orbit-2">
            <span className="orbit-node node-b"></span>
          </div>

          {/* SVG Tech Overlay & Crosshairs */}
          <svg className="core-svg-overlay" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="230" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1" fill="none" />
            <circle cx="250" cy="250" r="180" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="1" strokeDasharray="6 8" fill="none" />
            <circle cx="250" cy="250" r="120" stroke="rgba(0, 240, 255, 0.18)" strokeWidth="1" strokeDasharray="3 6" fill="none" />
            <line x1="250" y1="20" x2="250" y2="480" stroke="rgba(0, 240, 255, 0.06)" strokeWidth="1" />
            <line x1="20" y1="250" x2="480" y2="250" stroke="rgba(0, 240, 255, 0.06)" strokeWidth="1" />
          </svg>

          {/* Central Glowing Core Center */}
          <div className="core-center-pulsar">
            <span className="pulsar-dot"></span>
            <span className="pulsar-halo"></span>
            <span className="pulsar-label">NEXUS CORE</span>
          </div>
        </div>

        {/* Foreground Hero Content Stack */}
        <div className="launch-hero-stack">
          {/* Small Eyebrow Protocol Label */}
          <div className="hero-eyebrow">
            <span className="eyebrow-accent">[</span>
            <span className="eyebrow-text">NEXUS // DECRYPTION PROTOCOL</span>
            <span className="eyebrow-accent">]</span>
          </div>

          {/* Main Title Identity */}
          <div className="hero-title-group">
            <h1 className="hero-main-title">NEXUS</h1>
            <h2 className="hero-sub-title">WORD DECRYPTION</h2>
          </div>

          {/* Elegant Boot Status Indicator */}
          <div className="boot-status-capsule">
            <span className="capsule-prefix">NEXUS CORE</span>
            <span className="capsule-sep">•</span>
            {bootPhase === 'init' && (
              <span className="capsule-state state-fade">INITIALIZING...</span>
            )}
            {bootPhase === 'analyzing' && (
              <span className="capsule-state state-fade">ANALYZING PROTOCOLS...</span>
            )}
            {bootPhase === 'ready' && (
              <span className="capsule-state state-ready">
                <span className="status-micro-dot"></span>
                SYSTEM READY
              </span>
            )}
          </div>

          {/* Cinematic Tagline */}
          <p className="hero-tagline">
            Analyze the clue. Decode the word. Break the system.
          </p>

          {/* Difficulty Tier Selector (Compact & Integrated) */}
          <div className="tier-selector-compact" role="tablist" aria-label="Difficulty Selection">
            <button
              type="button"
              className={`tier-chip ${selectedDifficulty === 'ALL' ? 'chip-active' : ''}`}
              onClick={() => onChangeDifficulty && onChangeDifficulty('ALL')}
            >
              <span>ALL TIERS (15)</span>
            </button>

            <button
              type="button"
              className={`tier-chip chip-easy ${selectedDifficulty === 'EASY' ? 'chip-active' : ''}`}
              onClick={() => onChangeDifficulty && onChangeDifficulty('EASY')}
            >
              <span className="chip-dot green-dot"></span>
              <span>SIMPLE (5)</span>
            </button>

            <button
              type="button"
              className={`tier-chip chip-medium ${selectedDifficulty === 'MEDIUM' ? 'chip-active' : ''}`}
              onClick={() => onChangeDifficulty && onChangeDifficulty('MEDIUM')}
            >
              <span className="chip-dot yellow-dot"></span>
              <span>MEDIUM (5)</span>
            </button>

            <button
              type="button"
              className={`tier-chip chip-hard ${selectedDifficulty === 'HARD' ? 'chip-active' : ''}`}
              onClick={() => onChangeDifficulty && onChangeDifficulty('HARD')}
            >
              <span className="chip-dot red-dot"></span>
              <span>HARD (5)</span>
            </button>
          </div>

          {/* Primary Call-to-Action Button */}
          <div className="hero-cta-wrapper">
            <button
              type="button"
              className="btn-start-mission-epic"
              onClick={handleStartMissionClick}
              autoFocus
            >
              <span className="btn-epic-glow"></span>
              <span className="btn-epic-content">
                <span>START MISSION</span>
                <ArrowRight size={18} className="cta-arrow-icon" />
              </span>
            </button>
          </div>

          {/* Compact Premium Stats Bar */}
          <div className="hero-compact-stats">
            <div className="compact-stat-cell">
              <span className="stat-num">{activeWordCount}</span>
              <span className="stat-sub">WORDS</span>
            </div>

            <div className="stat-separator">•</div>

            <div className="compact-stat-cell">
              <span className="stat-num">{currentFailures}</span>
              <span className="stat-sub">FAILURES</span>
            </div>

            <div className="stat-separator">•</div>

            <div className="compact-stat-cell">
              <span className="stat-num">∞</span>
              <span className="stat-sub">MISSIONS</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Subtle Status Bar */}
      <footer className="launch-footer-bar">
        <span className="footer-meta-item">NEXUS SEC // v5.2 OPERATIONAL</span>
        <span className="footer-meta-item">BEST: {highScore > 0 ? highScore.toLocaleString() : '1,000'} PTS</span>
        <span className="footer-meta-item">SOLVED: {totalSolved}</span>
      </footer>
    </div>
  );
}
