import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-09-01T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    // Pulse animation every 10 seconds
    const pulseTimer = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 500);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex justify-center items-center space-x-8 mb-8">
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <div key={unit} className="text-center">
          <div
            className={`
              bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[80px] border border-white/30
              ${isPulsing ? 'animate-countdown-pulse' : ''}
            `}
          >
            <div className="text-4xl md:text-5xl font-bold text-primary font-montserrat">
              {formatNumber(value)}
            </div>
          </div>
          <div className="text-white/90 text-sm uppercase tracking-wider mt-2 font-montserrat">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;