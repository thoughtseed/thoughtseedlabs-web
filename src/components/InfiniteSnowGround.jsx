import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { useAudio } from "../hooks/useAudio";
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

// Constants for snow deformation
const DEFORM_RADIUS = 2.5;
const WAVE_AMPLITUDE = 0.005;
const WAVE_FREQUENCY = 4;

// Animation Names
const WALK_ANIMATION = "Armature|mixamo.com|Layer0";
const IDLE_ANIMATION = "Armature.001|mixamo.com|Layer0";

// Temporary vector for calculations
const tempVector = new THREE.Vector3();

const InfiniteSnowWorld = ({ onMovingChange, onPositionChange }) => {
  // References for character and chunks
  const characterRef = useRef();
  const characterParentRef = useRef();
  const chunksRef = useRef([]);
  const lastActiveChunkRef = useRef(null);
  const deformedChunksMapRef = useRef(new Map());

  // References for movement and rotation smoothing
  const smoothMovement = useRef(new THREE.Vector3());
  const lastMovementTime = useRef(0);
  const currentRotation = useRef(0);
  const characterPosition = new THREE.Vector3();

  // Camera setup
  const { camera } = useThree();
  const cameraOffset = useMemo(() => new THREE.Vector3(0, 12, 20), []);
  const cameraTargetRef = useRef(new THREE.Vector3());
  const cameraLerpSpeed = useRef(0.05);
  const cameraLookAtOffset = useRef(new THREE.Vector3(0, 5, 0));
  const lastCameraDirection = useRef(new THREE.Vector3(0, 0, -1));

  // State for movement and audio
  const [isMoving, setIsMoving] = useState(false);
  const footstepAudioRef = useRef();

  // Reference for movement input
  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Load character model and animations
  const { scene, animations } = useGLTF("/models/explorer.glb");
  const { actions } = useAnimations(animations, scene);
  const currentAnimationRef = useRef(null);

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

  // Configure character textures
  texture.flipY = false;
  normal.flipY = false;
  occlusion.flipY = false;

  // Function to switch character animations
  const switchAnimation = (animationName) => {
    const currentAnimation = currentAnimationRef.current;

    if (currentAnimation === animationName) return;

    actions[currentAnimation]?.fadeOut(0.5);

    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(0.4).play();
      currentAnimationRef.current = animationName;
    }
  };

  // Update character materials and scale on load
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

  // Utility function to generate a unique key for each chunk
  const getChunkKey = (x, z) =>
    `${Math.round(x / CHUNK_SIZE)},${Math.round(z / CHUNK_SIZE)}`;

  // Save the deformation state of a chunk
  const saveChunkDeformation = useCallback((chunk) => {
    if (!chunk) return;
    const chunkKey = getChunkKey(chunk.position.x, chunk.position.z);
    const position = chunk.geometry.attributes.position;
    deformedChunksMapRef.current.set(
      chunkKey,
      new Float32Array(position.array)
    );
  }, []);

  // Load the deformation state of a chunk if available
  const loadChunkDeformation = useCallback((chunk) => {
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
  }, []);

  // Get chunks neighboring a specific position
  const getNeighboringChunks = useCallback((position, chunksRef) => {
    return chunksRef.current.filter((chunk) => {
      const distance = new THREE.Vector2(
        chunk.position.x - position.x,
        chunk.position.z - position.z
      ).length();
      return distance < CHUNK_SIZE + DEFORM_RADIUS;
    });
  }, []);

  // Recycle chunks that are too far from the character
  const recycleDistantChunks = (characterPosition) => {
    chunksRef.current.forEach((chunk) => {
      const distance = new THREE.Vector2(
        chunk.position.x - characterPosition.x,
        chunk.position.z - characterPosition.z
      ).length();

      if (distance > CHUNK_UNLOAD_DISTANCE) {
        const chunkKey = getChunkKey(chunk.position.x, chunk.position.z);
        
        // Save current deformation state before recycling
        if (chunk.geometry.attributes.position.needsUpdate) {
          saveChunkDeformation(chunk);
        }
        
        // Reset the geometry to original state to be reused elsewhere
        const geometry = chunk.geometry;
        const originalPosition = geometry.userData.originalPosition;

        if (originalPosition) {
          geometry.attributes.position.array.set(originalPosition);
          geometry.attributes.position.needsUpdate = true;
          geometry.computeVertexNormals();
        }
        
        // Note: We intentionally don't delete the deformation data from deformedChunksMapRef
        // This ensures the deformation data is preserved when the player returns to this area
      }
    });
    
    // Implement a cleanup mechanism to prevent memory bloat - keeping last 100 chunks max
    const maxStoredChunks = 100;
    if (deformedChunksMapRef.current.size > maxStoredChunks) {
      // Convert to array to find oldest entries
      const entries = Array.from(deformedChunksMapRef.current.entries());
      // Delete oldest entries (first ones in the map)
      const toDelete = entries.slice(0, entries.length - maxStoredChunks);
      toDelete.forEach(([key]) => {
        deformedChunksMapRef.current.delete(key);
      });
    }
  };

  // For optimizing vertex calculations
  const lastFootPositionsRef = useRef({
    left: new THREE.Vector3(),
    right: new THREE.Vector3()
  });
  const footMovementThreshold = 0.5; // Minimum movement required to trigger deformation
  
  // Function to deform the mesh based on a point of impact
  const deformMesh = useCallback(
    (mesh, point, foot) => {
      if (!mesh) return;
      
      // Check if foot position has changed enough to warrant recalculation
      const lastPos = lastFootPositionsRef.current[foot];
      if (lastPos.distanceToSquared(point) < footMovementThreshold * footMovementThreshold) {
        return; // Skip if foot hasn't moved enough
      }
      
      // Update last known foot position
      lastPos.copy(point);

      // Only process neighboring chunks (optimization)
      const neighboringChunks = getNeighboringChunks(point, chunksRef);
      const tempVertex = new THREE.Vector3();
      const geometriesToUpdate = [];
      
      // Pre-calculate squared deform radius for efficiency
      const deformRadiusSq = DEFORM_RADIUS * DEFORM_RADIUS;

      neighboringChunks.forEach((chunk) => {
        const geometry = chunk.geometry;
        if (!geometry || !geometry.attributes || !geometry.attributes.position)
          return;

        const positionAttribute = geometry.attributes.position;
        const vertices = positionAttribute.array;

        let hasDeformation = false;
        
        // Optimize by only checking vertices within potential range
        // Calculate chunk bounds relative to point
        const chunkBounds = new THREE.Box3();
        chunkBounds.setFromObject(chunk);
        
        // Skip chunk if it's definitely out of range
        const closestPointInChunk = new THREE.Vector3();
        chunkBounds.clampPoint(point, closestPointInChunk);
        if (closestPointInChunk.distanceToSquared(point) > deformRadiusSq) {
          return;
        }

        // Process vertices - check every 4th vertex first for quick rejection
        const stride = 4; // Check every 4th vertex first for quick test
        let needsDetailedPass = false;
        
        // First pass - sparse check
        for (let i = 0; i < positionAttribute.count; i += stride) {
          tempVertex.fromArray(vertices, i * 3);
          chunk.localToWorld(tempVertex);

          const distanceSq = tempVertex.distanceToSquared(point);
          
          if (distanceSq < deformRadiusSq) {
            needsDetailedPass = true;
            break;
          }
        }
        
        // If sparse check found something nearby, do detailed pass
        if (needsDetailedPass) {
          for (let i = 0; i < positionAttribute.count; i++) {
            tempVertex.fromArray(vertices, i * 3);
            chunk.localToWorld(tempVertex);

            const distanceSq = tempVertex.distanceToSquared(point);
            
            if (distanceSq < deformRadiusSq) {
              const distance = Math.sqrt(distanceSq);
              const influence = Math.pow(
                (DEFORM_RADIUS - distance) / DEFORM_RADIUS,
                3
              );

              const yOffset = influence * 10;
              tempVertex.y -=
                yOffset * Math.sin((distance / DEFORM_RADIUS) * Math.PI);

              tempVertex.y +=
                WAVE_AMPLITUDE * Math.sin(WAVE_FREQUENCY * distance);

              chunk.worldToLocal(tempVertex);
              tempVertex.toArray(vertices, i * 3);
              hasDeformation = true;
            }
          }
        }

        if (hasDeformation) {
          positionAttribute.needsUpdate = true;
          geometriesToUpdate.push(geometry);
          saveChunkDeformation(chunk);
        }
      });

      if (geometriesToUpdate.length > 0) {
        geometriesToUpdate.forEach((geometry) =>
          geometry.computeVertexNormals()
        );
      }
    },
    [getNeighboringChunks, chunksRef, saveChunkDeformation]
  );

  // Main animation loop
  useFrame((state, delta) => {
    const speed = CHARACTER_SPEED;
    const direction = new THREE.Vector3();

    // Use camera direction to determine movement direction for more intuitive controls
    const relativeCameraDir = lastCameraDirection.current.clone();
    relativeCameraDir.y = 0; // Keep movement in horizontal plane
    relativeCameraDir.normalize();
    
    // Calculate horizontal movement relative to camera view
    const rightVector = new THREE.Vector3().crossVectors(
      new THREE.Vector3(0, 1, 0),
      relativeCameraDir
    );
    
    // Apply inputs relative to camera direction
    if (movement.current.forward) direction.add(relativeCameraDir);
    if (movement.current.backward) direction.sub(relativeCameraDir);
    if (movement.current.left) direction.sub(rightVector);
    if (movement.current.right) direction.add(rightVector);
    
    // Only normalize if there's actual movement to prevent NaN values
    if (direction.lengthSq() > 0.001) {
      direction.normalize();
    }

    // Apply smoothing to the movement
    smoothMovement.current.lerp(direction, 0.05);

    const isCurrentlyMoving = smoothMovement.current.lengthSq() > 0.01;

  // Handle movement state and audio
  if (isCurrentlyMoving) {
    lastMovementTime.current = state.clock.elapsedTime;
    if (!isMoving) {
      setIsMoving(true);
      onMovingChange?.(true);
      if (footstepAudioRef.current && !footstepAudioRef.current.isPlaying) {
        footstepAudioRef.current.play();
      }
    }
  } else {
    if (state.clock.elapsedTime - lastMovementTime.current > 1) {
      if (isMoving) {
        setIsMoving(false);
        onMovingChange?.(false);
        if (footstepAudioRef.current && footstepAudioRef.current.isPlaying) {
          footstepAudioRef.current.stop();
        }
      }
    }
  }

    // Update animation based on movement
    switchAnimation(isCurrentlyMoving ? WALK_ANIMATION : IDLE_ANIMATION);

  // Update character position and rotation
  if (characterParentRef.current) {
      if (isCurrentlyMoving) {
        characterParentRef.current.position.addScaledVector(
          smoothMovement.current,
          speed * delta
        );

        // Calculate target rotation based on movement direction
        // This gives better response when camera angle changes
        const targetRotation = Math.atan2(
          smoothMovement.current.x,
          smoothMovement.current.z
        );
        
        // Apply smoother rotation with variable speed based on angle difference
        const angleDiff = Math.abs(targetRotation - currentRotation.current) % (2 * Math.PI);
        // Faster rotation when angle difference is large, slower for fine adjustments
        const rotationSpeed = angleDiff > 0.5 ? delta * 5 : delta * 3;
        
        currentRotation.current = lerpAngle(
          currentRotation.current,
          targetRotation,
          rotationSpeed
        );
        characterParentRef.current.rotation.y = currentRotation.current;
      }

      characterParentRef.current.getWorldPosition(characterPosition);
      onPositionChange?.([characterPosition.x, characterPosition.y, characterPosition.z]);

      // Update camera target to follow character with stable offset
      cameraTargetRef.current
        .copy(characterPosition)
        .add(cameraLookAtOffset.current);

      // Calculate camera position based on character's rotation
      const offsetRotated = cameraOffset
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRotation.current);
      const targetCameraPosition = characterPosition.clone().add(offsetRotated);

      // Store current camera direction for movement reference
      lastCameraDirection.current.set(
        Math.sin(currentRotation.current), 
        0, 
        Math.cos(currentRotation.current)
      ).normalize();
      
      // Apply smoother camera transition with faster response time
      camera.position.lerp(targetCameraPosition, cameraLerpSpeed.current);
      camera.lookAt(cameraTargetRef.current);

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
            deformMesh(activeChunk, tempVector, 'left');
          }

          if (rightFootBone) {
            tempVector.setFromMatrixPosition(rightFootBone.matrixWorld);
            deformMesh(activeChunk, tempVector, 'right');
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
          rotation={[-Math.PI / 2, 0, 0]}
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
