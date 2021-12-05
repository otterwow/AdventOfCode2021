import Day5Solver from "./solver";
import { read_data } from "../../solver_manager";

test("Part 1 correct for sample data", () => {
  const data = read_data(5, true);
  expect(new Day5Solver(data).part_1()).toBe(5);
});

test("Part 2 correct for sample data", () => {
  const data = read_data(5, true);
  expect(new Day5Solver(data).part_2()).toBe(12);
});
