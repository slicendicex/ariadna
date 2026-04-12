import { useState } from 'react';
import type { NodeData, EdgeData } from './types/node';
import Scene from './Scene';
import NodeCard from './ui/NodeCard';
import NodeCreator, { computeNodePosition, pickNodeEntry } from './ui/NodeCreator';
import { MAX_NODE_TITLE_LENGTH } from './constants/node';

// Initial graph data — nodes now live in state, not a static constant
const INITIAL_NODES: NodeData[] = [
  { id: '1', position: [0, 0, 0],   color: '#e07b39', colorName: 'Orange', title: 'Alpha', content: '' },
  { id: '2', position: [2, 1, -2],  color: '#4cc9f0', colorName: 'Cyan',   title: 'Beta',  content: '' },
  { id: '3', position: [-2, -1, 1], color: '#c77dff', colorName: 'Violet', title: 'Gamma', content: '' },
];

const INITIAL_EDGES: EdgeData[] = [
  { id: 'e1-2', fromId: '1', toId: '2' },
  { id: 'e2-3', fromId: '2', toId: '3' },
  { id: 'e1-3', fromId: '1', toId: '3' },
];

export default function App() {
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<EdgeData[]>(INITIAL_EDGES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [linkingSourceId, setLinkingSourceId] = useState<string | null>(null);

  const handleNodeInteraction = (id: string | null) => {
    if (linkingSourceId) {
      if (id === null) {
        setLinkingSourceId(null);
        return;
      }
      
      if (id !== linkingSourceId) {
        const isDuplicate = edges.some(
          (e) => (e.fromId === linkingSourceId && e.toId === id) || (e.fromId === id && e.toId === linkingSourceId)
        );
        
        if (!isDuplicate) {
          setEdges((prev) => [...prev, { id: crypto.randomUUID(), fromId: linkingSourceId, toId: id }]);
        }
      }
      
      setLinkingSourceId(null);
      setSelectedNodeId(id);
      return;
    }
    
    setSelectedNodeId(id);
  };

  const startLink = () => {
    if (selectedNodeId) setLinkingSourceId(selectedNodeId);
  };

  const cancelLink = () => setLinkingSourceId(null);

  // Find the full node object for the card — null if nothing is selected
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  const addNode = (rawTitle: string) => {
    const trimmed = rawTitle.trim();
    const title = trimmed ? trimmed.slice(0, MAX_NODE_TITLE_LENGTH) : 'Untitled';
    const id = crypto.randomUUID();
    const position = computeNodePosition(nodes.length);
    const { hex, name } = pickNodeEntry(nodes.length);
    setNodes((prev) => [...prev, { id, position, color: hex, colorName: name, title, content: '' }]);
  };

  const updateNode = (id: string, updates: Partial<NodeData>) => {
    if (updates.title !== undefined) {
      updates.title = updates.title.slice(0, MAX_NODE_TITLE_LENGTH);
    }
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, ...updates } : node)));
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <Scene
        nodes={nodes}
        edges={edges}
        selectedNodeId={selectedNodeId}
        onNodeInteraction={handleNodeInteraction}
      />
      <NodeCard 
        node={selectedNode} 
        onUpdateNode={updateNode} 
        isLinking={linkingSourceId !== null}
        onStartLink={startLink}
        onCancelLink={cancelLink}
      />
      <NodeCreator onAddNode={addNode} />
    </div>
  );
}
