import { Text, Center, Float, useFont } from "@react-three/drei";
import { useState, Suspense } from "react";
import { Vector3 } from "three";

const TextContent = () => {
  const [hovered, setHovered] = useState(false);
  const targetPosition = new Vector3(0, 35, 0);
  const font = useFont("/fonts/SubjectivitySerif-Bold.woff2");

  return (
    <Center position={targetPosition.toArray()}>
      <Float
        speed={2}
        rotationIntensity={0.4}
        floatIntensity={0.4}
      >
        <Text
          font={font}
          fontSize={5}
          letterSpacing={0.1}
          anchorX="center"
          anchorY="middle"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          scale={hovered ? 1.1 : 1}
          color={hovered ? "#ff9f1c" : "#2ec4b6"}
          material-roughness={0.1}
          material-metalness={0.8}
        >
          THOUGHTSEED
        </Text>
      </Float>
    </Center>
  );
};

const ThoughtSeedText = () => {
  return (
    <Suspense fallback={null}>
      <TextContent />
    </Suspense>
  );
};

export default ThoughtSeedText;
