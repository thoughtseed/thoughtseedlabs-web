import React from 'react';

const InstructionsToggle = ({ onToggle, isActive, isMoving }) => {
  if (isMoving) return null;
  
  return (
    <div 
      className={`instructions-toggle ${isActive ? 'active' : ''}`}
      onClick={() => onToggle(!isActive)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="16"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
      </svg>
    </div>
  );
};

export default InstructionsToggle;
