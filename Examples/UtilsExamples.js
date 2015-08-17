import { compose, pipe, curry } from '../Utils/Utils.js';

(() => {
  /**
   * Normal vs Curried
   */

  let sumThree = (a, b, c) => a + b + c;
  let curriedSumThree = curry(sumThree);

  let partialSumThree = (a) => (b) => (c) => a + b + c;
  let curriedPartialSumThree = curry(partialSumThree);

  console.log(
    sumThree(1, 2, 3),
    curriedSumThree(1)(2)(3),
    partialSumThree(1)(2)(3),
    curriedPartialSumThree(1, 2, 3)
  );

  /**
   * Curry over and over again
   */

  let doubleCurriedSumThree = curry(curriedSumThree);
  let tripleCurriedSumThree = curry(doubleCurriedSumThree);

  console.log(
    doubleCurriedSumThree(1, 2, 3),
    tripleCurriedSumThree(1)(2)(3)
  );

  /**
   * Order doesn't matter
   */

  let addFourNumbers = curry((a, b) => (c, d) => a + b + c + d);

  console.log(
    addFourNumbers(1, 2, 3, 4),
    addFourNumbers(1)(2, 3, 4),
    addFourNumbers(1, 2)(3, 4),
    addFourNumbers(1, 2, 3)(4),
    addFourNumbers(1)(2, 3)(4),
    addFourNumbers(1)(2)(3, 4),
    addFourNumbers(1, 2)(3)(4),
    addFourNumbers(1)(2)(3)(4)
  );

})();