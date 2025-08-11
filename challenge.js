// Question 1
function findDuplicates(items) {
  const result = [];

  items.forEach((item) => {
    if (items.indexOf(item) !== items.lastIndexOf(item)) {
      if (!result.includes(item)) {
        result.push(item);
      }
    }
  });

  return result;
}

const duplicates = findDuplicates([1, 2, 3, 4, 5, 2, 4, 2]);
console.log(duplicates);

// Question 2
function printWithDelay(items) {
  let delay = 1000;

  items.forEach((item) => {
    setTimeout(() => {
      console.log(item);
    }, delay);

    delay *= 2;
  });
}

// printWithDelay(["a", "b", "c", "d", "e"]);

// Question 3
// Solution in react project: flex-layout (see README.md)

// Question 4
function validBrackets(str) {
  const stack = [];
  const brackets = {
    "{": "}",
    "(": ")",
    "[": "]",
  };

  for (let char of str) {
    const toCloseChar = brackets[char];
    if (toCloseChar) {
      stack.push(toCloseChar);
    } else {
      const isCloseChar = Object.values(brackets).includes(char);
      if (isCloseChar && (stack.length === 0 || stack.pop() !== char)) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(validBrackets("{[()]}")); // true
console.log(validBrackets("{[(])}")); // false

// Question 5
const secretHighestFloor = 65;

function isEggBroken(floor) {
  return floor > secretHighestFloor;
}

function findHighestFloor(numFloors) {
  let min = 1;
  const max = numFloors;

  let egg;
  let secondEggStart;

  function updateFirstEgg() {
    egg = Math.floor((max + min) / 2);
    console.log(`first egg will be throw at: ${egg}`);
  }

  function updateSecondEgg() {
    egg += 1;
    console.log(`second egg will be throw at: ${egg}`);
  }

  updateFirstEgg();
  secondEggStart = min + 1;

  // While first egg is not broken
  while (!isEggBroken(egg) && egg < max) {
    min = egg + 1;
    secondEggStart = egg + 1;
    updateFirstEgg();
  }

  // First egg is broken, now we need to find the highest floor with the second egg
  egg = secondEggStart;
  console.log(`second egg will be throw at: ${egg}`);

  while (!isEggBroken(egg)) {
    updateSecondEgg();
  }

  return egg - 1;
}

console.log(findHighestFloor(100));

// Question 6
// Solution in react project: zeno-paradox (see README.md)

// Question 7
// A estratégia aqui é guardar a melhor solução já encontrada e caminhar item a item em n soluções
// O algoritmo para quando nenhum dos n items pode ser "caminhado"
function getMaxCarrotsPrice(
  carrotTypes = [
    { weight: 5, price: 100 },
    { weight: 7, price: 150 },
    { weight: 3, price: 70 },
  ],
  capacity = 36
) {
  function bagPrice(qtds) {
    return qtds.reduce(
      (total, qtd, i) => total + qtd * carrotTypes[i].price,
      0
    );
  }

  function bagWeight(qtds) {
    return qtds.reduce(
      (total, qtd, i) => total + qtd * carrotTypes[i].weight,
      0
    );
  }

  function totalCarrotQtd(bags) {
    return bags.reduce(
      (total, bag) => total + bag.reduce((a, b) => a + b, 0),
      0
    );
  }

  let bestBag = Array.from({ length: carrotTypes.length }, () => 0);
  let bestPrice = 0;

  let bags = Array.from({ length: carrotTypes.length }, () =>
    Array.from({ length: carrotTypes.length }, () => 0)
  );

  // Initialize bags with one carrot type in each one
  for (let i = 0; i < carrotTypes.length; i++) {
    bags[i][i] = 1;
  }

  const candidates = [];
  let totalQtd = 0;
  while (true) {
    for (let i = 0; i < carrotTypes.length; i++) {
      for (let j = 0; j < carrotTypes.length; j++) {
        const newBag = [...bags[i]];
        newBag[j] += 1;

        // Verify if newBag is really new
        const isReallyNew = !candidates.some((candidate) =>
          candidate.every((qty, index) => qty === newBag[index])
        );

        if (isReallyNew) {
          candidates.push(newBag);
        }
      }
    }

    // Filter candidates by capacity
    const filteredCandidates = candidates.filter(
      (candidate) => bagWeight(candidate) <= capacity
    );

    // Stop if there are no more candidates
    if (filteredCandidates.length === 0) {
      break;
    }

    // Sort by price to store best found price
    filteredCandidates.sort((a, b) => bagPrice(b) - bagPrice(a));
    if (bagPrice(filteredCandidates[0]) > bestPrice) {
      bestBag = filteredCandidates[0];
      bestPrice = bagPrice(bestBag);
    }

    // Sort by price density to find better bags
    filteredCandidates.sort(
      (a, b) => bagPrice(b) / bagWeight(b) - bagPrice(a) / bagWeight(a)
    );
    bags = filteredCandidates.filter((_, index) => index < carrotTypes.length);

    if (totalCarrotQtd(bags) > totalQtd) {
      totalQtd = totalCarrotQtd(bags);
    } else {
      break; // No carrot could be added, stop
    }
  }

  console.log("Best bag:", bestBag);
  console.log("Best price:", bestPrice);
  return bestPrice;
}

getMaxCarrotsPrice();
