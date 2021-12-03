import { solve, setup } from "./solver_manager";

(async () => {
  const action = process.argv[2].toLowerCase();
  const [day, part] = process.argv.slice(3).map((x) => parseInt(x));

  switch (action) {
    case "solve":
      console.log(await solve(day, part));
      break;
    case "setup":
      setup(day);
      break;
  }
})();
