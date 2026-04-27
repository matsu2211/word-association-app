import React, { useState, useEffect } from 'react';
import { Word } from '../constants';
import { Timer } from './Timer';
import { WordDisplay } from './WordDisplay';
import { PlayerList } from './PlayerList';
import { MessageCircle } from 'lucide-react';

type GameScreenProps = {
  round: number;
  maxRounds: number;
  currentWords: Word[];
  players: string[];
  scores: Record<string, number>;
  timerSetting: number;
  showRuby: boolean;
  onAddScore: (name: string) => void;
  onNextRound: () => void;
};

export const GameScreen: React.FC<GameScreenProps> = ({
  round,
  maxRounds,
  currentWords,
  players,
  scores,
  timerSetting,
  showRuby,
  onAddScore,
  onNextRound
}) => {
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [answer, setAnswer] = useState('');

  // Reset timer state and answer on round change
  useEffect(() => {
    setIsTimerActive(true);
    setAnswer('');
  }, [round]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex justify-between items-center">
        <h2 style={{ margin: 0 }}>ラウンド {round} / {maxRounds}</h2>
      </div>

      <Timer 
        key={round} 
        initialTime={timerSetting} 
        isActive={isTimerActive}
        onToggleActive={setIsTimerActive}
      />

      <WordDisplay words={currentWords} showRuby={showRuby} />

      <div className="w-full flex flex-col gap-2">
        <button 
          className={`btn-answer w-full ${!isTimerActive ? 'active' : ''}`}
          onClick={() => setIsTimerActive(!isTimerActive)}
        >
          <MessageCircle size={24} />
          <span>{isTimerActive ? '回答！' : '回答を終了して再開'}</span>
        </button>

        {!isTimerActive && (
          <div className="answer-input-container animate-in fade-in slide-in-from-top-2 duration-300">
            <textarea
              className="answer-textarea"
              placeholder="ここに回答を入力..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              autoFocus
            />
            <button 
              className="btn-secondary w-full" 
              onClick={() => setAnswer('')}
              style={{ padding: '8px', fontSize: '0.9rem' }}
            >
              回答をクリア
            </button>
          </div>
        )}
      </div>

      <PlayerList 
        players={players} 
        scores={scores} 
        onAddScore={onAddScore} 
        showAddButton={true} 
      />

      <button 
        className="btn-primary w-full mt-4" 
        style={{ padding: '15px', fontSize: '1.2rem' }}
        onClick={onNextRound}
      >
        {round >= maxRounds ? '結果を見る' : '次のラウンドへ'}
      </button>
    </div>
  );
};
