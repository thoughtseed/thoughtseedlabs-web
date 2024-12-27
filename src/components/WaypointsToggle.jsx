import { Navigation } from 'lucide-react';

const WaypointsToggle = ({ onToggle, isActive }) => {
  return (
    <button 
      className={`waypoints-toggle ${isActive ? 'active' : ''}`}
      onClick={() => onToggle(!isActive)}
      aria-label="Toggle Waypoints"
    >
      <Navigation size={20} />
      <span>Waypoints</span>
    </button>
  );
};

export default WaypointsToggle;
