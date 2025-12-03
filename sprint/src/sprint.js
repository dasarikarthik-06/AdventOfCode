const add = (x, y) => parseInt(x) + parseInt(y);

const multiply = (x, y) => parseInt(x) * parseInt(y);

const functionMap = {
  1: add,
  2: multiply,
};

const executeOneSet = (cmd, index) => {
  const operation = functionMap[cmd[index]];
  const value = operation(cmd[cmd[index + 1]], cmd[cmd[index + 2]]);
  cmd[cmd[index + 3]] = value;
  return 0
};

export const executeEdicts = (cmdStr) => {
  const cmds = cmdStr.split(",");
  cmds[1] = 12;
  cmds[2] = 2;
  let index = 0;
  
  while (cmds[index] !== "99" && index < cmds.length - 1) {
    executeOneSet(cmds, index);
    index = index + 4;
  }

  return cmds[0];
};
