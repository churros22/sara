
import { useState, useEffect } from "react";

interface Sparkle {
  id: number;
  style: React.CSSProperties;
}

const SparkleEffect = () => {
  const [sparkles, setSparkles] = useState<Array<Sparkle>>([]);

  useEffect(() => {
    const createSparkle = () => {
      const id = Date.now();
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 10 + 5;
      const delay = Math.random() * 2;

      const style = {
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: ['#FFD700', '#A3F7BF', '#4CC9F0'][Math.floor(Math.random() * 3)],
        borderRadius: '50%',
        animationDelay: `${delay}s`,
        opacity: 0,
        zIndex: 1
      } as React.CSSProperties;

      setSparkles(prev => [...prev.slice(-20), { id, style }]);
    };

    const interval = setInterval(createSparkle, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {sparkles.map(sparkle => (
        <div 
          key={sparkle.id}
          className="animate-sparkle" 
          style={sparkle.style}
        />
      ))}
    </>
  );
};

export default SparkleEffect;
