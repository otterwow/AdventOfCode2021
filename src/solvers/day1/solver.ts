import Solver from "../../solver_interface";

export default class Day1Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }
  prepare_data(data: string[]): any[] {
    return data.map((x) => parseInt(x));
  }

  part_1() {
    return this.solve(1);
  }

  part_2() {
    return this.solve(3);
  }

  solve(window_size: number) {
    console.log(this.data);
    const increases = (xs: number[]): number =>
      xs.slice(1).filter((x, i) => x > xs[i]).length;

    const sum_array = (xs: number[]): number => xs.reduce((s, x) => s + x);

    return increases(
      this.data.map((_, i) => sum_array(this.data.slice(i, i + window_size)))
    );
  }
}
