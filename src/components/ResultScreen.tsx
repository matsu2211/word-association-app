import React from 'react';
import { PlayerList } from './PlayerList';

type ResultScreenProps = {
  players: string[];
  scores: Record<string, number>;
  onReset: () => void;
};

export const ResultScreen: React.FC<ResultScreenProps> = ({
  players,
  scores,
  onReset
}) => {
  const sortedPlayers = [...players].sort((a, b) => (scores[b] || 0) - (scores[a] || 0));

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center">最終結果</h1>
      
      <div className="card w-full text-center">
        <h2 style={{ color: 'var(--success-color)' }}>優勝: {sortedPlayers[0]}</h2>
      </div>

      <PlayerList players={sortedPlayers} scores={scores} />

      <button 
        className="btn-primary w-full mt-4" 
        style={{ padding: '15px' }}
        onClick={onReset}
      >
        トップに戻る
      </button>
    </div>
  );
};
