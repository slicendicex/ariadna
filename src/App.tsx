import { useState } from 'react';
import type { NodeData, EdgeData } from './types/node';
import Scene from './Scene';
import NodeCard from './ui/NodeCard';
import NodeCreator, { computeNodePosition, pickNodeEntry } from './ui/NodeCreator';

// Initial graph data — nodes now live in state, not a static constant
const INITIAL_NODES: NodeData[] = [
  { id: '1', position: [0, 0, 0],   color: '#e07b39', colorName: 'Orange', title: 'Alpha' },
  { id: '2', position: [2, 1, -2],  color: '#4cc9f0', colorName: 'Cyan',   title: 'Beta'  },
  { id: '3', position: [-2, -1, 1], color: '#c77dff', colorName: 'Violet', title: 'Gamma' },
];

const INITIAL_EDGES: EdgeData[] = [
  { id: 'e1-2', fromId: '1', toId: '2' },
  { id: 'e2-3', fromId: '2', toId: '3' },
  { id: 'e1-3', fromId: '1', toId: '3' },
];

export default function App() {
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_NODES);
  const [edges] = useState<EdgeData[]>(INITIAL_EDGES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Find the full node object for the card — null if nothing is selected
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  const addNode = (title: string) => {
    const id = crypto.randomUUID();
    const position = computeNodePosition(nodes.length);
    const { hex, name } = pickNodeEntry(nodes.length);
    setNodes((prev) => [...prev, { id, position, color: hex, colorName: name, title }]);
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <Scene
        nodes={nodes}
        edges={edges}
        selectedNodeId={selectedNodeId}
        onSelectNode={setSelectedNodeId}
      />
      <NodeCard node={selectedNode} />
      <NodeCreator onAddNode={addNode} />
    </div>
  );
}
