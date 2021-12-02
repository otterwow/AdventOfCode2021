import * as fs from "fs";
import * as path from "path";

export function exec(part: number, data_path: string = "") {
  let window_size = 1;
  if (part == 1) window_size = 3;

  if (!data_path) data_path = path.join(__dirname, "data.txt");
  const input = fs
    .readFileSync(data_path)
    .toString()
    .split("\n")
    .map((x) => parseInt(x));

  const increases = (xs: number[]): number =>
    xs.slice(1).filter((x, i) => x > xs[i]).length;

  const sum_array = (xs: number[]): number => xs.reduce((s, x) => s + x);

  return increases(
    input.map((_, i) => sum_array(input.slice(i, i + window_size)))
  );
}
