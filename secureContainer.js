const hasAdjecentSameNum = (num) => {
  const numInString = num.toString();
  for (let index = 2; index < numInString.length - 1; index++) {
    if(numInString[index] === numInString[index - 1]) {
      return true;
    }
  }
  return false;
};

const doesMatchCriteria = (num) => {
  const digits = num.toString().split("");
  let index = 0;
  while(index < digits.length) {
    const firstOccurences = digits.indexOf(digits[index]);
    const lastOccurences = digits.lastIndexOf(digits[index]);
    const noOfOccurences = lastOccurences - firstOccurences + 1;
    if(noOfOccurences === 2) {
      return true;
    }
    index = lastOccurences + 1;
  }
}

const main = () => {
  const matchedOnes = [];
  for (let i = 206938; i <= 679128; i++) {
    if (doesMatchCriteria(i)) {
      const numInSorted = parseInt(i.toString().split("").sort().join(""))
      if(numInSorted === i) {
        matchedOnes.push(i);
      }
    }
  }
  return matchedOnes
};

console.log(main().length);
