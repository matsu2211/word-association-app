import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

type TimerProps = {
  initialTime: number;
  onTimeUp?: () => void;
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
};

export const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, isActive, onToggleActive }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeLeft === 0 && isActive) {
        onToggleActive(false);
        if (onTimeUp) onTimeUp();
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isActive, onTimeUp, onToggleActive]);

  const handleToggle = () => onToggleActive(!isActive);
  const handleReset = () => {
    setTimeLeft(initialTime);
    onToggleActive(false);
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / initialTime) * circumference;

  let strokeColor = 'var(--timer-normal)';
  if (timeLeft <= 5) {
    strokeColor = 'var(--timer-critical)';
  } else if (timeLeft <= 10) {
    strokeColor = 'var(--timer-warning)';
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="timer-container">
        <svg className="timer-svg" width="120" height="120">
          <circle className="timer-circle-bg" cx="60" cy="60" r={radius} />
          <circle
            className="timer-circle-progress"
            cx="60"
            cy="60"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: isNaN(offset) ? 0 : offset,
              stroke: strokeColor
            }}
          />
        </svg>
        <div className="timer-text" style={{ color: strokeColor }}>
          {timeLeft}
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          className="timer-control-btn" 
          onClick={handleToggle}
          title={isActive ? "一時停止" : "開始"}
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button 
          className="timer-control-btn" 
          onClick={handleReset}
          title="リセット"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};
