import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

const PrepTimer = ({ startTime, prepTime, status }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isOverdue, setIsOverdue] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const start = new Date(startTime);
            const diff = start - now;

            setTimeLeft(Math.round(diff / 1000));
            setIsOverdue(diff < 0);
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    const formatTime = (seconds) => {
        const absSeconds = Math.abs(seconds);
        const mins = Math.floor(absSeconds / 60);
        const secs = absSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (status !== 'confirmed') return null;

    return (
        <div className={`
      flex items-center space-x-2 px-3 py-2 rounded-lg
      ${isOverdue
                ? 'bg-red-500/20 text-red-400'
                : timeLeft <= 120
                    ? 'bg-yellow-500/20 text-yellow-400 animate-pulse'
                    : 'bg-dark-700 text-dark-300'
            }
    `}>
            <FiClock className="w-4 h-4" />
            <span className="font-mono font-medium">
                {isOverdue ? '-' : ''}{formatTime(timeLeft)}
            </span>
            <span className="text-xs">
                {isOverdue ? 'overdue' : 'until prep'}
            </span>
        </div>
    );
};

export default PrepTimer;
