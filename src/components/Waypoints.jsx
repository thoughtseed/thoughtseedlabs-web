import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9 } from './Items/index';

const ACTIVATION_RADIUS = 10;
const FULL_VISIBILITY_RADIUS = 5;

const ITEMS = [Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9];

// Primary Navigation - Inner circle
const INNER_CIRCLE_POSITIONS = [
  { 
    position: [0, 5, -25],
    label: 'OUR APPROACH',
    color: '#4A90E2',
    ItemComponent: Item1
  },
  { 
    position: [35, 5, -35],
    label: 'SERVICES',
    color: '#50E3C2',
    ItemComponent: Item2
  },
  { 
    position: [-35, 5, -95],
    label: 'PROJECTS',
    color: '#F5A623',
    ItemComponent: Item3
  },
  { 
    position: [25, 5, -55],
    label: 'ABOUT US',
    color: '#B8E986',
    ItemComponent: Item4
  },
  { 
    position: [-25, 5, -55],
    label: 'CONTACT US',
    color: '#9013FE',
    ItemComponent: Item5
  }
];

// Outer circle - Using full radius in all directions
const OUTER_CIRCLE_POSITIONS = [
  {
    position: [-95, 5, 0],
    label: 'SCIENCE',
    color: '#FF4081',
    ItemComponent: Item6
  },
  {
    position: [95, 5, 0],
    label: 'ENGINEERING',
    color: '#00BCD4',
    ItemComponent: Item7
  },
  {
    position: [-95, 5, -45],
    label: 'DESIGN',
    color: '#FFC107',
    ItemComponent: Item8
  },
  {
    position: [95, 5, -45],
    label: 'ART',
    color: '#8BC34A',
    ItemComponent: Item9
  }
];

const WAYPOINT_POSITIONS = [...INNER_CIRCLE_POSITIONS, ...OUTER_CIRCLE_POSITIONS];

const Waypoint = ({ position, label, color, onClick, playerPosition, ItemComponent }) => {
  const meshRef = useRef();
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 2, 0);
    }
  }, []);

  useEffect(() => {
    if (playerPosition) {
      const distance = new THREE.Vector3(...position).distanceTo(new THREE.Vector3(...playerPosition));
      
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
  }, [playerPosition, position]);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  return (
    <group position={position}>
      <group
        onClick={onClick}
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
          onClick={onClick}
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
          fontWeight={800} // Added heavy font weight
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
