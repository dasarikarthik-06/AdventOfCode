const INPUT = 1;

const parseOpcode = (code) => {
  code = code.toString();
  const opcode = code.slice(code.length - 2);
  const parameterModes = Array.from({ length: 3 }, () => 0);
  let i = 0;
  for (let index = code.length - 3; index >= 0; index--) {
    parameterModes[i] = parseInt(code[index]);
    i++;
  }
  return [opcode, parameterModes];
};

const add = (x, y) => parseInt(x) + parseInt(y);
const multiply = (x, y) => x * y;
const takeInput = () => INPUT;
const display = (x) => {
  console.log(x);
  return x;
};

const functionMap = {
  1: { inc: 4, operation: add },
  2: { inc: 4, operation: multiply },
  3: { inc: 2, operation: takeInput },
  4: { inc: 2, operation: display },
};

const immediateMode = (cmd, index, inc) => cmd[index + inc];
const positionMode = (cmd, index, inc) => cmd[cmd[index + inc]];

const parameterModesMap = {
  1: immediateMode,
  0: positionMode,
};

const executeOneSet = (cmd, opcode, index, parameterModes) => {
  const operation = functionMap[parseInt(opcode)]["operation"];
  const firstParameterMode = parameterModesMap[parameterModes[0]];
  const secondParameterMode = parameterModesMap[parameterModes[1]];
  const value = operation(
    firstParameterMode(cmd, index, 1),
    secondParameterMode(cmd, index, 2),
  );

  cmd[cmd[index + functionMap[parseInt(opcode)]["inc"] - 1]] = value;
  return 0;
};

const executeEdicts = (cmdStr) => {
  const cmds = cmdStr.split(",");
  let index = 0;

  while (cmds[index] !== "99" && index < cmds.length - 1) {
    const [opcode, parameterModes] = parseOpcode(cmds[index]);
    executeOneSet(cmds, opcode, index, parameterModes);
    index = index + functionMap[parseInt(opcode)]["inc"];
  }

  return cmds;
};

console.clear();
const input = Deno.readTextFileSync("sprintExt/input.txt");
console.log(executeEdicts(input));
// console.log(executeEdicts("1002,4,3,4,33"));
// console.log(executeEdicts("1101,100,-1,4,0"));
// console.log(executeEdicts("3,0,4,0,99"));
