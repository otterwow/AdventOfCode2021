export default abstract class Solver {
  data: any[];
  constructor(data: string[]) {
    this.data = this.prepare_data(data);
  }
  part_1(): any {}
  part_2(): any {}
  prepare_data(data: string[]): any[] {
    return data;
  }
}
