import Day4Solver from "./solver";
import { read_data } from "../../solver_manager";

test("Part 1 correct for sample data", () => {
  const data = read_data(4, true);
  expect(new Day4Solver(data).part_1()).toBe(-1);
});

// test("Part 2 correct for sample data", () => {
//   const data = read_data(4, true);
//   expect(new Day4Solver(data).part_2()).toBe(-1);
// });
