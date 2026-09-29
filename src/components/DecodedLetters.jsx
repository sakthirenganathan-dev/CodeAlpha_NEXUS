import React from 'react';
import { Database, CheckCircle2, XCircle } from 'lucide-react';

export default function DecodedLetters({
  guessedLetters,
  selectedWord
}) {
  const letters = guessedLetters.map(letter => ({
    char: letter,
    isCorrect: selectedWord.includes(letter)
  }));

  return (
    <div className="decoded-letters-widget">
      <div className="widget-header">
        <div className="widget-title-group">
          <Database size={13} className="widget-icon" />
          <span className="widget-title">DECODED LETTERS</span>
        </div>
        <span className="widget-count">{guessedLetters.length} LOGGED</span>
      </div>

      <div className="widget-body">
        {letters.length === 0 ? (
          <div className="empty-decoded-state">
            <span className="empty-text">NO LETTERS DECODED</span>
          </div>
        ) : (
          <div className="decoded-pills-list">
            {letters.map(({ char, isCorrect }, idx) => (
              <div
                key={char}
                className={`decoded-pill ${isCorrect ? 'pill-correct' : 'pill-wrong'}`}
                style={{ animationDelay: `${idx * 0.04}s` }}
              >
                <span className="pill-char">{char}</span>
                {isCorrect ? (
                  <CheckCircle2 size={10} className="pill-status-icon" />
                ) : (
                  <XCircle size={10} className="pill-status-icon" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
