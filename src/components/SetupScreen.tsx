import React, { useState } from 'react';
import { Plus, Minus, Info, Star } from 'lucide-react';
import { Difficulty } from '../constants';

type SetupScreenProps = {
  players: string[];
  maxRounds: number;
  timerSetting: number;
  difficulty: Difficulty;
  showRuby: boolean;
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (name: string) => void;
  onUpdateSettings: (rounds: number, timer: number, difficulty?: Difficulty, showRuby?: boolean) => void;
  onStartGame: () => void;
};

export const SetupScreen: React.FC<SetupScreenProps> = ({
  players,
  maxRounds,
  timerSetting,
  difficulty,
  showRuby,
  onAddPlayer,
  onRemovePlayer,
  onUpdateSettings,
  onStartGame
}) => {
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      onAddPlayer(newName.trim());
      setNewName('');
    }
  };

  const difficultyOptions: { value: Difficulty; label: string; stars: number; description: string }[] = [
    { value: 'easy', label: 'やさしい', stars: 1, description: '同じカテゴリの単語が出やすく、連想しやすいモードです。' },
    { value: 'normal', label: 'ふつう', stars: 2, description: 'カテゴリが適度に混ざり、バランスの良いモードです。' },
    { value: 'hard', label: 'むずかしい', stars: 3, description: '完全にランダムな単語が出現する、上級者向けのモードです。' },
  ];

  const renderStars = (count: number) => {
    return (
      <div className="flex justify-center gap-0.5">
        {[...Array(count)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center mb-4">Word Sniper Inclu</h1>
      
      <div className="card">
        <h3>プレイヤー設定</h3>
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            className="w-full"
            placeholder="名前を入力" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button className="btn-primary" onClick={handleAdd}>追加</button>
        </div>
        
        <div className="flex flex-col gap-2">
          {players.map(player => (
            <div key={player} className="flex justify-between items-center p-2 border-bottom" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <span>{player}</span>
              <button className="btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => onRemovePlayer(player)}>削除</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>ゲーム設定</h3>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label>難易度</label>
            <div className="grid grid-cols-3 gap-2">
              {difficultyOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`btn-difficulty ${difficulty === opt.value ? 'active' : ''}`}
                  onClick={() => onUpdateSettings(maxRounds, timerSetting, opt.value, showRuby)}
                  style={{ height: 'auto', padding: '15px 5px' }}
                  aria-label={opt.label}
                >
                  <div className="flex flex-col items-center">
                    {renderStars(opt.stars)}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-start gap-2 mt-1 text-sm opacity-70">
              <Info size={14} className="mt-1 flex-shrink-0" />
              <p>{difficultyOptions.find(o => o.value === difficulty)?.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>ルビ（ふりがな）を表示</label>
            <div className="flex items-center gap-2">
              <button
                className={`btn-difficulty w-full ${showRuby ? 'active' : ''}`}
                onClick={() => onUpdateSettings(maxRounds, timerSetting, difficulty, !showRuby)}
              >
                {showRuby ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>ラウンド数</label>
            <div className="flex items-center gap-4">
              <button 
                className="nav-btn" 
                onClick={() => onUpdateSettings(Math.max(1, maxRounds - 1), timerSetting, difficulty, showRuby)}
              >
                <Minus size={20} />
              </button>
              <span style={{ fontSize: '1.5rem', minWidth: '3rem', textAlign: 'center', fontWeight: 'bold' }}>{maxRounds}</span>
              <button 
                className="nav-btn" 
                onClick={() => onUpdateSettings(Math.min(30, maxRounds + 1), timerSetting, difficulty, showRuby)}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>制限時間 (秒)</label>
            <div className="flex items-center gap-4">
              <button 
                className="nav-btn" 
                onClick={() => onUpdateSettings(maxRounds, Math.max(5, timerSetting - 5), difficulty, showRuby)}
              >
                <Minus size={20} />
              </button>
              <span style={{ fontSize: '1.5rem', minWidth: '3rem', textAlign: 'center', fontWeight: 'bold' }}>{timerSetting}</span>
              <button 
                className="nav-btn" 
                onClick={() => onUpdateSettings(maxRounds, Math.min(120, timerSetting + 5), difficulty, showRuby)}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="btn-primary w-full" 
        style={{ fontSize: '1.2rem', padding: '15px' }}
        disabled={players.length === 0}
        onClick={onStartGame}
      >
        ゲーム開始
      </button>
    </div>
  );
};
