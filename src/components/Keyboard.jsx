import React from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function Keyboard({
  guessedLetters,
  selectedWord,
  onGuessLetter,
  disabled
}) {
  const getKeyStatus = (key) => {
    if (!guessedLetters.includes(key)) {
      return 'unused';
    }
    if (selectedWord.includes(key)) {
      return 'correct';
    }
    return 'incorrect';
  };

  return (
    <div className="virtual-keyboard-section" role="region" aria-label="Virtual Decryption Keyboard">
      <div className="keyboard-prompt-bar">
        <span className="prompt-text">ENTER DECRYPTION KEY (KEYBOARD OR ON-SCREEN A–Z)</span>
      </div>

      <div className="qwerty-board">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="qwerty-row">
            {row.map((key) => {
              const status = getKeyStatus(key);
              const isUsed = guessedLetters.includes(key);
              const isKeyDisabled = disabled || isUsed;

              return (
                <button
                  key={key}
                  type="button"
                  className={`qwerty-key key-state-${status}`}
                  disabled={isKeyDisabled}
                  onClick={() => onGuessLetter(key)}
                  aria-label={`Letter ${key}, ${status}`}
                >
                  <span className="key-letter">{key}</span>
                  <span className="key-led-glow"></span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
