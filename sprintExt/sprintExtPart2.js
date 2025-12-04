// const INPUT = 5;
let output;

const parseOpcode = (instruction) => {
  const code = instruction.toString().padStart(5, "0");
  const opcode = parseInt(code.slice(code.length - 2));
  const parameterModes = [
    parseInt(code[2]),
    parseInt(code[1]),
    parseInt(code[0]),
  ];
  return [opcode, parameterModes];
};

const takeInput = (phase) => {
const input = phase[0];
phase.shift();

return input
}

const display = (x) => {
  // console.log("display: ", x);
  output = x;
  return x;
};

const isLessThan = (x, y) => {
  if (x < y) return 1;
  return 0;
};

const equals = (x, y) => {
  if (x === y) return 1;
  return 0;
};

const jumpIfTrue = (x, y, index) => {
  if (x !== 0) {
    return y;
  }
  return index + 3;
};

const jumpIFalse = (x, y, index) => {
  if (x === 0) {
    return y;
  }
  return index + 3;
};

const mapOperation = {
  1: { inc: 4, operation: (x, y) => x + y },
  2: { inc: 4, operation: (x, y) => x * y },
  3: { inc: 2, operation: takeInput },
  4: { inc: 2, operation: display },
  5: { operation: jumpIfTrue },
  6: { operation: jumpIFalse },
  7: { inc: 4, operation: isLessThan },
  8: { inc: 4, operation: equals },
};

const mapParametersMode = {
  0: (cmd, index, inc) => cmd[cmd[index + inc]],
  1: (cmd, index, inc) => cmd[index + inc],
};

const executeJump = (operation, firstParam, secondParam, index) =>
  operation(firstParam, secondParam, index);

const executeOneSet = (cmd, opcode, parameterModes, index, phase) => {

  const operation = mapOperation[opcode]["operation"];
  const firstParam = mapParametersMode[parameterModes[0]](cmd, index, 1);
  const secondParam = mapParametersMode[parameterModes[1]](cmd, index, 2);
  if (opcode === 5 || opcode === 6) {
    const inc = executeJump(operation, firstParam, secondParam, index);
    return inc;
  }
  const result = opcode === 3 ? operation(phase) : operation(firstParam, secondParam);
  // if(opcode === 3) {
  //   const result = operation(input);
  // }
  // const result = operation(firstParam, secondParam);
  cmd[cmd[index + mapOperation[opcode]["inc"] - 1]] = result;
  return index + mapOperation[opcode]["inc"];
};

export const executeEdicts = (inputString, phase = [5,5]) => {
  const inputs = inputString.split(",").map((x) => parseInt(x));
  let index = 0;
  while (inputs[index] !== 99 && index < inputs.length) {
    const [opcode, parameterModes] = parseOpcode(inputs[index]);
    index = executeOneSet(inputs, opcode, parameterModes, index, phase);
  }
  // console.log(inputs);
  console.log(phase);
  return output;
};

// console.clear();

const input = Deno.readTextFileSync("sprintExt/input.txt");
executeEdicts(input);
// executeEdicts("1002,3,2,3,1101,4,2,2,3,4,4,0,4,11,99,33");
// executeEdicts("3,0,99");
// executeEdicts(
//   "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
// );
