import { Info } from 'lucide-react';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { cn } from '../utils/helper-functions.js';

const InstructionsToggle = ({ onToggle, isActive }) => {
  return (
    <HoverBorderGradient
      onClick={() => onToggle(!isActive)}
      className={cn(
        "text-black/80",
        isActive && "bg-black/20"
      )}
    >
      <Info size={20} />
      <span>Info</span>
    </HoverBorderGradient>
  );
};

export default InstructionsToggle;
