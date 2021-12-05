import Solver from "../../solver_interface";

export default class Day5Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    return data.map((x) =>
      [...x.matchAll(/(\d+)/g)].map((x) => parseInt(x[0]))
    );
  }

  part_1() {
    return this.solve(true);
  }

  part_2() {
    return this.solve(false);
  }

  solve(skip_diagonal: Boolean) {
    let grid: Map<string, number> = new Map();
    for (const line of this.data) {
      const [x0, y0, x1, y1] = line;
      if (skip_diagonal && x0 != x1 && y0 != y1) continue;
      let points = this.get_points(...line);
      for (const point of points.map((x) => String(x))) {
        grid.set(point, (grid.get(point) || 0) + 1);
      }
    }
    return [...grid.values()].filter((x) => x > 1).length;
  }

  get_points(
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): [number, number][] {
    const points: [number, number][] = [];
    let x = x0,
      y = y0;
    points.push([x, y]);
    while (x != x1 || y != y1) {
      if (x != x1) x += Number(x < x1) * 2 - 1;
      if (y != y1) y += Number(y < y1) * 2 - 1;
      points.push([x, y]);
    }
    return points;
  }
}
