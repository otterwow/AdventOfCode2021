import * as R from "ramda";
import Solver from "../../solver_interface";

export default class Day9Solver extends Solver {
  width: number;
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    this.width = data[0].length + 2;
    return R.flatten([
      R.repeat(9, this.width),
      ...R.map((x) => [9, ...R.map((y) => parseInt(y), [...x]), 9], data),
      R.repeat(9, this.width),
    ]);
  }

  neighbors = (i: number): number[] => [
    i - this.width,
    i + 1,
    i + this.width,
    i - 1,
  ];

  get_low_points = () =>
    R.filter(
      ([x, i]) =>
        R.all(
          (y: number) => x < y,
          R.map((z) => this.data[z], this.neighbors(i))
        ),
      R.zip(this.data, R.range(0, this.data.length))
    );

  part_1() {
    return R.reduce(
      (acc, x: number) => acc + x + 1,
      0,
      R.pluck(0, this.get_low_points())
    );
  }

  part_2() {
    const basins = R.map(([x, i]) => {
      const visited: Set<number> = new Set();
      let queue: number[] = [i];
      while (!R.isEmpty(queue)) {
        const current_index = queue.pop()!;
        if (visited.has(current_index) || this.data[current_index] == 9)
          continue;
        visited.add(current_index);
        queue = R.concat(queue, this.neighbors(current_index));
      }
      return visited.size;
    }, this.get_low_points());

    return R.reduce(
      (acc, x) => acc * x,
      1,
      R.slice(
        0,
        3,
        R.sort((x, y) => y - x, basins)
      )
    );
  }
}
