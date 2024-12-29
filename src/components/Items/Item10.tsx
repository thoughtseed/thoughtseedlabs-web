import { useGSAP } from "@gsap/react";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import * as THREE from "three";
import { CustomMaterial } from "./Item4";

export const Item10 = () => {
  const tetraRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (tetraRef.current && groupRef.current) {
      gsap
        .timeline({
          repeat: -1,
        })
        .to(
          tetraRef.current.rotation,
          {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 4,
            ease: "none",
          },
          0
        )
        .to(
          groupRef.current.rotation,
          {
            y: Math.PI * 2,
            duration: 6,
            ease: "none",
          },
          0
        );
    }
  }, []);

  return (
    <Center ref={groupRef}>
      <mesh ref={tetraRef}>
        <tetrahedronGeometry args={[2]}></tetrahedronGeometry>
        <CustomMaterial></CustomMaterial>
      </mesh>
    </Center>
  );
};
