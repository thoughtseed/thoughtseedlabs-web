import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import InfiniteSnowGround from "./components/InfiniteSnowGround";
import Waypoints from "./components/Waypoints";
import FrameLimiter from "./utils/FPSLimiter";

const CameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 30, 50);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return null;
};

const Scene = ({ showWaypoints, onWaypointClick }) => {
  return (
    <Canvas camera={{ fov: 65 }} dpr={1}>
      <color attach="background" args={["white"]} />

      <directionalLight position={[4, 5, 0]} intensity={3} />

      <ambientLight intensity={1} />

      <CameraController />
      <InfiniteSnowGround />
      <Waypoints 
        visible={showWaypoints} 
        onWaypointClick={onWaypointClick}
      />

      {/* <Stats /> */}
      <OrbitControls
        makeDefault
        enableDamping={true}
        dampingFactor={0.05}
        enableRotate={true}
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={30}
        maxDistance={70}
      />

      <FrameLimiter />
    </Canvas>
  );
};

export default Scene;
