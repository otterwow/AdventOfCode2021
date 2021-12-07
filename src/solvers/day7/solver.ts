import Solver from "../../solver_interface";
import { mean, median, compose } from "ramda";

export default class Day7Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    return data[0].split(",").map((x) => parseInt(x));
  }

  part_1() {
    return this.solve((x: number, y: number) => Math.abs(x - y), median);
  }

  part_2() {
    const distance_func = (x: number, y: number) =>
      Math.abs(x - y) * (Math.abs(x - y) + 1);
    return (
      Math.min(
        this.solve(distance_func, compose(Math.ceil, mean)),
        this.solve(distance_func, compose(Math.floor, mean))
      ) / 2
    );
  }

  solve(distance_func: any, reduction_func: any) {
    const optimal_x = reduction_func(this.data);
    return this.data.reduce((acc, x) => acc + distance_func(x, optimal_x), 0);
  }
}
