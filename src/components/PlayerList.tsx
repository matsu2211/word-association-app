import React from 'react';

type PlayerListProps = {
  players: string[];
  scores: Record<string, number>;
  onAddScore?: (name: string) => void;
  showAddButton?: boolean;
};

export const PlayerList: React.FC<PlayerListProps> = ({ 
  players, 
  scores, 
  onAddScore, 
  showAddButton = false 
}) => {
  return (
    <div className="card w-full">
      <h3 className="mb-4">プレイヤー</h3>
      <div className="flex flex-col">
        {players.map(player => (
          <div key={player} className="player-score-item">
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{player}</span>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '1.5rem' }}>{scores[player] || 0} 点</span>
              {showAddButton && onAddScore && (
                <button 
                  className="btn-success" 
                  onClick={() => onAddScore(player)}
                  style={{ padding: '5px 15px' }}
                >
                  +1
                </button>
              )}
            </div>
          </div>
        ))}
        {players.length === 0 && (
          <p className="text-center" style={{ opacity: 0.6 }}>プレイヤーが登録されていません</p>
        )}
      </div>
    </div>
  );
};
