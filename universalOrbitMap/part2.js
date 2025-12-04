import { intersect } from "jsr:@std/collections";

const parseInput = (input) => {
  const splitted = input.split("\n").map((x) => x.split(")"));
  return splitted.map((ele) => {
    return [ele[0], ele[1]];
  });
};

const createObject = (inputs) => {
  return inputs.reduce((acc, input) => {
    acc[input[1]] = input[0];
    return acc;
  }, {});
};

const countOrbits = (object, array, value) => {
  array.push(value);
  if (!object[value]) {
    return array;
  }
  return countOrbits(object, array, object[value]);
};

const main = () => {
  //   const input = `COM)B
  // B)C
  // C)D
  // D)E
  // E)F
  // B)G
  // G)H
  // D)I
  // E)J
  // J)K
  // K)L
  // K)YOU
  // I)SAN`;
  const input = Deno.readTextFileSync("universalOrbitMap/input.txt");
  const parsed = parseInput(input);
  const obj = createObject(parsed);
  const pathForYou = countOrbits(obj, [], obj["YOU"]);
  const pathForSanta = countOrbits(obj, [], obj["SAN"]);
  const common = intersect(pathForSanta, pathForYou)[0];
  console.log(pathForSanta.indexOf(common) + pathForYou.indexOf(common));
  // console.log(count);
};

console.clear();
main();
