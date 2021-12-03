import Solver from "../../solver_interface";

export default class Day2Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }
  prepare_data(data: string[]): any[] {
    return data.map((x) => x.split(" ")).map((x) => [x[0], parseInt(x[1])]);
  }

  part_1() {
    let { hor, aim } = this.solve();
    return hor * aim;
  }

  part_2() {
    let { hor, ver } = this.solve();
    return hor * ver;
  }

  solve() {
    let hor = 0;
    let ver = 0;
    let aim = 0;

    for (let line of this.data) {
      let [direction, length] = line;
      switch (direction) {
        case "forward":
          hor += length;
          ver += aim * length;
          break;
        case "up":
          aim -= length;
          break;
        case "down":
          aim += length;
          break;
      }
    }

    return { hor, ver, aim };
  }
}
