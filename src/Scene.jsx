import { Canvas, useThree } from "@react-three/fiber";
import SimpleSnowEffect from "./components/SimpleSnowEffect";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import InfiniteSnowGround from "./components/InfiniteSnowGround";
import Waypoints from "./components/Waypoints";
import FrameLimiter from "./utils/FPSLimiter";

const CameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 10, 40);  // Better initial camera position
    camera.lookAt(0, 4, -5);  // Look at character height
  }, [camera]);
  
  return null;
};

const Scene = ({ showWaypoints, onWaypointClick, onMovingChange, onPositionChange }) => {
  const [playerPosition, setPlayerPosition] = useState(null);
  return (
    <>
    <Canvas camera={{ fov: 50 }} dpr={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
      <color attach="background" args={[0xffffff]} />

      <directionalLight position={[4, 5, 0]} intensity={3} />

      <ambientLight intensity={1} />

      <CameraController />
      <InfiniteSnowGround 
        onMovingChange={onMovingChange}
        onPositionChange={(pos) => {
          setPlayerPosition(pos);
          onPositionChange?.(pos);
        }}
      />
      <Waypoints 
        visible={showWaypoints} 
        onWaypointClick={onWaypointClick}
        playerPosition={playerPosition}
      />

      <OrbitControls
        makeDefault
        enableDamping={true}
        dampingFactor={0.1}  // Increased damping for smoother movement
        rotateSpeed={0.7}    // Reduced rotation speed for better control
        enableRotate={true}
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 3}    // Limit upward viewing angle
        maxPolarAngle={Math.PI / 2.2}  // Limit downward viewing angle
        minDistance={35}     // Allow slightly closer zoom
        maxDistance={60}     // Restrict maximum distance to prevent seeing too far
        target={new THREE.Vector3(0, 4, -5)}  // Updated target to match new camera lookAt
        screenSpacePanning={true}  // More intuitive panning in screen space
      />

      <FrameLimiter />
    </Canvas>
    <SimpleSnowEffect />
    </>
  );
};

export default Scene;
