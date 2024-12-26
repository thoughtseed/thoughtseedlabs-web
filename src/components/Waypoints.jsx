import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const ACTIVATION_RADIUS = 30; // Distance at which labels start to appear
const FULL_VISIBILITY_RADIUS = 15; // Distance at which labels are fully visible

// Waypoints positioned to create a meandering journey through the Thoughtseed experience
// Starting near the character's spawn point and winding through the space
const WAYPOINT_POSITIONS = [
  { 
    position: [0, 1, 35],      // Start far ahead
    label: 'About'
  },
  { 
    position: [-65, 1, -10],   // Very far left
    label: 'Science'
  },
  { 
    position: [55, 1, -45],    // Very far right and back
    label: 'Engineering'
  },
  { 
    position: [-45, 1, -75],   // Far left and very far back
    label: 'Design'
  },
  { 
    position: [0, 1, -95],     // Extremely far back center
    label: 'Contact'
  }
];

const Waypoint = ({ position, label, onClick, playerPosition }) => {
  const meshRef = useRef();
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 2, 0);
    }
  }, []);

  // Update opacity based on distance to player
  useEffect(() => {
    if (playerPosition) {
      const distance = new THREE.Vector3(...position).distanceTo(new THREE.Vector3(...playerPosition));
      
      if (distance > ACTIVATION_RADIUS) {
        setOpacity(0);
      } else if (distance < FULL_VISIBILITY_RADIUS) {
        setOpacity(1);
      } else {
        // Smooth transition between activation and full visibility
        const fadeRange = ACTIVATION_RADIUS - FULL_VISIBILITY_RADIUS;
        const fadeProgress = (ACTIVATION_RADIUS - distance) / fadeRange;
        setOpacity(fadeProgress);
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
      {/* Marker */}
      <mesh 
        ref={meshRef} 
        position={[0, 3, 0]}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <cylinderGeometry args={[0.3, 0, 1.5, 4]} />
        <meshStandardMaterial 
          color="#ff4444"
          emissive="#ff4444"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, 8, 0]}
        fontSize={3}
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
      
      {/* Glow effect */}
      <pointLight color="#ff4444" intensity={1} distance={5} />
    </group>
  );
};

const Waypoints = ({ visible = true, onWaypointClick, playerPosition }) => {
  const { scene, camera } = useThree();
  
  // Hide/show waypoints based on visible prop
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
          position={waypoint.position}
          label={waypoint.label}
          onClick={() => onWaypointClick?.(waypoint.label.toLowerCase())}
          playerPosition={playerPosition}
        />
      ))}
    </group>
  );
};

export default Waypoints;
