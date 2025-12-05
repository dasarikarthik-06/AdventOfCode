const WIDTH = 25;
const TALL = 6;

const countOfEachRows = (layers) => {
  return layers.map((layer) => {
    layer.sort();
    const firstOccurence = layer.indexOf("0");
    const lastOccurence = layer.lastIndexOf("0");
    return lastOccurence - firstOccurence + 1;
  });
};

const splitToLayers = (input) => {
  const layers = [];
  let index = 0;
  while (index < input.length) {
    const x = input.slice(index, index + (WIDTH * TALL));
    console.log(x);
    layers.push(x);
    index = index + (WIDTH * TALL);
  }
  return layers;
};

const multiplyOneAndTwo = (layer) => {
  const firstOfOne = layer.indexOf("1");
  const lastOfOne = layer.lastIndexOf("1");
  const firstOfTwo = layer.indexOf("2");
  const lastOfTwo = layer.lastIndexOf("2");
  console.log((lastOfOne - firstOfOne + 1) * (lastOfTwo - firstOfTwo + 1))
}

const main = () => {
  const input = Deno.readTextFileSync("decodeImage/input.txt").split("");
  const layers = splitToLayers(input);
  const zeroesInlayers = countOfEachRows(layers);
  console.log(zeroesInlayers);
  const min = Math.min(...zeroesInlayers);
  console.log(zeroesInlayers.indexOf(min));
  const sorted = layers[zeroesInlayers.indexOf(min)].toSorted();
  console.log(sorted);
  const multiply = multiplyOneAndTwo(sorted);
};

main();
// console.log(layers);
