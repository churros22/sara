
import { ReactNode } from 'react';

type AnimationType = 'fade-in' | 'scale-in' | 'float' | 'pulse-gentle' | 'slide-in' | 'rainbow';

interface AnimatedWrapProps {
  children: ReactNode;
  animation: AnimationType;
  delay?: number;
  className?: string;
}

const AnimatedWrap = ({ 
  children, 
  animation, 
  delay = 0, 
  className = '' 
}: AnimatedWrapProps) => {
  // Build the animation class based on the animation type
  let animationClass = '';
  
  switch (animation) {
    case 'fade-in':
      animationClass = 'animate-fade-in';
      break;
    case 'scale-in':
      animationClass = 'animate-scale-in';
      break;
    case 'float':
      animationClass = 'animate-float';
      break;
    case 'pulse-gentle':
      animationClass = 'animate-pulse-gentle';
      break;
    case 'slide-in':
      animationClass = 'animate-slide-in';
      break;
    case 'rainbow':
      animationClass = 'animate-rainbow';
      break;
    default:
      animationClass = 'animate-fade-in';
  }

  return (
    <div 
      className={`${animationClass} ${className}`} 
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default AnimatedWrap;
