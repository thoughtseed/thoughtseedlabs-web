import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import { useAudio } from '../hooks/useAudio';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9 } from './Items/index';

const ACTIVATION_RADIUS = 10;
const FULL_VISIBILITY_RADIUS = 5;
const PHI = 1.618033988749895; // Golden ratio
const GOLDEN_ANGLE = 137.5 * (Math.PI / 180); // Golden angle in radians
const BASE_RADIUS = 15; // Starting radius

// Calculate Fibonacci spiral positions
const calculateSpiralPosition = (n) => {
    const radius = Math.min(BASE_RADIUS * Math.pow(PHI, n/2), 90); // Cap at 90 units
    const angle = n * GOLDEN_ANGLE;
    const x = radius * Math.cos(angle);
    const z = -Math.abs(radius * Math.sin(angle)); // Negative Z to go away from spawn
    return [x, 5, z];
};

// Primary Navigation - Following Fibonacci spiral
const INNER_CIRCLE_POSITIONS = [
  { 
    position: calculateSpiralPosition(0),  // Center (Our Approach)
    label: 'OUR APPROACH',
    color: '#4A90E2',
    ItemComponent: Item1
  },
  { 
    position: calculateSpiralPosition(1),  // First spiral point
    label: 'SERVICES',
    color: '#50E3C2',
    ItemComponent: Item2
  },
  { 
    position: calculateSpiralPosition(2), // Second spiral point
    label: 'PROJECTS',
    color: '#F5A623',
    ItemComponent: Item3
  },
  { 
    position: calculateSpiralPosition(3), // Third spiral point
    label: 'ABOUT US',
    color: '#B8E986',
    ItemComponent: Item4
  },
  { 
    position: calculateSpiralPosition(4), // Fourth spiral point
    label: 'CONTACT US',
    color: '#9013FE',
    ItemComponent: Item5
  }
];

// Outer circle - Continuing the spiral
const OUTER_CIRCLE_POSITIONS = [
  {
    position: calculateSpiralPosition(5), // Fifth spiral point
    label: 'SCIENCE',
    color: '#FF4081',
    ItemComponent: Item6
  },
  {
    position: calculateSpiralPosition(6), // Sixth spiral point
    label: 'ENGINEERING',
    color: '#00BCD4',
    ItemComponent: Item7
  },
  {
    position: calculateSpiralPosition(7), // Seventh spiral point
    label: 'DESIGN',
    color: '#FFC107',
    ItemComponent: Item8
  },
  {
    position: calculateSpiralPosition(8), // Eighth spiral point
    label: 'ART',
    color: '#8BC34A',
    ItemComponent: Item9
  }
];

const WAYPOINT_POSITIONS = [...INNER_CIRCLE_POSITIONS, ...OUTER_CIRCLE_POSITIONS];

const Waypoint = ({ position, label, color, onClick, playerPosition, ItemComponent }) => {
  const { addVisitedWaypoint } = useStore();
  const { playWaypointSound } = useAudio();
  const meshRef = useRef();
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const wasInRadius = useRef(false);
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 2, 0);
    }
  }, []);

  useEffect(() => {
    if (playerPosition) {
      const distance = new THREE.Vector3(...position).distanceTo(new THREE.Vector3(...playerPosition));
      const isInRadius = distance <= ACTIVATION_RADIUS;
      
      // Play sound when entering radius
      if (isInRadius && !wasInRadius.current) {
        playWaypointSound({ x: position[0], y: position[1], z: position[2] });
      }
      wasInRadius.current = isInRadius;
      
      if (distance > ACTIVATION_RADIUS) {
        setOpacity(0);
        setScale(0.5);
      } else if (distance < FULL_VISIBILITY_RADIUS) {
        setOpacity(1);
        setScale(1.3);
      } else {
        const fadeRange = ACTIVATION_RADIUS - FULL_VISIBILITY_RADIUS;
        const progress = (ACTIVATION_RADIUS - distance) / fadeRange;
        setOpacity(progress);
        setScale(0.5 + (progress * 0.8));
      }
    }
  }, [playerPosition, position, playWaypointSound]);

  const handleClick = () => {
    addVisitedWaypoint(label.toLowerCase());
    onClick?.();
  };

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  return (
    <group position={position}>
      <group
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={scale}
      >
        <ItemComponent />
      </group>
      
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          position={[0, 12, 0]}
          fontSize={3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font={undefined}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          material-transparent={true}
          material-opacity={opacity}
          material-depthWrite={false}
          material-depthTest={false}
          renderOrder={10}
          maxWidth={20}
          visible={opacity > 0}
          outlineWidth={0.2}
          outlineColor="#000000"
          outlineOpacity={1}
          strokeWidth={2}
          strokeColor="#000000"
          strokeOpacity={1}
          fillOpacity={1}
          fontWeight={800}
        >
          {label}
        </Text>
      </Billboard>
      
      <pointLight 
        color={color} 
        intensity={scale * 0.8}
        distance={5 * scale}
      />
    </group>
  );
};

const Waypoints = ({ visible = true, onWaypointClick, playerPosition }) => {
  const { scene, camera } = useThree();
  
  useEffect(() => {
    const waypointsGroup = scene.getObjectByName('waypoints-group');
    if (waypointsGroup) {
      waypointsGroup.visible = visible;
    }
  }, [visible, scene]);

  return (
    <group name="waypoints-group">
      {WAYPOINT_POSITIONS.map((waypoint, index) => (
        <Waypoint 
          key={index}
          {...waypoint}
          onClick={() => onWaypointClick?.(waypoint.label.toLowerCase())}
          playerPosition={playerPosition}
        />
      ))}
    </group>
  );
};

export default Waypoints;
