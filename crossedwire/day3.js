let wirePos = [0, 0];

const direction = {
  R: (x, y) => [x + 1, y + 0],
  L: (x, y) => [x + (-1), y + 0],
  U: (x, y) => [x + 0, y + 1],
  D: (x, y) => [x + 0, y + (-1)],
};

const changePosition = (instruction, wire1) => {
  const heading = instruction[0];
  const steps = parseInt(instruction.slice(1));

  for (let i = 0; i < steps; i++) {
    wirePos = direction[heading](wirePos[0], wirePos[1]);
    wire1.push(wirePos);
  }
  return wire1;
};

const exectuteOneWire = (instructions, path) => {
  return instructions.map((instruction) => changePosition(instruction, path));
};

const isEqual = (point1, point2) => {
  return point1[0] === point2[0] && point1[1] === point2[1];
};

const intersectionPoints = (wire1, wire2) => {
  const commonPoints = [];
  for (let wire1Index = 0; wire1Index < wire1.length; wire1Index++) {
    for (let wire2Index = 0; wire2Index < wire2.length; wire2Index++) {
      if (isEqual(wire1[wire1Index], wire2[wire2Index])) {
        commonPoints.push(wire1[wire1Index]);
      }
    }
  }
  return commonPoints;
};

const manHattanDist = (point1, point2) =>
  Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);

const closetPointWithCentre = (points) => {
  // let closeDistance = Infinity;
  return points.reduce((closeDistance, point) => {
    const currentPointDist = manHattanDist(point, [0, 0]);
    if (closeDistance > currentPointDist) {
      closeDistance = currentPointDist;
    }
    return closeDistance;
  }, Infinity);
};

const stepsToReachFromCentre = (points, wire1, wire2) => {
  const steps = [];
  for (let i = 0; i < points.length; i++) {
    const wire1Steps = wire1.indexOf(points[i]);
  }
};

const countStepsFromPoint = (point, path) => {
  for (let i = 0; i < path.length; i++) {
    if (isEqual(point, path[i])) {
      return i + 1;
    }
  }
  return 0;
};

const countSteps = (intersectPoints, wire1, wire2) => {
  // console.log(intersectPoints);
  const totalSteps = intersectPoints.map((point) => {
    const steps1 = countStepsFromPoint(point, wire1);
    const steps2 = countStepsFromPoint(point, wire2);
    // console.log(steps1, steps2);
    return steps1 + steps2;
  });
  return totalSteps;
};

const main = () => {
  const wiresInstruction = Deno.readTextFileSync("crossedwire/day3input.txt").split("\n");
  // const wiresInstruction = ["R8,U5,L5,D3", "U7,R6,D4,L4"];
  const wire1 = exectuteOneWire(wiresInstruction[0].split(","), [])[0];
  wirePos = [0, 0];
  const wire2 = exectuteOneWire(wiresInstruction[1].split(","), [])[0];
  const intersectPoints = intersectionPoints(wire1, wire2);
  const totalSteps = countSteps(intersectPoints, wire1, wire2);
  // console.log("dsk", totalSteps);
  console.log(Math.min(...totalSteps));

  // const closetPoint =  closetPointWithCentre(intersectPoints);
  // console.log(closetPoint)
};
console.clear();

main();