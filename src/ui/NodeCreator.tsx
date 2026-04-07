import { useState } from 'react';

interface NodeCreatorProps {
  onAddNode: (title: string) => void;
}

// DOM panel for creating new nodes — fixed in the bottom-left corner
export default function NodeCreator({ onAddNode }: NodeCreatorProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAddNode(trimmed);
    setTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        backgroundColor: 'rgba(20, 20, 20, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '12px 16px',
        color: '#eee',
        fontFamily: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '200px',
      }}
    >
      <div style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        New Node
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Node title..."
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '4px',
          padding: '6px 9px',
          color: '#eee',
          fontSize: '13px',
          outline: 'none',
          fontFamily: 'inherit',
        }}
      />
      <button
        type="submit"
        disabled={!title.trim()}
        style={{
          background: title.trim() ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          padding: '6px 12px',
          color: title.trim() ? '#eee' : 'rgba(255,255,255,0.3)',
          fontSize: '13px',
          cursor: title.trim() ? 'pointer' : 'default',
          fontFamily: 'inherit',
          transition: 'background 0.15s',
        }}
      >
        Add Node
      </button>
    </form>
  );
}

// Deterministic position for a new node based on existing node count.
// Forms a 4-column grid: X from -3 to 3, Y grows upward by row.
export function computeNodePosition(existingCount: number): [number, number, number] {
  const col = existingCount % 4;
  const row = Math.floor(existingCount / 4);
  const x = col * 2 - 3;
  const y = row * 2;
  return [x, y, 0];
}

// Palette: each entry owns both the display name and the hex value.
// This is the single source of truth for node color data.
const NODE_PALETTE = [
  { hex: '#e07b39', name: 'Orange' },
  { hex: '#4cc9f0', name: 'Cyan'   },
  { hex: '#c77dff', name: 'Violet' },
  { hex: '#80ffdb', name: 'Mint'   },
  { hex: '#f72585', name: 'Pink'   },
  { hex: '#b5e48c', name: 'Lime'   },
];

export function pickNodeEntry(existingCount: number): { hex: string; name: string } {
  return NODE_PALETTE[existingCount % NODE_PALETTE.length];
}
