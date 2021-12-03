import Day2Solver from "./solver";
import { read_data } from "../../solver_manager";

test("Part 1 correct for sample data", () => {
  const data = read_data(2, true);
  expect(new Day2Solver(data).part_1()).toBe(150);
});

test("Part 2 correct for sample data", () => {
  const data = read_data(2, true);
  expect(new Day2Solver(data).part_2()).toBe(900);
});
