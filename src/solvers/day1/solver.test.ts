import Day1Solver from "./solver";
import { read_data } from "../../solver_manager";

test("Part 1 correct for sample data", () => {
  const data = read_data(1, true);
  expect(new Day1Solver(data).part_1()).toBe(7);
});

test("Part 2 correct for sample data", () => {
  const data = read_data(1, true);
  expect(new Day1Solver(data).part_2()).toBe(5);
});
