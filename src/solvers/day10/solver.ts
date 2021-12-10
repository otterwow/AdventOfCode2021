import {
  contains,
  last,
  median,
  slice,
  sum,
  reduceRight,
  reduceWhile,
  map,
  zip,
} from "ramda";
import Solver from "../../solver_interface";

const opening_brackets = ["(", "[", "{", "<"];
const closing_brackets = [")", "]", "}", ">"];
const bracket_pairs = new Map(zip(opening_brackets, closing_brackets));
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

  part_1() {
    return sum(
      this.solve()
        .filter((stack) => contains(last(stack), closing_brackets))
        .map((stack) => bracket_scores.get(last(stack)!)!)
    );
  }

  part_2() {
    return median(
      this.solve()
        .filter((stack) => contains(last(stack), opening_brackets))
        .map((stack: string[]) =>
          reduceRight(
            (bracket, acc) => acc * 5 + bracket_scores.get(bracket)!,
            0,
            stack
          )
        )
    );
  }

  solve() {
    return map(
      (line) =>
        reduceWhile(
          (acc, _) => contains(last(acc) || "(", opening_brackets),
          (acc: string[], bracket: string) => {
            if (bracket_pairs.get(last(acc)!) === bracket)
              return slice(0, -1, acc);
            return [...acc, bracket];
          },
          [],
          line
        ),
      this.data
    );
  }
}
