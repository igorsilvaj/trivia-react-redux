const haveIt = [];

const generateUniqueRandom = (maxNr) => {
// Generate random number
  let random = (Math.random() * maxNr).toFixed();

  // Coerce to number by boxing
  random = Number(random);

  if (!haveIt.includes(random)) {
    haveIt.push(random);
    return random;
  }
  if (haveIt.length < maxNr) {
    // Recursively generate number
    return generateUniqueRandom(maxNr);
  }
  return false;
};

export default generateUniqueRandom;
