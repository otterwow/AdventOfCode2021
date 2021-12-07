import Solver from "../../solver_interface";

export default class Day7Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    return data[0].split(",").map((x) => parseInt(x));
  }

  part_1() {
    return this.solve((x: number, y: number) => Math.abs(x - y));
  }

  part_2() {
    return this.solve(
      (x: number, y: number) => (Math.abs(x - y) * (Math.abs(x - y) + 1)) / 2
    );
  }

  solve(distance_func: any) {
    let optimal_fuel_cost = Number.MAX_VALUE;
    for (let i = Math.min(...this.data); i < Math.max(...this.data); i++) {
      optimal_fuel_cost = Math.min(
        optimal_fuel_cost,
        this.data.reduce((acc, x) => acc + distance_func(x, i), 0)
      );
    }
    return optimal_fuel_cost;
  }
}
