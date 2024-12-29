import { useGSAP } from "@gsap/react";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import * as THREE from "three";
import { CustomMaterial } from "./Item4";

export const Item14 = () => {
  const icosaRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (icosaRef.current && groupRef.current) {
      gsap
        .timeline({
          repeat: -1,
        })
        .to(
          icosaRef.current.rotation,
          {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 8,
            ease: "none",
          },
          0
        )
        .to(
          groupRef.current.rotation,
          {
            y: Math.PI * 2,
            duration: 10,
            ease: "none",
          },
          0
        );
    }
  }, []);

  return (
    <Center ref={groupRef}>
      <mesh ref={icosaRef}>
        <icosahedronGeometry args={[1.2]}></icosahedronGeometry>
        <CustomMaterial isPlatonicSolid={true}></CustomMaterial>
      </mesh>
    </Center>
  );
};
