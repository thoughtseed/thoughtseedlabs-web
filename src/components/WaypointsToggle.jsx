import { Navigation } from 'lucide-react';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { cn } from '../utils/helper-functions.js';
import { useAudio } from '../hooks/useAudio';

const WaypointsToggle = ({ onToggle, isActive }) => {
  const { playToggleSound } = useAudio();
  return (
    <HoverBorderGradient
      onClick={() => {
        playToggleSound();
        onToggle(!isActive);
      }}
      className={cn(
        "text-black/80",
        isActive && "bg-black/20"
      )}
    >
      <Navigation size={20} />
      <span>Waypoints</span>
    </HoverBorderGradient>
  );
};

export default WaypointsToggle;
