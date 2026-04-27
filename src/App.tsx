import React from 'react';
import { useGameState } from './hooks/useGameState';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { Sun, Moon, Home, ArrowLeft } from 'lucide-react';

export default function App() {
  const {
    state,
    addPlayer,
    removePlayer,
    updateSettings,
    startGame,
    nextRound,
    prevRound,
    addScore,
    resetGame,
    toggleDarkMode
  } = useGameState();

  return (
    <div className="app-container">
      <div className="nav-bar">
        <div className="flex gap-2">
          {state.gameStatus !== 'setup' && (
            <>
              <button className="nav-btn" onClick={prevRound} title="戻る">
                <ArrowLeft size={20} />
              </button>
              <button className="nav-btn" onClick={resetGame} title="ホーム">
                <Home size={20} />
              </button>
            </>
          )}
        </div>
        <button className="nav-btn" onClick={toggleDarkMode}>
          {state.isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="mt-4">
        {state.gameStatus === 'setup' && (
          <SetupScreen
            players={state.players}
            maxRounds={state.maxRounds}
            timerSetting={state.timerSetting}
            difficulty={state.difficulty}
            showRuby={state.showRuby}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onUpdateSettings={updateSettings}
            onStartGame={startGame}
          />
        )}

        {state.gameStatus === 'playing' && (
          <GameScreen
            round={state.round}
            maxRounds={state.maxRounds}
            currentWords={state.currentWords}
            players={state.players}
            scores={state.scores}
            timerSetting={state.timerSetting}
            showRuby={state.showRuby}
            onAddScore={addScore}
            onNextRound={nextRound}
          />
        )}

        {state.gameStatus === 'finished' && (
          <ResultScreen
            players={state.players}
            scores={state.scores}
            onReset={resetGame}
          />
        )}
      </div>
    </div>
  );
}
