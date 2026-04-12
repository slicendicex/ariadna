import type { NodeData } from '../types/node';
import { MAX_NODE_TITLE_LENGTH } from '../constants/node';

interface NodeCardProps {
  node: NodeData | null;
  onUpdateNode: (id: string, updates: Partial<NodeData>) => void;
  isLinking: boolean;
  onStartLink: () => void;
  onCancelLink: () => void;
}

// Fixed DOM overlay panel showing info about the selected node
export default function NodeCard({ node, onUpdateNode, isLinking, onStartLink, onCancelLink }: NodeCardProps) {
  if (!node) return null;

  return (
    <div 
      onPointerDown={(e) => e.stopPropagation()}
      style={{
      position: 'absolute',
      top: '16px',
      right: '16px',
      backgroundColor: 'rgba(20, 20, 20, 0.85)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: '12px 16px',
      color: '#eee',
      fontFamily: 'inherit',
      minWidth: '220px',
      pointerEvents: 'auto',
      boxSizing: 'border-box'
    }}>
      <div style={{ fontSize: '11px', opacity: 0.5, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Node
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '4px' }}>
          <span style={{ opacity: 0.5, fontSize: '13px' }}>Title</span>
          <input 
            value={node.title} 
            onChange={(e) => onUpdateNode(node.id, { title: e.target.value })}
            onBlur={() => {
              const trimmed = node.title.trim();
              onUpdateNode(node.id, { title: trimmed ? trimmed : 'Untitled' });
            }}
            maxLength={MAX_NODE_TITLE_LENGTH}
            style={{
               background: 'rgba(255,255,255,0.07)',
               border: '1px solid rgba(255,255,255,0.12)',
               borderRadius: '4px',
               padding: '6px 8px',
               color: '#eee',
               fontSize: '13px',
               outline: 'none',
               fontFamily: 'inherit',
               width: '100%',
               boxSizing: 'border-box'
            }}
          />
        </div>
        <Row label="ID" value={node.id.slice(0, 8)} />
        <Row label="Color" value={node.colorName} accent={node.color} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
          <span style={{ opacity: 0.5, fontSize: '13px' }}>Content</span>
          <textarea
            value={node.content}
            onChange={(e) => onUpdateNode(node.id, { content: e.target.value })}
            placeholder="Type your notes here..."
            style={{
               background: 'rgba(255,255,255,0.07)',
               border: '1px solid rgba(255,255,255,0.12)',
               borderRadius: '4px',
               padding: '8px',
               color: '#eee',
               fontSize: '13px',
               outline: 'none',
               fontFamily: 'inherit',
               width: '100%',
               minHeight: '80px',
               resize: 'vertical',
               boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={isLinking ? onCancelLink : onStartLink}
          style={{
            marginTop: '8px',
            background: isLinking ? 'rgba(247, 37, 133, 0.2)' : 'rgba(76, 201, 240, 0.2)',
            border: `1px solid ${isLinking ? 'rgba(247, 37, 133, 0.5)' : 'rgba(76, 201, 240, 0.5)'}`,
            borderRadius: '4px',
            padding: '6px 12px',
            color: '#eee',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.15s',
            width: '100%'
          }}
        >
          {isLinking ? 'Cancel Link' : 'Start Link'}
        </button>
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
