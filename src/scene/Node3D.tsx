import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

export interface Node3DProps {
  position?: [number, number, number];
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

// A single 3D node representation in the scene
export default function Node3D({
  position = [0, 0, 0],
  color = 'orange',
  isSelected = false,
  onClick,
}: Node3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the node slowly on every frame
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  const scale = isSelected ? 1.2 : 1;

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      scale={[scale, scale, scale]}
      onClick={handleClick}
    >
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
