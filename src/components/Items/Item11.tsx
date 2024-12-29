import { useGSAP } from "@gsap/react";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import * as THREE from "three";
import { CustomMaterial } from "./Item4";

export const Item11 = () => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (cubeRef.current && groupRef.current) {
      gsap
        .timeline({
          repeat: -1,
        })
        .to(
          cubeRef.current.rotation,
          {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 5,
            ease: "none",
          },
          0
        )
        .to(
          groupRef.current.rotation,
          {
            y: Math.PI * 2,
            duration: 7,
            ease: "none",
          },
          0
        );
    }
  }, []);

  return (
    <Center ref={groupRef}>
      <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]}></boxGeometry>
        <CustomMaterial></CustomMaterial>
      </mesh>
    </Center>
  );
};
