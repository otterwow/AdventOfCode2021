import * as R from "ramda";
import Solver from "../../solver_interface";

export default class Day8Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    return R.map(
      (line) =>
        R.splitAt(
          10,
          R.map(
            (digit_matches) => [...digit_matches[0]].sort(),
            [...line.matchAll(/(\w+)/g)]
          )
        ),
      data
    );
  }

  part_1() {
    return R.reduce(
      (acc, [_, display_output]) => {
        const special_digits = R.filter(
          (digit) => R.contains(digit, [2, 3, 4, 7]),
          R.map((digit) => digit.length, display_output)
        );
        return acc + special_digits.length;
      },
      0,
      this.data
    );
  }

  part_2() {
    const digit_index = (
      other_digit: string[],
      intersection_size: number,
      signals: string[][]
    ) => {
      return signals.findIndex((digit) => {
        return (
          R.intersection(other_digit, [...digit]).length == intersection_size
        );
      });
    };

    return R.reduce(
      (solution, [signals, display_output]: [string[][], string[][]]) => {
        signals = R.sort((x, y) => x.length - y.length, signals);
        const digits: string[][] = new Array(10);
        digits[8] = signals.splice(9, 1)[0];
        digits[4] = signals.splice(2, 1)[0];
        digits[7] = signals.splice(1, 1)[0];
        digits[1] = signals.splice(0, 1)[0];
        digits[9] = signals.splice(digit_index(digits[4], 4, signals), 1)[0];
        digits[2] = signals.splice(digit_index(digits[4], 2, signals), 1)[0];
        digits[5] = signals.splice(digit_index(digits[2], 3, signals), 1)[0];
        digits[3] = signals.splice(digit_index(digits[8], 5, signals), 1)[0];
        digits[0] = signals.splice(digit_index(digits[1], 2, signals), 1)[0];
        digits[6] = signals[0];
        return (
          solution +
          R.reduce(
            (acc, output_digit) =>
              acc * 10 +
              digits.findIndex((digit) => R.equals(output_digit, digit)),
            0,
            display_output
          )
        );
      },
      0,
      this.data
    );
  }
}
