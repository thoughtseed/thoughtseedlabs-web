import { Lightbulb } from 'lucide-react';

const DirectionalHintToggle = ({ onToggle, isActive }) => {
  return (
    <button 
      className={`waypoints-toggle ${isActive ? 'active' : ''}`}
      onClick={() => onToggle(!isActive)}
      aria-label="Toggle Hints"
    >
      <Lightbulb size={20} />
      <span>Hints</span>
    </button>
  );
};

export default DirectionalHintToggle;
