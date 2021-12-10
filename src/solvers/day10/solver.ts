import { contains, last, median, reverse, sum } from "ramda";
import Solver from "../../solver_interface";

const opening_brackets = ["(", "[", "{", "<"];
const closing_brackets = [")", "]", "}", ">"];

const bracket_pairs = new Map([
  [")", "("],
  ["]", "["],
  ["}", "{"],
  [">", "<"],
]);

const bracket_scores = new Map([
  ["(", 1],
  ["[", 2],
  ["{", 3],
  ["<", 4],
  [")", 3],
  ["]", 57],
  ["}", 1197],
  [">", 25137],
]);

export default class Day10Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    return data.map((x) => x.split(""));
  }

  part_1() {
    return sum(
      this.solve()
        .filter((memory) => contains(last(memory), closing_brackets))
        .map((memory) => bracket_scores.get(last(memory)!)!)
    );
  }

  part_2() {
    return median(
      this.solve()
        .filter((memory) => contains(last(memory), opening_brackets))
        .map((memory: string[]) =>
          reverse(memory).reduce(
            (acc: number, bracket: string) =>
              acc * 5 + bracket_scores.get(bracket)!,
            0
          )
        )
    );
  }

  solve(): string[][] {
    return this.data.map((line) =>
      line.reduce(
        (stack: string[], bracket: string, _: number, arr: string[]) => {
          if (contains(bracket, opening_brackets)) return [...stack, bracket];
          if (bracket_pairs.get(bracket) != stack.pop()) {
            arr.splice(1);
            return [bracket];
          }
          return stack;
        },
        []
      )
    );
  }
}
