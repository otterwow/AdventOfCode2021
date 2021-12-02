import { part0, part1 } from "./solution";
import * as path from "path";

test("first example equal to 150", () => {
  const data_path = path.join(__dirname, "sample_data.txt");
  expect(part0(data_path) == 150);
});

test("second example equal to 900", () => {
  const data_path = path.join(__dirname, "sample_data.txt");
  expect(part1(data_path) == 900);
});
