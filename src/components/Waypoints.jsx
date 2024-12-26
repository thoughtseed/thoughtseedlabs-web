import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const WAYPOINT_POSITIONS = [
  { position: [20, 1, 20], label: 'About' },
  { position: [-20, 1, 20], label: 'Projects' },
  { position: [20, 1, -20], label: 'Skills' },
  { position: [-20, 1, -20], label: 'Contact' }
];

const Waypoint = ({ position, label, onClick }) => {
  const meshRef = useRef();
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 2, 0); // Make waypoint face center
    }
  }, []);

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
        position={[0, 5, 0]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
        font={undefined}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {label}
      </Text>
      
      {/* Glow effect */}
      <pointLight color="#ff4444" intensity={1} distance={5} />
    </group>
  );
};

const Waypoints = ({ visible = true, onWaypointClick }) => {
  const { scene } = useThree();
  
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
        />
      ))}
    </group>
  );
};

export default Waypoints;
