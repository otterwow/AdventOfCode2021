import * as R from "ramda";
import Solver from "../../solver_interface";

const bracket_scores = new Map([
  ["(", 1],
  [")", 3],
  ["[", 2],
  ["]", 57],
  ["{", 3],
  ["}", 1197],
  ["<", 4],
  [">", 25137],
]);

const [opening_brackets, closing_brackets] = R.addIndex(R.partition)(
  (x, i) => i % 2 == 0,
  [...bracket_scores.keys()]
);

const bracket_pairs = new Map(R.zip(opening_brackets, closing_brackets));

export default class Day10Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }

  part_1() {
    return R.sum(
      this.solve()
        .filter((stack) => R.contains(R.last(stack), closing_brackets))
        .map((stack) => bracket_scores.get(R.last(stack)!)!)
    );
  }

  part_2() {
    return R.median(
      this.solve()
        .filter((stack) => R.contains(R.last(stack), opening_brackets))
        .map((stack: string[]) =>
          R.reduceRight(
            (bracket, acc) => acc * 5 + bracket_scores.get(bracket)!,
            0,
            stack
          )
        )
    );
  }

  solve() {
    return R.map(
      (line) =>
        R.reduceWhile(
          (acc, _) =>
            R.isEmpty(acc) || R.contains(R.last(acc), opening_brackets),
          (acc: string[], bracket: string) => {
            if (bracket_pairs.get(R.last(acc)!) === bracket)
              return R.slice(0, -1, acc);
            return R.append(bracket, acc);
          },
          [],
          line
        ),
      this.data
    );
  }
}
