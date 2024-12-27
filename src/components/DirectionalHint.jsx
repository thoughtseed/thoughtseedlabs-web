import { useEffect, useState } from 'react';
import { ArrowRight, Navigation } from 'lucide-react';

const DirectionalHint = ({ playerPosition, waypoints, visible }) => {
  const [nearestWaypoint, setNearestWaypoint] = useState(null);
  const [distance, setDistance] = useState(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!visible || !playerPosition || !waypoints?.length) return;

    // Find nearest waypoint
    let nearest = null;
    let minDistance = Infinity;

    waypoints.forEach(waypoint => {
      const dx = waypoint.position[0] - playerPosition[0];
      const dz = waypoint.position[2] - playerPosition[2];
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < minDistance) {
        minDistance = dist;
        nearest = waypoint;
        
        // Calculate angle for arrow rotation
        const angleRad = Math.atan2(dz, dx);
        setAngle(angleRad * (180 / Math.PI));
      }
    });

    setNearestWaypoint(nearest);
    setDistance(Math.round(minDistance));
  }, [playerPosition, waypoints, visible]);

  if (!visible || !nearestWaypoint) return null;

  return (
    <div className="directional-hint">
      <div className="flex items-center gap-2">
        <div 
          className="transform transition-transform"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <ArrowRight size={20} className="text-white/80" />
        </div>
        <Navigation size={16} className="text-white/80" />
        <span className="font-medium">{nearestWaypoint.label}</span>
        <span className="text-sm text-white/60">{distance}m</span>
      </div>
    </div>
  );
};

export default DirectionalHint;
