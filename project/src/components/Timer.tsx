import { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  seconds: number;
  onTimeUp: () => void;
}

function Timer({ seconds, onTimeUp }: TimerProps) {
  useEffect(() => {
    if (seconds === 0) {
      onTimeUp();
    }
  }, [seconds, onTimeUp]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isLowTime = seconds < 300;
  const isWarningTime = seconds < 60;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-lg ${
        isWarningTime
          ? 'bg-red-100 text-red-700 animate-pulse'
          : isLowTime
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-700'
      }`}
    >
      <Clock size={24} />
      <span>
        {minutes}:{secs.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

export default Timer;
