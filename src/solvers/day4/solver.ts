import Solver from "../../solver_interface";

class Board {
  // 0..4: horizontal rows
  // 5..9: vertical rows
  sequences: Set<number>[];

  constructor(data: number[]) {
    this.sequences = Array.from({ length: 10 }, (_) => new Set());
    for (let y = 0; y < 5; y++)
      for (let x = 0; x < 5; x++) {
        const data_point = data[y * 5 + x];
        this.sequences[y].add(data_point);
        this.sequences[x + 5].add(data_point);
      }
  }

  hit(num: number) {
    for (let sequence of this.sequences)
      if (sequence.has(num)) {
        sequence.delete(num);
        if (sequence.size == 0) return this;
      }
  }

  score() {
    return this.sequences
      .slice(0, 5)
      .map((x) => Array.from(x))
      .flat()
      .reduce((acc, x) => acc + x);
  }
}

export default class Day4Solver extends Solver {
  constructor(data: string[]) {
    super(data);
  }

  prepare_data(data: string[]): any[] {
    const draw: any[][] = [data[0].split(",").map((x) => parseInt(x))];
    let flat_data = data
      .splice(1)
      .map((x) => x.split(/\s+/).map((y) => parseInt(y)))
      .flat();

    return draw.concat(
      Array.from(new Array(flat_data.length / 25), (_, i) =>
        flat_data.slice(i * 25, i * 25 + 25)
      ).map((x) => new Board(x))
    );
  }

  part_1() {
    return this.solve(this.data.length - 1);
  }

  part_2() {
    return this.solve(1);
  }

  solve(boards_left_end_condition: number) {
    const draws: number[] = this.data[0];
    let boards: Board[] = this.data.slice(1);

    for (let draw of draws) {
      const winning_boards: Board[] = [];
      for (let board of boards) {
        if (board.hit(draw)) {
          if (boards.length == boards_left_end_condition)
            return board.score() * draw;
          winning_boards.push(board);
        }
      }
      boards = boards.filter((x) => winning_boards.indexOf(x) == -1);
    }
  }
}
