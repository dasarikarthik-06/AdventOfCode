import { chunk, sortBy } from "jsr:@std/collections";

const frequency = (array) =>
  array.reduce((table, target) => {
    table[target] = (table[target] || 0) + 1;
    return table;
  }, {});

const countOfEachRows = (layers) => layers.map((layer) => frequency(layer));

const splitToLayers = (input, width, tall) => chunk(input, width * tall);

const rowHasMinZeroes = (frequenices) => sortBy(frequenices, (fre) => fre["0"]);

const decodeImage = (layers) => {
  const output = [];
  for (let x = 0; x < layers[0].length; x++) {
    let y = 0;
    while (layers[y][x] === "2") {
      y++;
    }
    const emoji = layers[y][x] === "1" ? "⬜️" : "  ";
    output.push(emoji);
  }
  console.log(output);
  return output;
};

const part1 = (input) => {
  const layers = splitToLayers(input, width, tall);
  const frequencyOfDigits = countOfEachRows(layers);
  const frequencyInSort = rowHasMinZeroes(frequencyOfDigits);
  return frequencyInSort[0]["1"] * frequencyInSort[0]["2"];
};

const part2 = (input, width, tall) => {
  const layers = splitToLayers(input, width, tall);
  return decodeImage(layers);
};

console.clear();

const main = () => {
  const input = Deno.readTextFileSync("decodeImage/input.txt").split("");
  const width = 25;
  const tall = 6;
  console.log(part1());
  const output = part2(input, width, tall);
  const grid = chunk(output, width);
  console.log(grid.join("\n"));
};

main();
