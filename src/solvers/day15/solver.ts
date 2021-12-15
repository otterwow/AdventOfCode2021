import Solver from "../../solver_interface";
import { astar, graph_from_grid } from "../../utils/search";
export default class Day15Solver extends Solver {
  size: number;
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    this.size = data[0].length;
    return data.map((x) => x.split("").map((y) => parseInt(y)));
  }

  part_1() {
    return this.solve();
  }
  part_2() {
    this.size *= 5;
    // make data wider
    this.data = this.data.map((xs) =>
      Array(5)
        .fill(xs)
        .map((xs, i) => xs.map((x) => ((x - 1 + i) % 9) + 1))
        .flat()
    );
    // make data taller
    this.data = Array(5)
      .fill(this.data.flat())
      .map((xs, i) => xs.map((x) => ((x - 1 + i) % 9) + 1));

    return this.solve();
  }

  solve() {
    this.data = this.data.flat();
    const graph = graph_from_grid(
      this.data,
      this.size,
      this.size,
      (_, node_b) => this.data[node_b],
      false
    );

    const heuristic = (node: number) => {
      const x = node % this.size;
      const y = (node / this.size) >> 0;
      return this.data.length - x - y;
    };

    const path = astar(graph, 0, this.data.length - 1, heuristic);

    return path.pop()![1];
  }
}
