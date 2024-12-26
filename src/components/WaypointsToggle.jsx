const WaypointsToggle = ({ onToggle, isActive }) => {
  const handleToggle = () => {
    onToggle?.(!isActive);
  };

  return (
    <button 
      className={`waypoints-toggle ${isActive ? 'active' : ''}`}
      onClick={handleToggle}
      aria-label="Toggle Waypoints"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        width="24"
        height="24"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <span>Waypoints</span>
    </button>
  );
};

export default WaypointsToggle;
