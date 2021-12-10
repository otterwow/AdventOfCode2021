import { contains, last, median, reverse, sum, slice } from "ramda";
import Solver from "../../solver_interface";

const opening_brackets = ["(", "[", "{", "<"];
const closing_brackets = [")", "]", "}", ">"];

const bracket_pairs = new Map();
bracket_pairs.set(")", "(");
bracket_pairs.set("]", "[");
bracket_pairs.set("}", "{");
bracket_pairs.set(">", "<");

const bracket_scores = new Map();
bracket_scores.set("(", 1);
bracket_scores.set("[", 2);
bracket_scores.set("{", 3);
bracket_scores.set("<", 4);
bracket_scores.set(")", 3);
bracket_scores.set("]", 57);
bracket_scores.set("}", 1197);
bracket_scores.set(">", 25137);

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
        .map((memory) => bracket_scores.get(last(memory)))
    );
  }

  part_2() {
    return median(
      this.solve()
        .filter((memory) => contains(last(memory), opening_brackets))
        .map((memory: string[]) =>
          reverse(memory).reduce(
            (acc: number, bracket: string) =>
              acc * 5 + bracket_scores.get(bracket),
            0
          )
        )
    );
  }

  solve() {
    return this.data.map((line) =>
      line.reduce(
        (acc: string[], bracket: string, _: number, arr: string[]) => {
          if (contains(bracket, opening_brackets)) return [...acc, bracket];
          else if (bracket_pairs.get(bracket) == last(acc))
            return slice(0, -1, acc);
          else {
            arr.splice(1);
            return [...acc, bracket];
          }
        },
        []
      )
    );
  }
}
