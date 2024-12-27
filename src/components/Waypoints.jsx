import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9 } from './Items/index';

const ACTIVATION_RADIUS = 25; // Visible within ~3 paces
const FULL_VISIBILITY_RADIUS = 15; // Full visibility at closer range

const ITEMS = [Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9];

// Primary Navigation - Meandering river path towards horizon
const INNER_CIRCLE_POSITIONS = [
  { 
    position: [10, 5, -35],  // Start further back and more to the right
    label: 'Our Approach',
    color: '#4A90E2',
    ItemComponent: Item1
  },
  { 
    position: [35, 5, -65],  // Meander right into distance
    label: 'Services',
    color: '#50E3C2',
    ItemComponent: Item2
  },
  { 
    position: [-35, 5, -95], // Meander left deeper
    label: 'Projects',
    color: '#F5A623',
    ItemComponent: Item3
  },
  { 
    position: [35, 5, -125], // Meander right further
    label: 'About Us',
    color: '#B8E986',
    ItemComponent: Item4
  },
  { 
    position: [-35, 5, -155], // Final meander left
    label: 'Contact Us',
    color: '#9013FE',
    ItemComponent: Item5
  }
];

// Krebs Cycle - Around the Contact Us area, deeper into horizon
const OUTER_CIRCLE_POSITIONS = [
  {
    position: [0, 5, -180],  // Beyond Contact Us
    label: 'Science',
    color: '#FF4081',
    ItemComponent: Item6
  },
  {
    position: [50, 5, -180],  // Right of Science
    label: 'Engineering',
    color: '#00BCD4',
    ItemComponent: Item7
  },
  {
    position: [0, 5, -220], // Further beyond Science
    label: 'Design',
    color: '#FFC107',
    ItemComponent: Item8
  },
  {
    position: [-50, 5, -180], // Left of Science
    label: 'Art',
    color: '#8BC34A',
    ItemComponent: Item9
  }
];

// Combine both circles
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
        setScale(0.5 + (progress * 0.8)); // Adjusted to reach max 1.3
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
      
      <Text
        position={[0, 5 + (scale * 2), 0]}
        fontSize={1.3 * scale}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font={undefined}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        material-transparent={true}
        material-opacity={opacity}
        material-depthWrite={true}
        renderOrder={1}
        maxWidth={10}
        visible={opacity > 0}
      >
        {label}
      </Text>
      
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
