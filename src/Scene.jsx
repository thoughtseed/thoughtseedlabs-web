import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import InfiniteSnowGround from "./components/InfiniteSnowGround";
import Waypoints from "./components/Waypoints";
import FrameLimiter from "./utils/FPSLimiter";

const CameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 8, 50);  // Much lower height, even further back
    camera.lookAt(0, 2, -5);  // Look slightly up and ahead
  }, [camera]);
  
  return null;
};

const Scene = ({ showWaypoints, onWaypointClick, onMovingChange, onPositionChange }) => {
  const [playerPosition, setPlayerPosition] = useState(null);
  return (
    <Canvas camera={{ fov: 50 }} dpr={1} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <color attach="background" args={["transparent"]} />

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

      {/* <Stats /> */}
      <OrbitControls
        makeDefault
        enableDamping={true}
        dampingFactor={0.05}
        enableRotate={true}
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}  // Prevent looking up too much
        maxPolarAngle={Math.PI / 2.8}  // Prevent looking down too much
        minDistance={40}  // Keep minimum distance further
        maxDistance={60}  // Allow slightly more zoom out
        target={new THREE.Vector3(0, 2, -5)}  // Match lookAt point
      />

      <FrameLimiter />
    </Canvas>
  );
};

export default Scene;
