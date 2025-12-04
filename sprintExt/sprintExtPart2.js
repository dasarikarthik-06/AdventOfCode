const INPUT = 5;

const parseOpcode = (code) => {
  console.log("code", code);
  code = code.toString();
  const opcode = code.slice(code.length - 2);
  const parameterModes = Array.from({ length: 3 }, () => 0);
  let i = 0;
  for (let index = code.length - 3; index >= 0; index--) {
    console.log("parameters", code[index]);
    parameterModes[i] = parseInt(code[index]);
    i++;
  }
  return [opcode, parameterModes];
};

const add = (x, y) => parseInt(x) + parseInt(y);
const multiply = (x, y) => x * y;
const takeInput = () => INPUT;
const display = (x) => {
  console.log("display", x);
  return x;
};

const equals = (x, y) => {
  if (parseInt(x) === parseInt(y)) return 1;
  return 0;
};

const isLessThan = (x, y) => {
  if (parseInt(x) < parseInt(y)) return 1;
  return 0;
};

const jumpIfTrue = (x, y, index) => {
  if (parseInt(x) !== 0) {
    return parseInt(y);
  }
  return index + 3;
};
const jumpIfFalse = (x, y, index) => {
  console.log("x", x);
  if (parseInt(x) === 0) {
    console.log("here yyyyyy", y);
    return parseInt(y);
  }
  return index + 3;
};

const functionMap = {
  1: { inc: 4, operation: add },
  2: { inc: 4, operation: multiply },
  3: { inc: 2, operation: takeInput },
  4: { inc: 2, operation: display },
  5: { operation: jumpIfTrue },
  6: { operation: jumpIfFalse },
  7: { inc: 4, operation: isLessThan },
  8: { inc: 4, operation: equals },
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
};

const executeJump = (cmd, opcode, parameterModes, index) => {
  console.log("entered opcode", opcode);
  const operation = functionMap[parseInt(opcode)]["operation"];
  const firstParam = parameterModesMap[parameterModes[0]](cmd, index, 1);
  const secondParam = parameterModesMap[parameterModes[1]](cmd, index, 2);
  console.log("lds", firstParam, parameterModes);
  console.log("dj", secondParam, parameterModes);
  const inc = operation(firstParam, secondParam, index);
  return inc;
};

export const executeEdicts = (cmdStr) => {
  const cmds = cmdStr.split(",");
  let index = 0;

  while (cmds[index] !== "99" && index < cmds.length - 1) {
    console.log(cmds);
    const [opcode, parameterModes] = parseOpcode(cmds[index]);
    if (parseInt(opcode) === 5 || parseInt(opcode) == 6) {
      index = executeJump(cmds, opcode, parameterModes, index);
    } else {
      executeOneSet(cmds, opcode, index, parameterModes);
      index = index + functionMap[parseInt(opcode)]["inc"];
    }
  }

  return cmds;
};

console.clear();
const input = Deno.readTextFileSync("sprintExt/input.txt");
console.log(executeEdicts(input));
// console.log(executeEdicts("1002,4,3,4,33"));
// console.log(executeEdicts("1101,100,-1,4,0"));
// console.log(executeEdicts("3,0,4,0,99"));

// executeEdicts(
//   "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
// );
