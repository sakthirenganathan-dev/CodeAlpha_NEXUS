import React from 'react';
import { Lock, Unlock, Hash } from 'lucide-react';

export default function TargetWord({
  word,
  guessedLetters,
  isVictory,
  isGameOver
}) {
  const letters = word.split('');

  return (
    <div className="target-word-card">
      <div className="target-card-sub-header">
        <div className="target-header-tag">
          <Hash size={14} className="tag-icon" />
          <span>TARGET WORD BUFFER</span>
        </div>
        <div className="target-encryption-status">
          {isVictory ? (
            <span className="status-tag tag-decrypted">
              <Unlock size={12} /> ALL FRAGMENTS DECRYPTED
            </span>
          ) : isGameOver ? (
            <span className="status-tag tag-locked">
              <Lock size={12} /> LOCKDOWN REVEAL
            </span>
          ) : (
            <span className="status-tag tag-encrypted">
              <Lock size={12} /> {word.length} CIPHER BYTES
            </span>
          )}
        </div>
      </div>

      <div className="word-slots-display-area" aria-label="Target Word Display">
        <div className="word-slots-flex">
          {letters.map((char, index) => {
            const isRevealed = guessedLetters.includes(char) || isGameOver;
            const isMissedAtLoss = isGameOver && !guessedLetters.includes(char);

            return (
              <div
                key={index}
                className={`target-letter-slot ${isRevealed ? 'slot-revealed' : 'slot-hidden'} ${isVictory ? 'slot-victory' : ''} ${isMissedAtLoss ? 'slot-missed' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="slot-box">
                  <span className="slot-char">
                    {isRevealed ? char : ''}
                  </span>
                </div>
                <div className="slot-accent-bar"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="target-card-footer">
        <span className="footer-spec">LENGTH: {word.length} CHARACTERS</span>
        <span className="footer-divider">•</span>
        <span className="footer-spec">ENCRYPTION: NEXUS-SHA256</span>
      </div>
    </div>
  );
}
