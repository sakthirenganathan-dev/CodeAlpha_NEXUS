import React, { useState } from 'react';
import { BookOpen, X, Shield, Lock, Unlock, Tag, CheckCircle2, AlertOctagon } from 'lucide-react';
import { MISSION_WORDS, DIFFICULTY_TIERS } from '../data/words';

export default function CodexModal({
  completedWords = [],
  onClose
}) {
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [activeWordId, setActiveWordId] = useState(MISSION_WORDS[0]?.id);

  const filteredWords = selectedTier === 'ALL'
    ? MISSION_WORDS
    : MISSION_WORDS.filter(w => w.difficulty === selectedTier);

  const activeWord = MISSION_WORDS.find(w => w.id === activeWordId) || MISSION_WORDS[0];
  const isWordDecrypted = completedWords.includes(activeWord.word);
  const totalDecrypted = MISSION_WORDS.filter(w => completedWords.includes(w.word)).length;

  return (
    <div className="game-modal-overlay codex-modal-overlay" role="dialog" aria-modal="true">
      <div className="codex-modal-container">
        {/* Header */}
        <div className="codex-modal-header">
          <div className="codex-title-wrap">
            <BookOpen size={18} className="codex-icon" />
            <span className="codex-title">NEXUS // INTELLIGENCE ARCHIVE</span>
            <span className="codex-progress-badge">
              {totalDecrypted} / {MISSION_WORDS.length} DECRYPTED
            </span>
          </div>

          <button className="codex-close-btn" onClick={onClose} aria-label="Close Archive">
            <X size={18} />
          </button>
        </div>

        {/* Tier Filter Tabs */}
        <div className="codex-filter-tabs">
          {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((tier) => (
            <button
              key={tier}
              className={`codex-tab ${selectedTier === tier ? 'tab-selected' : ''}`}
              onClick={() => setSelectedTier(tier)}
            >
              <span>{tier === 'ALL' ? 'ALL TIERS (15)' : tier === 'EASY' ? '🟢 SIMPLE (5)' : tier === 'MEDIUM' ? '🟡 MEDIUM (5)' : '🔴 HARD (5)'}</span>
            </button>
          ))}
        </div>

        {/* Main Dossier Split View */}
        <div className="codex-dossier-layout">
          {/* Left Word List Sidebar */}
          <div className="codex-sidebar-list">
            {filteredWords.map((word) => {
              const isDecrypted = completedWords.includes(word.word);
              const tierConfig = DIFFICULTY_TIERS[word.difficulty] || DIFFICULTY_TIERS.EASY;

              return (
                <button
                  key={word.id}
                  className={`codex-word-item ${activeWordId === word.id ? 'active-item' : ''}`}
                  onClick={() => setActiveWordId(word.id)}
                >
                  <div className="item-status-icon">
                    {isDecrypted ? (
                      <CheckCircle2 size={14} className="icon-decrypted" />
                    ) : (
                      <Lock size={14} className="icon-locked" />
                    )}
                  </div>

                  <div className="item-info">
                    <span className="item-name">
                      {isDecrypted ? word.word : '••••••••'}
                    </span>
                    <span className="item-category" style={{ color: tierConfig.color }}>
                      {tierConfig.label} • {word.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Word Intelligence Detail Panel */}
          <div className="codex-detail-panel">
            <div className="detail-top-bar">
              <span className="dossier-id">{activeWord.id}</span>
              <div className="dossier-status-tag">
                {isWordDecrypted ? (
                  <span className="tag-unlocked">
                    <Unlock size={12} /> DECRYPTED IN ARCHIVE
                  </span>
                ) : (
                  <span className="tag-classified">
                    <Lock size={12} /> CLASSIFIED CIPHER
                  </span>
                )}
              </div>
            </div>

            <h3 className="dossier-target-title">
              {isWordDecrypted ? activeWord.word : `${activeWord.word.length}-LETTER ENCRYPTED CIPHER`}
            </h3>

            <div className="dossier-meta-row">
              <span className="dossier-pill category-pill">
                <Tag size={12} /> {activeWord.category}
              </span>
              <span
                className="dossier-pill diff-pill"
                style={{
                  color: DIFFICULTY_TIERS[activeWord.difficulty].color,
                  borderColor: `${DIFFICULTY_TIERS[activeWord.difficulty].color}40`,
                  backgroundColor: `${DIFFICULTY_TIERS[activeWord.difficulty].color}12`
                }}
              >
                {DIFFICULTY_TIERS[activeWord.difficulty].label} TIER
              </span>
            </div>

            {/* Dossier Clues Section */}
            <div className="dossier-content-card">
              <span className="card-section-label">PRIMARY MISSION CLUE</span>
              <p className="dossier-clue-quote">"{activeWord.primaryClue}"</p>
            </div>

            <div className="dossier-content-card">
              <span className="card-section-label">TACTICAL HINTS SUMMARY</span>
              <div className="dossier-hints-list">
                <div className="hint-row">
                  <span className="hint-num">HINT 01:</span>
                  <span className="hint-desc">{isWordDecrypted ? activeWord.hint1 : 'Requires Mission Decryption'}</span>
                </div>
                <div className="hint-row">
                  <span className="hint-num">HINT 02:</span>
                  <span className="hint-desc">{isWordDecrypted ? activeWord.hint2 : 'Requires Mission Decryption'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
