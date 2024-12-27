import { Text, Center, Float, useFont } from "@react-three/drei";
import { useState, useEffect, useRef, Suspense } from "react";
import { Vector3 } from "three";
import gsap from "gsap";

const TextContent = () => {
  const [hovered, setHovered] = useState(false);
  const targetPosition = new Vector3(0, 35, 0);
  const font = useFont("/fonts/SubjectivitySerif-Bold.woff2");
  const textRef = useRef();

  useEffect(() => {
    if (textRef.current) {
      // Initial animation
      gsap.from(textRef.current.position, {
        y: -50,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      });
      
      gsap.from(textRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  return (
    <Center position={targetPosition.toArray()}>
      <Float
        speed={2}
        rotationIntensity={0.4}
        floatIntensity={0.4}
      >
        <Text
          ref={textRef}
          font={font}
          fontSize={7}
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
