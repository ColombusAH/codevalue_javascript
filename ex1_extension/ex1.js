const utils = require("./utils");

const iterattions = 100;

for (let i = 0; i < iterattions; i++) {
  const to_print = utils.checker(i);
  utils.printer(to_print);
}
