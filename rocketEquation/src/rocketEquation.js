export const fuelRequirment = (mass) => {
  const requiredFuel = Math.floor(mass / 3) - 2
  if(requiredFuel <= 0) {
    return 0;
  }
  return requiredFuel + fuelRequirment(requiredFuel);
};

export const masses = (modulesMasses) => {
  const requirdFuelForModules = modulesMasses.map((mass) =>
    fuelRequirment(mass)
  );
  return requirdFuelForModules.reduce((acc, eachModule) => acc + eachModule, 0);
};

console.clear();
const  input = Deno.readTextFileSync("src/input.txt").split("\n");
console.log(input)
console.log(masses(input))