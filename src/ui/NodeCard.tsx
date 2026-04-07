import type { NodeData } from '../types/node';

interface NodeCardProps {
  node: NodeData | null;
}

// Fixed DOM overlay panel showing info about the selected node
export default function NodeCard({ node }: NodeCardProps) {
  if (!node) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '16px',
      right: '16px',
      backgroundColor: 'rgba(20, 20, 20, 0.85)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: '12px 16px',
      color: '#eee',
      fontFamily: 'inherit',
      minWidth: '160px',
      pointerEvents: 'none',
    }}>
      <div style={{ fontSize: '11px', opacity: 0.5, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Node
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Row label="Title" value={node.title} />
        <Row label="ID" value={node.id.slice(0, 8)} />
        <Row label="Color" value={node.colorName} accent={node.color} />
      </div>
    </div>
  );
}

// Small helper: one label-value row
function Row({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '13px' }}>
      <span style={{ opacity: 0.5 }}>{label}</span>
      <span style={{ color: accent ?? 'inherit', fontWeight: 500 }}>{value}</span>
    </div>
  );
}
