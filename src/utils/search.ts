import PriorityQueue from "js-priority-queue";

// we have dfs/bfs finding one route
// now we need them to find all routes

// how to handle Nodes of type [any, any, ...]

interface Mappable {}

export interface Graph<Node> {
  // get neighbors and their distance
  get(node: Node): [Node, number][] | undefined;
  add(source: Node, target: Node, distance: number): void;
  remove(source: Node, target: Node): number;
}

class RegularGraph<Node> implements Graph<Node> {
  edges: Map<Node, [Node, number][]> = new Map();
  get(node: Node): [Node, number][] | undefined {
    return this.edges.get(node);
  }
  add(source: Node, target: Node, distance: number = 1): void {
    if (!this.edges.has(source)) this.edges.set(source, []);
    this.edges.get(source)!.push([target, distance]);
  }
  remove(source: Node, target: Node): number {
    return 0;
  }
}

interface Queue<Node extends Mappable> {
  pop(): Node | undefined;
  push(node: Node): number;
  empty(): boolean;
}

class LiFoQueue<Node> implements Queue<Node> {
  // for DFS
  internal_queue = [];
  pop(): Node | undefined {
    return this.internal_queue.pop();
  }
  push(node: Node): number {
    return this.internal_queue.push(node);
  }
  empty(): boolean {
    return this.internal_queue.length == 0;
  }
}

class FiFoQueue<Node> implements Queue<Node> {
  // for BFS
  internal_queue = [];
  pop(): Node | undefined {
    return this.internal_queue.pop();
  }
  push(node: Node): number {
    this.internal_queue.splice(0, 0, node);
    return this.internal_queue.length;
  }
  empty(): boolean {
    return this.internal_queue.length == 0;
  }
}

class PrioQueue<Node> implements Queue<Node> {
  internal_queue: PriorityQueue<Node>;
  constructor(heuristic: (node: Node) => number) {
    this.internal_queue = new PriorityQueue({
      comparator: (node_a: Node, node_b: Node) =>
        heuristic(node_b) - heuristic(node_a),
    });
  }
  pop(): Node | undefined {
    return this.internal_queue.dequeue();
  }
  push(node: Node): number {
    this.internal_queue.queue(node);
    return this.internal_queue.length;
  }
  empty(): boolean {
    return this.internal_queue.length == 0;
  }
}

export function graph_from_tuples<Node>(
  edges: [Node, Node][] | [Node, Node, number][],
  bidirectional: boolean = true
): Graph<Node> {
  const graph = new RegularGraph<Node>();
  for (const edge of edges) {
    graph.add(...edge);
    if (bidirectional) graph.add(edge[1], edge[0], edge[2]);
  }
  return graph;
}

export function graph_from_grid(
  grid: Node[],
  width: number,
  height: number,
  get_distance: (node_a: number, node_b: number) => number = (node_a, node_b) =>
    1,
  diagonal: boolean = false
): Graph<number> {
  const edges = grid
    .map((_, i) => {
      const x = i % width;
      const y = (i / width) >> 0;
      let neighbors: [number, number][];
      if (diagonal) {
        neighbors = [
          [x - 1, y - 1],
          [x, y - 1],
          [x + 1, y - 1],
          [x - 1, y],
          [x + 1, y],
          [x - 1, y + 1],
          [x, y + 1],
          [x + 1, y + 1],
        ];
      } else {
        neighbors = [
          [x, y - 1],
          [x + 1, y],
          [x, y + 1],
          [x - 1, y],
        ];
      }

      // remove illegal positions and map back to single dimension
      const flat_neighbors = neighbors
        .filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < width && ny < height)
        .map(([nx, ny]) => nx + ny * width);

      return flat_neighbors.map((n) => [i, n, get_distance(i, n)]);
    })
    .flat();

  return graph_from_tuples(edges, false);
}

// export function graph_from_map<Node>(edges: Map<Node, Node[]>): Graph<Node> {}

function _search<Node extends Mappable>(
  graph: Graph<Node>,
  source: Node,
  target: Node,
  queue: Queue<Node>
): [Node, number][] {
  const parent: Map<Node, [Node, number]> = new Map();
  parent.set(source, [source, 0]);
  queue.push(source);

  while (!queue.empty()) {
    let node = queue.pop()!;

    if (node == target) {
      const path: [Node, number][] = [];
      while (true) {
        const p = parent.get(node)!;
        path.push([node, p[1]]);
        if (node == source) return path.reverse();
        node = p[0]!;
      }
    }

    for (const [neighbor, edge] of graph.get(node) || []) {
      const distance_estimate = parent.get(node)![1] + edge;
      if (distance_estimate < (parent.get(neighbor) || [null, Infinity])[1]) {
        parent.set(neighbor, [node, distance_estimate]);
        queue.push(neighbor);
      }
    }
  }
  return [];
}

export function dfs<Node extends Mappable>(
  graph: Graph<Node>,
  source: Node,
  target: Node
) {
  return _search(graph, source, target, new LiFoQueue<Node>());
}

export function bfs<Node extends Mappable>(
  graph: Graph<Node>,
  source: Node,
  target: Node
) {
  return _search(graph, source, target, new FiFoQueue<Node>());
}

export function astar<Node extends Mappable>(
  graph: Graph<Node>,
  source: Node,
  target: Node,
  heuristic: (node: Node) => number
) {
  return _search(graph, source, target, new PrioQueue<Node>(heuristic));
}
