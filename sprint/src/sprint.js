const add = (x, y) => parseInt(x) + parseInt(y);

const multiply = (x, y) => parseInt(x) * parseInt(y);

const functionMap = {
  1: add,
  2: multiply,
};

const executeOneSet = (cmd, index) => {
  const operation = functionMap[cmd[index]];
  console.log(operation);
  const value = operation(cmd[cmd[index + 1]], cmd[cmd[index + 2]]);
  cmd[cmd[index + 3]] = value;
  return 0;
};

const executeEdicts = (cmds) => {
  let index = 0;

  while (cmds[index] !== "99" && index < cmds.length - 1) {
    executeOneSet(cmds, index);
    index = index + 4;
  }

  return cmds[0];
};

const executor = (input) => {
  const originalcmds = input.split(",");
  let dummy = [...originalcmds];
  let result;
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      dummy[1] = noun;
      dummy[2] = verb;
      result = executeEdicts(dummy);
      if (result === 19690720) {
        return 100 * noun + verb;
      }
      dummy = [...originalcmds];
    }
  }
};
