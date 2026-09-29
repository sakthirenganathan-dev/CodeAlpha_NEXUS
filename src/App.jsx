import React, { useState, useEffect, useCallback, useRef } from 'react';
import BootScreen from './components/BootScreen';
import LandingScreen from './components/LandingScreen';
import GameHeader from './components/GameHeader';
import ClueCard from './components/ClueCard';
import TargetWord from './components/TargetWord';
import SecurityMeter from './components/SecurityMeter';
import DecodedLetters from './components/DecodedLetters';
import TacticalOverrides from './components/TacticalOverrides';
import CodexModal from './components/CodexModal';
import Notification from './components/Notification';
import VictoryScreen from './components/VictoryScreen';
import GameOverScreen from './components/GameOverScreen';
import {
  MISSION_WORDS,
  DIFFICULTY_TIERS,
  getWordsByDifficulty,
  getRandomWord,
  getRankByScore
} from './data/words';
import { soundManager } from './utils/sound';
import './App.css';

const INITIAL_SCORE = 1000;

export default function App() {
  // Screens: 'landing' | 'playing' | 'victory' | 'gameover'
  const [screen, setScreen] = useState('landing');

  // Theme: 'cyan' | 'matrix' | 'violet'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('nexus_theme') || 'cyan';
    } catch {
      return 'cyan';
    }
  });

  // Difficulty Tier selection: 'ALL' | 'EASY' | 'MEDIUM' | 'HARD'
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  // Mission data state
  const [missionWord, setMissionWord] = useState(() => getRandomWord('ALL'));
  const [missionNumber, setMissionNumber] = useState(1);
  const [completedWords, setCompletedWords] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_completed_words');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Session & Lifetime Stats (Persisted in localStorage)
  const [totalSolved, setTotalSolved] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_total_solved');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_high_score');
      return saved ? parseInt(saved, 10) : INITIAL_SCORE;
    } catch {
      return INITIAL_SCORE;
    }
  });

  // Gameplay state
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [hintLevel, setHintLevel] = useState(0); // 0 = none, 1 = hint1, 2 = hint2

  // Tactical Overrides (Power-ups)
  const [traceBypassCharges, setTraceBypassCharges] = useState(1);
  const [scanPulseCharges, setScanPulseCharges] = useState(1);

  // Decryption Streak Multiplier
  const [streak, setStreak] = useState(1);

  // Mission Countdown Timer
  const [timeLeft, setTimeLeft] = useState(60);
  const [lastSpeedBonus, setLastSpeedBonus] = useState(0);

  // Score state
  const [score, setScore] = useState(INITIAL_SCORE);
  const [scoreDelta, setScoreDelta] = useState(null);

  // Modals & Panels
  const [isCodexOpen, setIsCodexOpen] = useState(false);

  // UX & Animations
  const [notification, setNotification] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shakeActive, setShakeActive] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  const notifTimeoutRef = useRef(null);
  const deltaTimeoutRef = useRef(null);
  const directInputRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Dynamic tier configuration based on current active word
  const activeTierConfig = DIFFICULTY_TIERS[missionWord.difficulty] || DIFFICULTY_TIERS.EASY;
  const currentMaxFailures = activeTierConfig.maxFailures;
  const poolWords = getWordsByDifficulty(selectedDifficulty);
  const totalMissionsInPool = poolWords.length;

  // Persist Theme
  useEffect(() => {
    try {
      localStorage.setItem('nexus_theme', theme);
    } catch {
      // Storage fallback
    }
  }, [theme]);

  // Persist high score
  useEffect(() => {
    try {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('nexus_high_score', String(score));
      }
    } catch {
      // Storage fallback
    }
  }, [score, highScore]);

  // Persist total solved & completed words
  useEffect(() => {
    try {
      localStorage.setItem('nexus_total_solved', String(totalSolved));
      localStorage.setItem('nexus_completed_words', JSON.stringify(completedWords));
    } catch {
      // Storage fallback
    }
  }, [totalSolved, completedWords]);

  // Score Delta with animated floating effect
  const updateScore = useCallback((delta) => {
    setScore(prev => Math.max(0, prev + delta));
    setScoreDelta({ id: Date.now(), value: delta });

    if (deltaTimeoutRef.current) {
      clearTimeout(deltaTimeoutRef.current);
    }
    deltaTimeoutRef.current = setTimeout(() => {
      setScoreDelta(null);
    }, 1800);
  }, []);

  // Display toast notification
  const triggerNotification = useCallback((type, message, delta) => {
    if (notifTimeoutRef.current) {
      clearTimeout(notifTimeoutRef.current);
    }
    setNotification({ type, message, delta });
    notifTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 2400);
  }, []);

  // Sound toggle handler
  const handleToggleSound = useCallback(() => {
    const newState = soundManager.toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      soundManager.playKey();
    }
  }, []);

  // Initialize a specific word mission
  const startMissionWithWord = useCallback((newWord, newMissionNum = null) => {
    setMissionWord(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setHintLevel(0);
    setStreak(1);
    setTraceBypassCharges(1);
    setScanPulseCharges(1);
    setNotification(null);

    // Initial timer based on difficulty
    const initialTime = newWord.difficulty === 'HARD' ? 40 : newWord.difficulty === 'MEDIUM' ? 50 : 60;
    setTimeLeft(initialTime);

    if (newMissionNum !== null) {
      setMissionNumber(newMissionNum);
    }
    setScreen('playing');
  }, []);

  // Mission Countdown Timer Hook
  useEffect(() => {
    if (screen === 'playing' && !isCodexOpen) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            // Timer expired -> lockdown trigger!
            soundManager.playLockdown();
            setScreen('gameover');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [screen, isCodexOpen]);

  // Start game from landing screen with selected difficulty tier
  const handleStartGame = useCallback(() => {
    const firstWord = getRandomWord(selectedDifficulty, []);
    setScore(INITIAL_SCORE);
    setMissionNumber(1);
    startMissionWithWord(firstWord, 1);
  }, [selectedDifficulty, startMissionWithWord]);

  // Next Mission progression (maintains score across session!)
  const handleNextMission = useCallback(() => {
    const newCompleted = [...new Set([...completedWords, missionWord.word])];
    setCompletedWords(newCompleted);

    const nextWord = getRandomWord(selectedDifficulty, newCompleted);
    const nextMissionNum = (missionNumber % totalMissionsInPool) + 1;
    startMissionWithWord(nextWord, nextMissionNum);
  }, [completedWords, missionWord, missionNumber, selectedDifficulty, totalMissionsInPool, startMissionWithWord]);

  // Play Again (resets score)
  const handlePlayAgain = useCallback(() => {
    handleStartGame();
  }, [handleStartGame]);

  // Return to landing screen
  const handleReturnToNexus = useCallback(() => {
    setScreen('landing');
    setNotification(null);
  }, []);

  // Reveal Hint Handler
  const handleRevealHint = useCallback((level) => {
    if (screen !== 'playing') return;

    if (level === 1 && hintLevel === 0) {
      if (score < 100) {
        triggerNotification('INVALID', '! INSUFFICIENT SCORE FOR HINT');
        return;
      }
      setHintLevel(1);
      updateScore(-100);
      triggerNotification('HINT', '💡 HINT 01 UNLOCKED', -100);
      soundManager.playHint();
    } else if (level === 2 && hintLevel === 1) {
      if (score < 200) {
        triggerNotification('INVALID', '! INSUFFICIENT SCORE FOR HINT');
        return;
      }
      setHintLevel(2);
      updateScore(-200);
      triggerNotification('HINT', '💡 FINAL HINT UNLOCKED', -200);
      soundManager.playHint();
    }
  }, [screen, hintLevel, score, updateScore, triggerNotification]);

  // Tactical Power-up 1: Trace Bypass (Erase 1 Failure)
  const handleUseTraceBypass = useCallback(() => {
    if (screen !== 'playing' || traceBypassCharges <= 0 || wrongGuesses <= 0) return;

    setTraceBypassCharges(prev => prev - 1);
    setWrongGuesses(prev => Math.max(0, prev - 1));
    triggerNotification('CORRECT', '🛡️ TRACE BYPASS: FAILURE ERASED');
    soundManager.playPowerup();
  }, [screen, traceBypassCharges, wrongGuesses, triggerNotification]);

  // Tactical Power-up 2: Scan Pulse (Auto-decode 1 hidden letter)
  const handleUseScanPulse = useCallback(() => {
    if (screen !== 'playing' || scanPulseCharges <= 0) return;

    // Find unrevealed letters in word
    const unrevealed = missionWord.word.split('').filter(ch => !guessedLetters.includes(ch));
    if (unrevealed.length === 0) return;

    const chosenLetter = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    setScanPulseCharges(prev => prev - 1);
    soundManager.playPowerup();

    // Register guess
    const updatedGuessed = [...guessedLetters, chosenLetter];
    setGuessedLetters(updatedGuessed);
    triggerNotification('BONUS', `👁️ SCAN PULSE: DECODED "${chosenLetter}"`);

    // Check Victory
    const isWordComplete = missionWord.word.split('').every(ch => updatedGuessed.includes(ch));
    if (isWordComplete) {
      const baseBonus = activeTierConfig.bonus;
      const speedBonus = timeLeft * 10;
      setLastSpeedBonus(speedBonus);
      updateScore(baseBonus + speedBonus);
      setTotalSolved(prev => prev + 1);
      setCompletedWords(prev => [...new Set([...prev, missionWord.word])]);
      setTimeout(() => {
        setScreen('victory');
        soundManager.playVictory();
      }, 550);
    }
  }, [screen, scanPulseCharges, missionWord, guessedLetters, activeTierConfig, timeLeft, updateScore, triggerNotification]);

  // Core Guess Processing
  const handleGuessLetter = useCallback((rawChar) => {
    if (screen !== 'playing') return;

    const letter = rawChar.toUpperCase();

    // Validate single alphabet
    if (!/^[A-Z]$/.test(letter)) {
      triggerNotification('INVALID', '! INVALID INPUT');
      soundManager.playIncorrect();
      return;
    }

    // Check duplicate
    if (guessedLetters.includes(letter)) {
      triggerNotification('DUPLICATE', '! ALREADY DECODED');
      soundManager.playKey();
      return;
    }

    const updatedGuessed = [...guessedLetters, letter];
    setGuessedLetters(updatedGuessed);

    // Dynamic points based on difficulty tier and combo streak
    const baseLetterReward = missionWord.difficulty === 'HARD' ? 200 : missionWord.difficulty === 'MEDIUM' ? 150 : 100;
    const finalLetterPoints = baseLetterReward * streak;
    const bonusReward = activeTierConfig.bonus;

    // Correct Guess
    if (missionWord.word.includes(letter)) {
      updateScore(finalLetterPoints);
      const newStreak = Math.min(3, streak + 1);
      setStreak(newStreak);

      if (newStreak >= 2) {
        soundManager.playStreak(newStreak);
        triggerNotification('CORRECT', `⚡ COMBO x${streak} DECRYPTED!`, finalLetterPoints);
      } else {
        soundManager.playCorrect();
        triggerNotification('CORRECT', '✓ LETTER DECRYPTED', finalLetterPoints);
      }

      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 350);

      // Check Victory Condition
      const isWordComplete = missionWord.word.split('').every(char => updatedGuessed.includes(char));
      if (isWordComplete) {
        const speedBonus = timeLeft * 10;
        setLastSpeedBonus(speedBonus);
        updateScore(bonusReward + speedBonus);
        setTotalSolved(prev => prev + 1);
        setCompletedWords(prev => [...new Set([...prev, missionWord.word])]);
        setTimeout(() => {
          setScreen('victory');
          soundManager.playVictory();
        }, 550);
      }
    } else {
      // Wrong Guess -> Breaks streak back to 1!
      setStreak(1);
      const updatedWrong = wrongGuesses + 1;
      setWrongGuesses(updatedWrong);
      updateScore(-100);
      triggerNotification('WRONG', '✕ ACCESS DENIED', -100);
      soundManager.playIncorrect();
      setShakeActive(true);
      setTimeout(() => setShakeActive(false), 450);

      // Check Lockdown Condition
      if (updatedWrong >= currentMaxFailures) {
        setTimeout(() => {
          setScreen('gameover');
          soundManager.playLockdown();
        }, 600);
      }
    }
  }, [screen, guessedLetters, missionWord, wrongGuesses, currentMaxFailures, activeTierConfig, streak, timeLeft, updateScore, triggerNotification]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (screen === 'playing' && !isCodexOpen) {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          e.preventDefault();
          handleGuessLetter(key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, isCodexOpen, handleGuessLetter]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (notifTimeoutRef.current) clearTimeout(notifTimeoutRef.current);
      if (deltaTimeoutRef.current) clearTimeout(deltaTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  return (
    <div className={`nexus-application-root theme-${theme}`} data-theme={theme}>
      {/* Background Cyber Atmosphere */}
      <div className="cyber-ambient-canvas" aria-hidden="true">
        <div className="ambient-radial-glow"></div>
        <div className="ambient-grid-mesh"></div>
        <div className="ambient-scanline-stripes"></div>
        <div className="ambient-spot spot-primary"></div>
        <div className="ambient-spot spot-secondary"></div>
      </div>

      {screen === 'landing' ? (
        <LandingScreen
          onStartGame={handleStartGame}
          selectedDifficulty={selectedDifficulty}
          onChangeDifficulty={setSelectedDifficulty}
          totalSolved={totalSolved}
          highScore={highScore}
          theme={theme}
          onChangeTheme={setTheme}
          onOpenCodex={() => setIsCodexOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      ) : (
        <div className="nexus-main-wrapper">
          {/* Boot Loader Screen if activated */}
          {screen === 'boot' && (
            <BootScreen onComplete={() => setScreen('landing')} />
          )}

        {/* Main Gameplay Screen */}
        {(screen === 'playing' || screen === 'victory' || screen === 'gameover') && (
          <div className={`mission-dashboard-shell ${shakeActive ? 'anim-shake' : ''} ${pulseActive ? 'anim-pulse' : ''}`}>
            {/* Top Game Header with Timer, Streak, and Theme controls */}
            <GameHeader
              score={score}
              scoreDelta={scoreDelta}
              missionNumber={missionNumber}
              totalMissions={totalMissionsInPool}
              difficultyLabel={activeTierConfig.label}
              difficultyColor={activeTierConfig.color}
              totalSolved={totalSolved}
              timeLeft={timeLeft}
              streak={streak}
              theme={theme}
              onChangeTheme={setTheme}
              onOpenCodex={() => setIsCodexOpen(true)}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              onReturnHome={handleReturnToNexus}
            />

            {/* Notification Toast */}
            <div className="notification-stage">
              <Notification notification={notification} />
            </div>

            {/* 2-Column Responsive Game Dashboard */}
            <div className="dashboard-columns-layout">
              {/* Left Column: Clue Intel & Target Word */}
              <div className="dashboard-primary-col">
                <ClueCard
                  missionWord={missionWord}
                  hintLevel={hintLevel}
                  onRevealHint={handleRevealHint}
                  score={score}
                />

                <TargetWord
                  word={missionWord.word}
                  guessedLetters={guessedLetters}
                  isVictory={screen === 'victory'}
                  isGameOver={screen === 'gameover'}
                />

                {/* Tactical Cyber Overrides Tray */}
                <TacticalOverrides
                  traceBypassCharges={traceBypassCharges}
                  scanPulseCharges={scanPulseCharges}
                  onUseTraceBypass={handleUseTraceBypass}
                  onUseScanPulse={handleUseScanPulse}
                  wrongGuesses={wrongGuesses}
                  disabled={screen !== 'playing'}
                />
              </div>

              {/* Right Column: Security Meter & Decoded Letters */}
              <div className="dashboard-secondary-col">
                <SecurityMeter
                  wrongGuesses={wrongGuesses}
                  maxFailures={currentMaxFailures}
                />

                <DecodedLetters
                  guessedLetters={guessedLetters}
                  selectedWord={missionWord.word}
                />
              </div>
            </div>

            {/* Direct Terminal Command Deck */}
            <div className="terminal-command-deck" onClick={() => directInputRef.current?.focus()}>
              <div className="command-deck-inner">
                <div className="prompt-indicator-group">
                  <span className="terminal-prompt-prefix">NEXUS://DECRYPT_PROMPT &gt;</span>
                  <input
                    ref={directInputRef}
                    type="text"
                    inputMode="text"
                    maxLength={1}
                    className="terminal-direct-input"
                    placeholder=""
                    value=""
                    onChange={(e) => {
                      const char = e.target.value.slice(-1);
                      if (char) handleGuessLetter(char);
                    }}
                    autoFocus
                    aria-label="Direct Decryption Input"
                  />
                  <span className="cursor-block"></span>
                </div>
                <div className="prompt-instruction-note">
                  <span>TYPE ANY LETTER (A–Z) ON YOUR KEYBOARD TO DECODE</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Victory Screen with Speed Bonus breakdown */}
        {screen === 'victory' && (
          <VictoryScreen
            missionWord={missionWord}
            score={score}
            wrongGuesses={wrongGuesses}
            maxFailures={currentMaxFailures}
            hintLevel={hintLevel}
            bonusPoints={activeTierConfig.bonus + lastSpeedBonus}
            totalSolved={totalSolved}
            isLastMission={missionNumber === totalMissionsInPool}
            onNextMission={handleNextMission}
            onPlayAgain={handlePlayAgain}
            onReturnToNexus={handleReturnToNexus}
          />
        )}

        {/* Game Over Screen */}
        {screen === 'gameover' && (
          <GameOverScreen
            missionWord={missionWord}
            score={score}
            wrongGuesses={wrongGuesses}
            maxFailures={currentMaxFailures}
            hintLevel={hintLevel}
            totalSolved={totalSolved}
            onTryAgain={handlePlayAgain}
            onReturnToNexus={handleReturnToNexus}
          />
        )}
      </div>
      )}

      {/* Global Intelligence Archive / Codex Modal */}
      {isCodexOpen && (
        <CodexModal
          completedWords={completedWords}
          onClose={() => setIsCodexOpen(false)}
        />
      )}
    </div>
  );
}
