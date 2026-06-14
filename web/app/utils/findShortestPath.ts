import { points, connections } from "../components/map";

// O formato do resultado final da rota
export interface RouteResult {
  path: number[];
  totalDistance: number;
}

// Representação interna do grafo para busca rápida
interface Graph {
  [key: number]: { [key: number]: number };
}

export function findShortestPath(
  start: number,
  end: number
): RouteResult | null {
  
  // 1. Construir o grafo direcionado/não-direcionado
  const graph: Graph = {};
  points.forEach(point => graph[point.id] = {});
  
  connections.forEach(({ id1, id2, distance }) => {
    if (graph[id1]) graph[id1][id2] = distance;
    if (graph[id2]) graph[id2][id1] = distance; 
  });

  // 2. Inicializar tabelas de controle
  const distances: { [key: number]: number } = {};
  const previous: { [key: number]: number | null } = {};
  const unvisited = new Set<number>();

  points.forEach(point => {
    distances[point.id] = Infinity;
    previous[point.id] = null;
    unvisited.add(point.id);
  });

  distances[start] = 0;

  // 3. Loop principal do algoritmo
  while (unvisited.size > 0) {
    // Encontra o nó não visitado com a menor distância atual
    let current: number | null = null;
    for (const point of unvisited) {
      if (current === null || distances[point] < distances[current]) {
        current = point;
      }
    }

    // Se a menor distância for Infinity, os nós restantes são inacessíveis
    if (current === null || distances[current] === Infinity) break;

    // Se chegamos ao destino, podemos parar a busca
    if (current === end) break;

    unvisited.delete(current);

    // Atualiza a distância dos vizinhos do nó atual
    const neighbors = graph[current];
    for (const neighborString in neighbors) {
      const neighbor = parseInt(neighborString)
      if (unvisited.has(neighbor)) {
        const alt = distances[current] + neighbors[neighbor];
        console.log(alt, distances[neighbor])
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = current;
        }
      }
    }
  }

  // 4. Reconstruir o caminho de volta (do fim para o início)
  if (distances[end] === Infinity) {
    return null; // Não há rota possível
  }

  const path: number[] = [];
  let currentPoint: number | null = end;

  while (currentPoint !== null) {
    path.unshift(currentPoint);
    currentPoint = previous[currentPoint];
  }

  return {
    path,
    totalDistance: distances[end]
  };
}