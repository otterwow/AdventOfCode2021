# aoc2021

Solutions for [Advent of Code 2021](https://adventofcode.com/2021) in Typescript

Logic for day i can be found in `./src/solvers/day${i}`

----

## NPM scripts
- `npm run setup -- ${day}`: download the input data and generate `.ts` solver files in the src folder
- `npm run solve -- ${day} ${part}`: run the solver for the given day and part
- `npm run solve_dev --${day} ${part}`: run the solver for a given day and part on every edit
- `npm test -- day{$day}`: run the tests for a given day
- `npm test -- day{$day} -- watch`: run the tests for a given day on every edit
