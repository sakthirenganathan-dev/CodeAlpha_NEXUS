import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  BookOpen,
  Palette,
  Infinity as InfinityIcon,
  Shield,
  Zap,
  Terminal,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
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
  const [bootPhase, setBootPhase] = useState('init');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Mouse Parallax Physics for 3D Cyber Core Depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });
  const coreRotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const coreRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setBootPhase('analyzing'), 450);
    const t2 = setTimeout(() => setBootPhase('ready'), 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const cycleTheme = () => {
    try { soundManager.playKeyClick(); } catch (_) {}
    const themes = ['cyan', 'matrix', 'violet'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    onChangeTheme(themes[nextIdx]);
  };

  const handleTierClick = (tier) => {
    try { soundManager.playKeyClick(); } catch (_) {}
    if (onChangeDifficulty) {
      onChangeDifficulty(tier);
    }
  };

  const handleStartMissionClick = () => {
    if (isTransitioning) return;
    try { soundManager.playVictory(); } catch (_) {}
    setIsTransitioning(true);

    setTimeout(() => {
      onStartGame();
    }, 420);
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

  // Staggered Container Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div
      className={`nexus-launch-viewport ${isTransitioning ? 'launch-transition-out' : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Deep Atmospheric Cyber Canvas */}
      <div className="launch-ambient-canvas" aria-hidden="true">
        <div className="launch-vignette-overlay"></div>
        <div className="launch-grid-mesh"></div>
        <div className="launch-core-glow-spot"></div>
      </div>

      {/* Decorative Telemetry Labels in Viewport Corners */}
      <div className="telemetry-node telemetry-tl" aria-hidden="true">
        <span className="node-dot"></span>
        <span className="node-text">NEXUS CORE // STABLE</span>
      </div>
      <div className="telemetry-node telemetry-tr" aria-hidden="true">
        <span className="node-dot"></span>
        <span className="node-text">CIPHER PROTOCOL // READY</span>
      </div>
      <div className="telemetry-node telemetry-bl" aria-hidden="true">
        <span className="node-dot"></span>
        <span className="node-text">SECURITY CLEARANCE // LVL 04</span>
      </div>
      <div className="telemetry-node telemetry-br" aria-hidden="true">
        <span className="node-dot"></span>
        <span className="node-text">NEURAL LINK // ACTIVE</span>
      </div>

      {/* Minimal Top Navigation Header */}
      <header className="launch-minimal-header">
        <div className="header-brand-group">
          <div className="brand-logo-gem">
            <Terminal size={14} className="gem-icon" />
          </div>
          <div className="brand-text-stack">
            <span className="brand-primary">NEXUS</span>
            <span className="brand-secondary">WORD DECRYPTION</span>
          </div>
        </div>

        <div className="header-status-controls">
          <div className="system-online-pill">
            <span className="pulse-green-indicator"></span>
            <span className="status-label">SYSTEM ONLINE</span>
          </div>

          <div className="header-actions-row">
            {onToggleSound && (
              <motion.button
                type="button"
                className="header-ctrl-btn"
                onClick={onToggleSound}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
                aria-label="Toggle Audio"
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span className="ctrl-btn-text">SOUND</span>
              </motion.button>
            )}

            <motion.button
              type="button"
              className="header-ctrl-btn"
              onClick={onOpenCodex}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="Open Intelligence Archive / Codex"
              aria-label="Open Intel Archive"
            >
              <BookOpen size={14} />
              <span className="ctrl-btn-text">INTEL</span>
            </motion.button>

            <motion.button
              type="button"
              className="header-ctrl-btn theme-toggle-btn"
              onClick={cycleTheme}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={`Switch Theme: Current ${theme.toUpperCase()}`}
              aria-label="Cycle Theme"
            >
              <Palette size={14} />
              <span className="ctrl-btn-text">{theme.toUpperCase()}</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Centered Cinematic Hero Stage */}
      <main className="launch-center-stage">
        {/* Central Futuristic Decryption Core Visual (Behind Hero with 3D Parallax Tilt) */}
        <motion.div
          className="decryption-core-container"
          style={{ rotateX: coreRotateX, rotateY: coreRotateY }}
          aria-hidden="true"
        >
          {/* Outermost Precision Rotating Ring */}
          <div className="core-ring core-ring-outer"></div>

          {/* Counter-Rotating Segmented Tech Ring */}
          <div className="core-ring core-ring-segmented"></div>

          {/* Inner Dashed Orbital Track with Glowing Nodes */}
          <div className="core-orbital-track orbit-track-1">
            <span className="orbit-node node-alpha"></span>
          </div>
          <div className="core-orbital-track orbit-track-2">
            <span className="orbit-node node-beta"></span>
          </div>

          {/* Inner Static Concentric Target Ring */}
          <div className="core-ring core-ring-inner"></div>

          {/* SVG Geometric Crosshairs & Radial Elements */}
          <svg className="core-svg-overlay" viewBox="0 0 540 540" fill="none">
            <circle cx="270" cy="270" r="260" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1" />
            <circle cx="270" cy="270" r="200" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="1" strokeDasharray="5 7" />
            <circle cx="270" cy="270" r="140" stroke="rgba(0, 240, 255, 0.16)" strokeWidth="1" strokeDasharray="3 5" />
            <line x1="270" y1="15" x2="270" y2="525" stroke="rgba(0, 240, 255, 0.06)" strokeWidth="1" />
            <line x1="15" y1="270" x2="525" y2="270" stroke="rgba(0, 240, 255, 0.06)" strokeWidth="1" />
          </svg>

          {/* Central Pulsar Node */}
          <div className="core-center-pulsar">
            <span className="pulsar-dot"></span>
            <span className="pulsar-halo"></span>
          </div>
        </motion.div>

        {/* Foreground Content Stack (Staggered with Framer Motion) */}
        <motion.div
          className="launch-hero-stack"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow Pill */}
          <motion.div variants={itemVariants} className="hero-eyebrow">
            <span className="eyebrow-accent">[</span>
            <span className="eyebrow-text">NEXUS // DECRYPTION PROTOCOL</span>
            <span className="eyebrow-accent">]</span>
          </motion.div>

          {/* Main Title Heading Lockup */}
          <motion.div variants={itemVariants} className="hero-title-group">
            <h1 className="hero-main-title">NEXUS</h1>
            <h2 className="hero-sub-title">WORD DECRYPTION</h2>
          </motion.div>

          {/* Elegant Boot Status Pill */}
          <motion.div variants={itemVariants} className="boot-status-capsule">
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
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="hero-tagline">
            Analyze the clue. Decode the word. Break the system.
          </motion.p>

          {/* Interactive Difficulty Tier Selector with Animated Indicator */}
          <motion.div
            variants={itemVariants}
            className="tier-selector-compact"
            role="tablist"
            aria-label="Difficulty Selection"
          >
            {[
              { id: 'ALL', label: 'ALL TIERS (15)' },
              { id: 'EASY', label: 'SIMPLE (5)', dot: 'green' },
              { id: 'MEDIUM', label: 'MEDIUM (5)', dot: 'yellow' },
              { id: 'HARD', label: 'HARD (5)', dot: 'red' },
            ].map((tier) => {
              const isActive = selectedDifficulty === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  className={`tier-chip ${isActive ? 'chip-active' : ''}`}
                  onClick={() => handleTierClick(tier.id)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTierHighlight"
                      className="tier-chip-highlight"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {tier.dot && <span className={`chip-dot ${tier.dot}-dot`}></span>}
                  <span className="chip-label">{tier.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Prominent Call-to-Action Button */}
          <motion.div variants={itemVariants} className="hero-cta-wrapper">
            <motion.button
              type="button"
              className="btn-start-mission-epic"
              onClick={handleStartMissionClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              autoFocus
            >
              <span className="btn-epic-glow"></span>
              <span className="btn-epic-sweep"></span>
              <span className="btn-epic-content">
                <span>START MISSION</span>
                <ArrowRight size={18} className="cta-arrow-icon" />
              </span>
            </motion.button>
          </motion.div>

          {/* Compact Stats Bar with Vector Infinity Icon */}
          <motion.div variants={itemVariants} className="hero-compact-stats">
            <div className="compact-stat-cell">
              <span className="stat-num">{activeWordCount}</span>
              <span className="stat-sub">WORDS</span>
            </div>

            <div className="stat-separator"></div>

            <div className="compact-stat-cell">
              <span className="stat-num">{currentFailures}</span>
              <span className="stat-sub">FAILURES</span>
            </div>

            <div className="stat-separator"></div>

            <div className="compact-stat-cell">
              <span className="stat-icon-wrapper">
                <InfinityIcon size={14} className="stat-infinity-icon" />
              </span>
              <span className="stat-sub">MISSIONS</span>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Subtle Bottom Status Bar */}
      <footer className="launch-footer-bar">
        <span className="footer-meta-item">NEXUS SEC // v5.3 OPERATIONAL</span>
        <span className="footer-meta-item">CAREER BEST: {highScore > 0 ? highScore.toLocaleString() : '1,000'} PTS</span>
        <span className="footer-meta-item">TOTAL DECRYPTED: {totalSolved}</span>
      </footer>
    </div>
  );
}
