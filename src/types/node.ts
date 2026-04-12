// Shared graph entity types — single source of truth for all layers

export interface NodeData {
  id: string;
  position: [number, number, number];
  color: string;
  colorName: string;
  title: string;
  content: string;
}

export interface EdgeData {
  id: string;
  fromId: string;
  toId: string;
}
