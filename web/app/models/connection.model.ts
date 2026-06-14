export type Connection = {
  id1: number;
  id2: number;
  distance: number;
  lines: ConnectionLine[];
}

export type ConnectionLine = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}