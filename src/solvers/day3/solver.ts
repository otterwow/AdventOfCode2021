import Solver from "../../solver_interface";

export default class Day3Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }
  prepare_data(data: string[]): any[] {
    return data.map((x) => [...x].map((y) => parseInt(y)));
  }

  part_1() {
    const bits = this.majority_bits(this.data);
    const gamma = this.bits_to_number(bits);
    const epsilon = ~gamma & ((1 << this.data[0].length) - 1);
    return gamma * epsilon;
  }

  part_2() {
    const oxygen = this.reduce_by_majority_bits(
      this.data,
      (x: number, y: number) => x == y
    );
    const co2 = this.reduce_by_majority_bits(
      this.data,
      (x: number, y: number) => x != y
    );
    return this.bits_to_number(oxygen) * this.bits_to_number(co2);
  }

  reduce_by_majority_bits(data: number[][], comparison_op: any) {
    for (let i = 0; i < data[0].length; i++) {
      const bits = this.majority_bits(data);
      data = data.filter((x) => comparison_op(x[i], bits[i]));
      if (data.length == 1) break;
    }
    return data[0];
  }

  majority_bits(data: number[][]) {
    let majority: number[] = new Array(data[0].length).fill(0);
    for (const bits of data) {
      for (const i in bits) {
        majority[i] += bits[i];
      }
    }
    return majority.map((x) => Number(x / data.length >= 0.5));
  }

  bits_to_number(bits: number[]) {
    return bits.reduce((acc, x) => (acc << 1) | x);
  }
}
