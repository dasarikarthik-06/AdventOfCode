import { permutations } from "jsr:@std/collections";
import { executeEdicts } from "../amplificationCircuit/sprint.js";
let halted = 0;

const loopOverDigits = (digits, memory) => {
  const dummyMemory = [memory, memory, memory, memory, memory];
  const pointer = [0, 0, 0, 0, 0];
  let result = 0;
  let index = 0;
  while (halted !== 2) {
    if (dummyMemory[index][pointer[index]] === 99) {
      index = (index + 1) % digits.length;
      continue;
    }

    [result, pointer[index], halted] = executeEdicts(dummyMemory[index], [
      digits[index],
      result,
    ], pointer[index]);
    index = (index + 1) % digits.length;
    console.log("index", index);
    console.log("halted: ", halted);
  }
  return result;
};

const loopOverAllCombinations = (combiantions, memory) => {
  let dummyMemory = memory.split(",").map((x) => parseInt(x));
  const results = [];
  for (let i = 0; i < combiantions.length; i++) {
    const result = loopOverDigits(combiantions[i], dummyMemory);
    results.push(result);
    dummyMemory = memory;
  }

  return results;
};

const main = (memory) => {
  const combiantions = permutations([5, 6, 7, 8, 9]);
  const results = loopOverAllCombinations(combiantions, memory);
  console.log(results);
  console.log(Math.max(...results));
};

console.clear();
// const memory = Deno.readTextFileSync("amplificationCircuit/memory.txt");
// main(memory);

const memory =
  "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
main(memory);
