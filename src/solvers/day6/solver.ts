import { sum, move } from "ramda";
import Solver from "../../solver_interface";

export default class Day6Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    return data[0].split(",").map((x) => parseInt(x));
  }

  part_1() {
    return this.solve(80);
  }

  part_2() {
    return this.solve(256);
  }

  solve(total_days: number) {
    let fish = new Array(9).fill(0);
    this.data.forEach((x) => fish[x]++);

    for (let _ = 0; _ < total_days; _++) {
      let next_fish = move(0, -1)(fish);
      next_fish[6] += fish[0];
      fish = next_fish;
    }

    return sum(fish);
  }
}
