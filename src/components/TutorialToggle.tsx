import React from 'react';
import { BookOpen } from 'lucide-react';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { cn } from '../utils/helper-functions.js';
import { useAudio } from '../hooks/useAudio';

interface TutorialToggleProps {
  onToggle: (isActive: boolean) => void;
  isActive: boolean;
}

const TutorialToggle: React.FC<TutorialToggleProps> = ({ onToggle, isActive }) => {
  const { playToggleSound } = useAudio();
  
  return (
    <HoverBorderGradient
      onClick={() => {
        playToggleSound();
        onToggle(!isActive);
      }}
      className={cn(
        "text-black/80 p-2 md:p-3",
        isActive && "bg-black/20"
      )}
    >
      <BookOpen className="w-5 h-5 md:w-[20px] md:h-[20px]" />
      <span className="hidden md:inline">Tutorial</span>
    </HoverBorderGradient>
  );
};

export default TutorialToggle;
