import { Info } from 'lucide-react';

const InstructionsToggle = ({ onToggle, isActive }) => {
  return (
    <button 
      className={`waypoints-toggle ${isActive ? 'active' : ''}`}
      onClick={() => onToggle(!isActive)}
      aria-label="Toggle Instructions"
    >
      <Info size={20} />
      <span>Info</span>
    </button>
  );
};

export default InstructionsToggle;
