import Day3Solver from "./solver";
import { read_data } from "../../solver_manager";

test("Part 1 correct for sample data", () => {
  const data = read_data(3, true);
  expect(new Day3Solver(data).part_1()).toBe(198);
});

test("Part 2 correct for sample data", () => {
  const data = read_data(3, true);
  expect(new Day3Solver(data).part_2()).toBe(230);
});
