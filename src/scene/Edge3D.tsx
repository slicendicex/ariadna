import { useMemo } from 'react';
import * as THREE from 'three';

export interface Edge3DProps {
  from: [number, number, number];
  to: [number, number, number];
}

// A single 3D edge rendered as a line between two points in space
export default function Edge3D({ from, to }: Edge3DProps) {
  const lineObject = useMemo(() => {
    const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#555555' });
    return new THREE.Line(geometry, material);
  }, [from, to]);

  return <primitive object={lineObject} />;
}
