import { promisify } from "util";
import Solver from "./solver_interface";
import { render } from "ejs";
import { readFileSync, writeFileSync, mkdir, existsSync } from "fs";
import "got";
import got from "got";
const { CookieJar } = require("tough-cookie");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assert_day(day: number) {
  assert(day > 0 && day < 26, "Day is outside of AoC range");
  assert(
    new Date(`2021-12-${day}`) <= new Date(),
    `The puzzle for day ${day} is not yet available`
  );
}

export function read_data(
  day: number,
  use_sample_data: boolean = false
): string[] {
  let data_file = use_sample_data ? "sample_data.txt" : "data.txt";
  let data_path = `data/day${day}/${data_file}`;
  // split the data into seperate lines and remove unwanted characters
  return readFileSync(data_path)
    .toString()
    .split("\n")
    .map((x, _) => x.trim())
    .map((x, _) => x.replace(/(\r\n|\n|\r)/gm, ""))
    .filter((x) => Boolean(x));
}

function mkdir_if_not_exists(dir: string) {
  if (!existsSync(dir)) {
    mkdir(dir, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Generated directory ${dir}`);
    });
  }
}

export async function setup(day: number) {
  console.log(`Setup for day ${day}`);
  assert_day(day);

  console.log(`Generating project structure`);
  // Create a folder in src for the typescript files
  const solver_dir = `./src/solvers/day${day}`;
  mkdir_if_not_exists(solver_dir);

  // Render the typescript files
  const render_file = (template_name: string, day: number) => {
    const template_file = readFileSync(
      `./templates/${template_name}.ejs`
    ).toString();
    return render(template_file, { day });
  };

  const solver_file = render_file("solver", day);
  const test_file = render_file("solver.test", day);

  // Write the typescript files to the new folder in src

  if (!existsSync(`${solver_dir}/solver.ts`))
    writeFileSync(`${solver_dir}/solver.ts`, solver_file);
  if (!existsSync(`${solver_dir}/solver.test.ts`))
    writeFileSync(`${solver_dir}/solver.test.ts`, test_file);

  // Download the data
  console.log(`Downloading data`);
  const link = `https://adventofcode.com/2021/day/${day}/input`;
  const cookieJar = new CookieJar();
  cookieJar.setCookie(
    "session=53616c7465645f5fe0d0ce12d1781efd3f12ac1291d9a15784cb511eb07657efed343ca7b955b27ecb433a7af9620fb6",
    link
  );
  const { body } = await got.get(link, { cookieJar });

  // Create a folder in data for the input files
  const data_root_dir = "./data";
  const data_dir = `${data_root_dir}/day${day}`;
  mkdir_if_not_exists(data_root_dir);
  mkdir_if_not_exists(data_dir);

  // Write the input file to the new folder in data
  writeFileSync(`${data_dir}/data.txt`, body);
  writeFileSync(`${data_dir}/sample_data.txt`, "");
}

export async function solve(day: number, part: number) {
  console.log(`Solving for day ${day} part ${part}`);
  assert_day(day);
  assert(part === 1 || part === 2, "Part must be either 1 or 2");

  let data = read_data(day);

  const Dynamic_Solver = await import(`./solvers/day${day}/solver`);
  const solver: Solver = new Dynamic_Solver.default(data);

  return part == 1 ? solver.part_1() : solver.part_2();
}
