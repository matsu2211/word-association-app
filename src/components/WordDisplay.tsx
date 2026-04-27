import React from 'react';
import { Word } from '../constants';

type WordDisplayProps = {
  words: Word[];
  showRuby?: boolean;
};

export const WordDisplay: React.FC<WordDisplayProps> = ({ words, showRuby }) => {
  return (
    <div className="word-display text-center">
      {words.map((word) => (
        <div key={word.id} className="word-item">
          {showRuby && word.ruby ? (
            <ruby>
              {word.text}
              <rt>{word.ruby}</rt>
            </ruby>
          ) : (
            word.text
          )}
        </div>
      ))}
    </div>
  );
};
