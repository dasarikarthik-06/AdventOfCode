export const fuelRequirment = (massInStirng) => {
  const mass = parseInt(massInStirng)
  return Math.floor(mass / 3) - 2;
};

export const masses = (modulesMasses) => {
  const requirdFuelForModules = modulesMasses.map((mass) =>
    fuelRequirment(mass)
  );
  console.log(modulesMasses)
  console.log(requirdFuelForModules)
  return requirdFuelForModules.reduce((acc, eachModule) => acc + eachModule, 0);
};