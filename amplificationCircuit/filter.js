import { permutations } from "jsr:@std/collections";
import { executeEdicts } from "../sprintExt/sprintExtPart2.js";

const loopOverDigits = (digits, memory) => {
  let dummyMemory = memory;
  let result = 0;
  for (let index = 0; index < digits.length; index++) {
    result = executeEdicts(dummyMemory, [digits[index], result]);
    dummyMemory = memory;
  }

  return result;
};

const loopOverAllCombinations = (combiantions, memory) => {
  let dummyMemory = memory;
  const results = [];
  for (let i = 0; i < combiantions.length; i++) {
    const result = loopOverDigits(combiantions[i], dummyMemory);
    results.push(result);
    dummyMemory = memory;
  }

  return results;
};

const main = (memory) => {
  const combiantions = permutations([0, 1, 2, 3, 4]);
  const results = loopOverAllCombinations(combiantions, memory);
  console.log(results);
  console.log(Math.max(...results));
};

console.clear();
const memory = Deno.readTextFileSync("amplificationCircuit/memory.txt");
main(memory);
