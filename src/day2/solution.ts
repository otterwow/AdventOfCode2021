import * as fs from "fs";
import * as path from "path";

export function part0(data_path: string = "") {
  let { hor, aim } = solve(read_input(data_path));
  return hor * aim;
}
export function part1(data_path: string = "") {
  let { hor, ver } = solve(read_input(data_path));
  return hor * ver;
}

function read_input(data_path: string = "") {
  if (!data_path) data_path = path.join(__dirname, "data.txt");
  const input: [string, number][] = fs
    .readFileSync(data_path)
    .toString()
    .split("\n")
    .map((x, _) => x.split(" "))
    .map((x, _) => [x[0], parseInt(x[1])]);
  return input;
}

function solve(input: [string, number][]) {
  let hor = 0;
  let ver = 0;
  let aim = 0;

  for (let line of input) {
    let [direction, length] = line;
    switch (direction) {
      case "forward":
        hor += length;
        ver += aim * length;
        break;
      case "up":
        aim -= length;
        break;
      case "down":
        aim += length;
        break;
    }
  }

  return { hor, ver, aim };
}
