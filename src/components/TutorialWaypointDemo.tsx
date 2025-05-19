import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// A simplified version of a waypoint for the tutorial
const TutorialWaypoint = ({ position, color, label, highlighted = false }) => {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [scale, setScale] = useState(1)
  
  // Pulse animation for highlighted waypoints
  useFrame((state) => {
    if (highlighted) {
      const t = state.clock.getElapsedTime()
      setScale(1 + Math.sin(t * 2) * 0.1)
    }
  })
  
  return (
    <group 
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Simple geometric shape for the waypoint */}
      <mesh castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={hovered || highlighted ? 0.8 : 0.4}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {label}
      </Text>
      
      {/* Light effect */}
      <pointLight 
        color={color} 
        intensity={hovered || highlighted ? 1.5 : 0.8}
        distance={3}
        decay={2}
      />
    </group>
  )
}

// Component that renders a mini scene with waypoints for the tutorial
const TutorialWaypointDemo: React.FC<{
  className?: string,
  highlightIndex?: number,
  autoRotate?: boolean
}> = ({ 
  className = '',
  highlightIndex = -1, 
  autoRotate = true 
}) => {
  // Sample waypoints in a simple pattern for demonstration
  const waypoints = [
    { position: [0, 0, 0], color: '#4A90E2', label: 'CENTER' },
    { position: [2, 0, -2], color: '#50E3C2', label: 'POINT A' },
    { position: [-2, 0, -1.5], color: '#F5A623', label: 'POINT B' },
    { position: [1.5, 0, 1.5], color: '#B8E986', label: 'POINT C' },
    { position: [-2, 0, 2], color: '#9013FE', label: 'POINT D' }
  ]

  return (
    <div className={`w-full h-[220px] sm:h-[250px] md:h-[300px] ${className}`}>
      <Canvas 
        shadows 
        camera={{ position: [0, 4, 6], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 20]} />
        
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize={1024}
        />
        
        {/* Ground plane with grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#111111" 
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        <gridHelper args={[20, 20, '#333333', '#222222']} />
        
        {/* Waypoints */}
        {waypoints.map((waypoint, index) => (
          <TutorialWaypoint 
            key={index} 
            {...waypoint} 
            highlighted={highlightIndex === index}
          />
        ))}
        
        {/* Camera controls - improved for mobile */}
        <OrbitControls 
          autoRotate={autoRotate}
          autoRotateSpeed={0.3} 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minPolarAngle={Math.PI / 4}
          rotateSpeed={0.5} 
          dampingFactor={0.1} 
          enableDamping={true}
          touches={{
            ONE: THREE.TOUCH.ROTATE
          }}
        />
      </Canvas>
    </div>
  )
}

export default TutorialWaypointDemo
