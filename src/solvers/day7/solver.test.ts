import Day7Solver from "./solver";
import { read_data } from "../../solver_manager";

test("Part 1 correct for sample data", () => {
  const data = read_data(7, true);
  expect(new Day7Solver(data).part_1()).toBe(-1);
});

// test("Part 2 correct for sample data", () => {
//   const data = read_data(7, true);
//   expect(new Day7Solver(data).part_2()).toBe(-1);
// });
