import * as THREE from 'three';

const Flag = ({ position = [0, 10, 0], color = "#ff4444", scale = 1 }) => {
  // Create triangular shape
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.8);
  shape.lineTo(1.6, 0);
  shape.lineTo(0, 0.8);
  shape.lineTo(0, -0.8);

  return (
    <group position={position} scale={scale}>
      {/* Pole */}
      <mesh position={[-0.25, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Flag */}
      <mesh position={[-0.25, 2.2, 0]} rotation={[0, 0, 0]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial 
          color={color}
          side={THREE.DoubleSide}
          emissive={color}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};

export default Flag;
