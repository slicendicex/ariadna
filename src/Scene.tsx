import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { NodeData, EdgeData } from './types/node';
import Node3D from './scene/Node3D';
import Edge3D from './scene/Edge3D';

interface SceneProps {
  nodes: NodeData[];
  edges: EdgeData[];
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
}

// The main Scene component: only renders the 3D world.
// Selection state is owned by the parent (App).
export default function Scene({ nodes, edges, selectedNodeId, onSelectNode }: SceneProps) {
  return (
    <div className="scene-container">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        onPointerMissed={() => onSelectNode(null)}
      >
        {/* Basic lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Camera controls */}
        <OrbitControls makeDefault />

        {/* Render edges — resolved by node id */}
        {edges.map((edge) => {
          const fromNode = nodes.find((n) => n.id === edge.fromId);
          const toNode = nodes.find((n) => n.id === edge.toId);
          if (!fromNode || !toNode) return null;
          return (
            <Edge3D
              key={edge.id}
              from={fromNode.position}
              to={toNode.position}
            />
          );
        })}

        {/* Render nodes */}
        {nodes.map((node) => (
          <Node3D 
            key={node.id} 
            position={node.position} 
            color={node.color} 
            isSelected={selectedNodeId === node.id}
            onClick={() => onSelectNode(node.id)}
          />
        ))}
      </Canvas>
    </div>
  );
}
