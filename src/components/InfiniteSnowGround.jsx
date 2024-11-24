/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useMemo, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
  useTexture,
  useGLTF,
  useAnimations,
  PositionalAudio,
} from "@react-three/drei";
import * as THREE from "three";
import { FogEffect } from "./FogEffect";

// Utils
import { lerpAngle } from "../utils/helper-functions";

// Constants for world and character configuration
const CHUNK_SIZE = 50;
const CHUNKS_PER_SIDE = 1;
const GRID_RESOLUTION = 64;
const CHARACTER_SPEED = 12;
const CHUNK_UNLOAD_DISTANCE = CHUNK_SIZE * 3;
const CHUNK_OVERLAP = 0.5;
const DEFORM_RADIUS = 2.5;

// Temporary vectors for calculations to avoid reallocating memory
const tempVertex = new THREE.Vector3();
const tempVector = new THREE.Vector3();

const InfiniteSnowWorld = () => {
  // Character and chunk references
  const characterRef = useRef();
  const characterParentRef = useRef();
  const chunksRef = useRef([]);
  const lastActiveChunkRef = useRef(null);
  const deformedChunksMapRef = useRef(new Map());

  // Movement and smoothing
  const smoothMovement = useRef(new THREE.Vector3());
  const lastMovementTime = useRef(0);
  const currentRotation = useRef(0);

  // Camera setup
  const { camera } = useThree();
  const cameraOffset = useMemo(() => new THREE.Vector3(0, 20, 30), []);
  const cameraTargetRef = useRef(new THREE.Vector3());

  // State for movement and audio
  const [isMoving, setIsMoving] = useState(false);
  const footstepAudioRef = useRef();

  // Load textures for snow and character
  const [colorMap, normalMap, roughnessMap, aoMap, displacementMap] =
    useTexture([
      "/textures/snow/snow-color.jpg",
      "/textures/snow/snow-normal-gl.jpg",
      "/textures/snow/snow-roughness.jpg",
      "/textures/snow/snow-ambientocclusion.jpg",
      "/textures/snow/snow-displacement.jpg",
    ]);

  const [occlusion, texture, normal] = useTexture([
    "/textures/character/occlusion.png",
    "/textures/character/texture.png",
    "/textures/character/normal.png",
  ]);

  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const { scene, animations } = useGLTF("/models/explorer.glb");
  const { actions } = useAnimations(animations, scene);
  const currentAnimationRef = useRef(null);

  const switchAnimation = (animationName) => {
    if (currentAnimationRef.current !== animationName) {
      if (currentAnimationRef.current && actions[currentAnimationRef.current]) {
        actions[currentAnimationRef.current].fadeOut(0.5);
      }
      if (actions[animationName]) {
        actions[animationName].reset().fadeIn(0.4).play();
        currentAnimationRef.current = animationName;
      }
    }
  };

  texture.flipY = false;
  normal.flipY = false;
  occlusion.flipY = false;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.normalMap = normal;
        child.material.aoMap = occlusion;
        child.material.needsUpdate = true;
      }
    });

    if (characterRef.current) {
      characterRef.current.scale.set(0.1, 0.1, 0.1);
    }
  }, [scene, texture, normal, occlusion]);

  // Adjust character's vertical position based on bounding box
  useEffect(() => {
    if (characterRef.current) {
      const boundingBox = new THREE.Box3().setFromObject(characterRef.current);
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      const yMin = boundingBox.min.y;

      characterParentRef.current.position.set(
        0,
        -yMin * characterRef.current.scale.y - 0.5,
        0
      );
    }
  }, [scene]);

  // Handle keyboard inputs for movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
          movement.current.forward = true;
          break;
        case "arrowdown":
        case "s":
          movement.current.backward = true;
          break;
        case "arrowleft":
        case "a":
          movement.current.left = true;
          break;
        case "arrowright":
        case "d":
          movement.current.right = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
          movement.current.forward = false;
          break;
        case "arrowdown":
        case "s":
          movement.current.backward = false;
          break;
        case "arrowleft":
        case "a":
          movement.current.left = false;
          break;
        case "arrowright":
        case "d":
          movement.current.right = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handle touch inputs for mobile controls
  useEffect(() => {
    const touchStartRef = { x: 0, y: 0 };
    const joystickRef = { x: 0, y: 0 };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      touchStartRef.x = touch.clientX;
      touchStartRef.y = touch.clientY;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      const deltaX = touch.clientX - touchStartRef.x;
      const deltaY = touch.clientY - touchStartRef.y;

      const maxRadius = 50; // Maximum joystick radius
      const distance = Math.min(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        maxRadius
      );
      const angle = Math.atan2(deltaY, deltaX);

      joystickRef.x = (distance / maxRadius) * Math.cos(angle);
      joystickRef.y = (distance / maxRadius) * Math.sin(angle);

      movement.current.left = joystickRef.x < -0.3;
      movement.current.right = joystickRef.x > 0.3;
      movement.current.forward = joystickRef.y < -0.3;
      movement.current.backward = joystickRef.y > 0.3;
    };

    const handleTouchEnd = () => {
      joystickRef.x = 0;
      joystickRef.y = 0;
      movement.current.left = false;
      movement.current.right = false;
      movement.current.forward = false;
      movement.current.backward = false;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Generate snow chunks based on CHUNKS_PER_SIDE
  const snowChunks = useMemo(() => {
    const chunks = [];
    for (let x = -CHUNKS_PER_SIDE; x <= CHUNKS_PER_SIDE; x++) {
      for (let z = -CHUNKS_PER_SIDE; z <= CHUNKS_PER_SIDE; z++) {
        chunks.push({ x, z });
      }
    }
    return chunks;
  }, []);

  // Utility functions for chunk management
  const getChunkKey = (x, z) =>
    `${Math.round(x / CHUNK_SIZE)},${Math.round(z / CHUNK_SIZE)}`;

  const saveChunkDeformation = (chunk) => {
    if (!chunk) return;
    const chunkKey = getChunkKey(chunk.position.x, chunk.position.z);
    const position = chunk.geometry.attributes.position;
    deformedChunksMapRef.current.set(
      chunkKey,
      new Float32Array(position.array)
    );
  };

  const loadChunkDeformation = (chunk) => {
    if (!chunk) return;
    const chunkKey = getChunkKey(chunk.position.x, chunk.position.z);
    const savedDeformation = deformedChunksMapRef.current.get(chunkKey);

    if (savedDeformation) {
      const position = chunk.geometry.attributes.position;
      position.array.set(savedDeformation);
      position.needsUpdate = true;
      chunk.geometry.computeVertexNormals();
      return true;
    }
    return false;
  };

  const getNeighboringChunks = (position, chunksRef) => {
    return chunksRef.current.filter((chunk) => {
      const distance = new THREE.Vector2(
        chunk.position.x - position.x,
        chunk.position.z - position.z
      ).length();
      return distance < CHUNK_SIZE + DEFORM_RADIUS;
    });
  };

  const recycleDistantChunks = (characterPosition) => {
    chunksRef.current.forEach((chunk) => {
      const distance = new THREE.Vector2(
        chunk.position.x - characterPosition.x,
        chunk.position.z - characterPosition.z
      ).length();

      if (distance > CHUNK_UNLOAD_DISTANCE) {
        const geometry = chunk.geometry;
        const originalPosition = geometry.userData.originalPosition;

        if (originalPosition) {
          geometry.attributes.position.array.set(originalPosition);
          geometry.attributes.position.needsUpdate = true;
          geometry.computeVertexNormals();
        }

        const chunkKey = getChunkKey(chunk.position.x, chunk.position.z);
        deformedChunksMapRef.current.delete(chunkKey);
      }
    });
  };

  const deformMesh = useMemo(() => {
    return (mesh, point) => {
      if (!mesh) return;

      const neighboringChunks = getNeighboringChunks(point, chunksRef);

      neighboringChunks.forEach((chunk) => {
        const geometry = chunk.geometry;
        const position = geometry.attributes.position;
        const vertices = position.array;

        let hasDeformation = false;

        for (let i = 0; i < position.count; i++) {
          tempVertex.fromArray(vertices, i * 3);
          chunk.localToWorld(tempVertex);

          const distance = tempVertex.distanceTo(point);

          if (distance < DEFORM_RADIUS) {
            const influence = Math.pow(
              (DEFORM_RADIUS - distance) / DEFORM_RADIUS,
              3
            );

            const yOffset = influence * 10;
            tempVertex.y -=
              yOffset * Math.sin((distance / DEFORM_RADIUS) * Math.PI);

            const waveAmplitude = 0.005;
            const waveFrequency = 4;
            tempVertex.y += waveAmplitude * Math.sin(waveFrequency * distance);

            chunk.worldToLocal(tempVertex);
            tempVertex.toArray(vertices, i * 3);
            hasDeformation = true;
          }
        }

        if (hasDeformation) {
          position.needsUpdate = true;
          geometry.computeVertexNormals();
          saveChunkDeformation(chunk);
        }
      });
    };
  }, []);

  const characterPosition = new THREE.Vector3();

  // Main animation loop using useFrame
  useFrame((state, delta) => {
    const speed = CHARACTER_SPEED;
    const direction = new THREE.Vector3();

    // Determine movement direction based on input
    if (movement.current.forward) direction.z -= 1;
    if (movement.current.backward) direction.z += 1;
    if (movement.current.left) direction.x -= 1;
    if (movement.current.right) direction.x += 1;

    direction.normalize();

    // Apply smoothing to the movement
    smoothMovement.current.lerp(direction, 0.05);

    const isCurrentlyMoving = smoothMovement.current.lengthSq() > 0.01;

    // Handle movement state and audio
    if (isCurrentlyMoving) {
      lastMovementTime.current = state.clock.elapsedTime;
      if (!isMoving) {
        setIsMoving(true);
        if (footstepAudioRef.current && !footstepAudioRef.current.isPlaying) {
          footstepAudioRef.current.play();
        }
      }
    } else {
      if (state.clock.elapsedTime - lastMovementTime.current > 1) {
        if (isMoving) {
          setIsMoving(false);
          if (footstepAudioRef.current && footstepAudioRef.current.isPlaying) {
            footstepAudioRef.current.stop();
          }
        }
      }
    }

    // Update animation based on movement
    if (isCurrentlyMoving) {
      switchAnimation("Armature|mixamo.com|Layer0");
    } else {
      switchAnimation("Armature.001|mixamo.com|Layer0");
    }

    // Update character position and rotation
    if (characterParentRef.current) {
      if (isCurrentlyMoving) {
        characterParentRef.current.position.addScaledVector(
          smoothMovement.current,
          speed * delta
        );

        const targetRotation = Math.atan2(
          smoothMovement.current.x,
          smoothMovement.current.z
        );
        currentRotation.current = lerpAngle(
          currentRotation.current,
          targetRotation,
          delta * 4
        );
        characterParentRef.current.rotation.y = currentRotation.current;
      }

      characterParentRef.current.getWorldPosition(characterPosition);

      cameraTargetRef.current
        .copy(characterPosition)
        .add(new THREE.Vector3(0, 0, 0));

      const offsetRotated = cameraOffset
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 0, 0), currentRotation.current);
      const targetCameraPosition = characterPosition.clone().add(offsetRotated);

      camera.position.lerp(targetCameraPosition, 0.01);
      camera.lookAt(
        cameraTargetRef.current.x,
        cameraTargetRef.current.y + 7,
        cameraTargetRef.current.z
      );

      // Handle chunk positioning and deformation when moving
      if (isCurrentlyMoving) {
        const { x: charX, z: charZ } = characterParentRef.current.position;

        // Update chunk positions based on character's current position
        chunksRef.current.forEach((chunk, index) => {
          const chunkX =
            Math.round(charX / CHUNK_SIZE) * CHUNK_SIZE +
            snowChunks[index].x * CHUNK_SIZE;
          const chunkZ =
            Math.round(charZ / CHUNK_SIZE) * CHUNK_SIZE +
            snowChunks[index].z * CHUNK_SIZE;

          if (chunk.position.x !== chunkX || chunk.position.z !== chunkZ) {
            chunk.position.set(chunkX, 0, chunkZ);
            if (!loadChunkDeformation(chunk)) {
              const geometry = chunk.geometry;
              const originalPosition = geometry.userData.originalPosition;
              if (originalPosition) {
                geometry.attributes.position.array.set(originalPosition);
                geometry.attributes.position.needsUpdate = true;
                geometry.computeVertexNormals();
              }
            }
          }
        });

        // Determine the active chunk based on character's position
        const activeChunkIndex = chunksRef.current.findIndex((chunk) => {
          const chunkMinX = chunk.position.x - CHUNK_SIZE / 2;
          const chunkMaxX = chunk.position.x + CHUNK_SIZE / 2;
          const chunkMinZ = chunk.position.z - CHUNK_SIZE / 2;
          const chunkMaxZ = chunk.position.z + CHUNK_SIZE / 2;

          return (
            charX >= chunkMinX &&
            charX < chunkMaxX &&
            charZ >= chunkMinZ &&
            charZ < chunkMaxZ
          );
        });

        if (activeChunkIndex !== -1) {
          const activeChunk = chunksRef.current[activeChunkIndex];
          lastActiveChunkRef.current = activeChunk;

          // Get character's foot positions for deformation
          const leftFootBone =
            characterRef.current.getObjectByName("mixamorigLeftFoot");
          const rightFootBone =
            characterRef.current.getObjectByName("mixamorigRightFoot");

          if (leftFootBone) {
            tempVector.setFromMatrixPosition(leftFootBone.matrixWorld);
            deformMesh(activeChunk, tempVector);
          }

          if (rightFootBone) {
            tempVector.setFromMatrixPosition(rightFootBone.matrixWorld);
            deformMesh(activeChunk, tempVector);
          }
        }

        // Recycle chunks that are too far from the character
        recycleDistantChunks(characterPosition);
      }
    }
  });

  return (
    <>
      {snowChunks.map((chunk, index) => (
        <mesh
          key={`${chunk.x}-${chunk.z}`}
          ref={(el) => {
            if (el) {
              chunksRef.current[index] = el;

              // Save the original position of the chunk for resetting deformations
              if (!el.geometry.userData.originalPosition) {
                el.geometry.userData.originalPosition =
                  el.geometry.attributes.position.array.slice();
              }
            }
          }}
          rotation={[-Math.PI / 2, 0, 0]} // Rotate to make it horizontal
          position={[chunk.x * CHUNK_SIZE, 0, chunk.z * CHUNK_SIZE]}
        >
          <planeGeometry
            args={[
              CHUNK_SIZE + CHUNK_OVERLAP * 2,
              CHUNK_SIZE + CHUNK_OVERLAP * 2,
              GRID_RESOLUTION,
              GRID_RESOLUTION,
            ]}
          />
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            displacementMap={displacementMap}
            displacementScale={2}
          />
        </mesh>
      ))}

      <group ref={characterParentRef}>
        <primitive ref={characterRef} object={scene} />
        <FogEffect />
        <PositionalAudio
          ref={footstepAudioRef}
          url="/audio/snow-step.mp3"
          distance={10}
          loop={true}
          autoplay={false}
        />
      </group>
    </>
  );
};

export default InfiniteSnowWorld;
