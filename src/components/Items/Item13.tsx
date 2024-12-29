import { useGSAP } from "@gsap/react";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import * as THREE from "three";
import { CustomMaterial } from "./Item4";

export const Item13 = () => {
  const dodecaRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (dodecaRef.current && groupRef.current) {
      gsap
        .timeline({
          repeat: -1,
        })
        .to(
          dodecaRef.current.rotation,
          {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 7,
            ease: "none",
          },
          0
        )
        .to(
          groupRef.current.rotation,
          {
            y: Math.PI * 2,
            duration: 9,
            ease: "none",
          },
          0
        );
    }
  }, []);

  return (
    <Center ref={groupRef}>
      <mesh ref={dodecaRef}>
        <dodecahedronGeometry args={[1.4]}></dodecahedronGeometry>
        <CustomMaterial></CustomMaterial>
      </mesh>
    </Center>
  );
};
