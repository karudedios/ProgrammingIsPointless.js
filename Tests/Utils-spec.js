import { compose, pipe, curry } from '../Utils/Utils.js';

describe("Functional Utilities", function() {
  /* a and b are inversed for the currying to make sense in subtractions and divisions */

  let add = (b, a) => a + b;
  let curriedAdd = curry(add);

  let sub = (b, a) => a - b;
  let curriedSub = curry(sub);

  let mul = (b, a) => a * b;
  let curriedMul = curry(mul);

  let div = (b, a) => a / b;
  let curriedDiv = curry(div);

  it("should have compose, pipe and curry methods defined", () => {
    expect(compose).toBeTruthy("compose is not defined");
    expect(pipe).toBeTruthy("pipe is not defined");
    expect(curry).toBeTruthy("curry is not defined");
  });

  describe("curry", () => {
    it("should equal the un-curried function when all parameters are provided", () => {
      expect(curriedAdd(1, 2)).toBe(add(1, 2));
    });

    it("should return a function when not all parameters are provided", () => {
      expect(curriedAdd(1) instanceof Function).toBeTruthy();
    });

    it("should be partially applicable", () => {
      expect(curriedAdd(1)(2)).toBe(add(1, 2));
    });

    it("should allow functions to be re-curried and work the same way", () => {
      let reCurriedAdd = curry(curriedAdd);
      expect(reCurriedAdd(1)(2)).toBe(curriedAdd(1, 2));
    });
  });

  describe("compose", () => {
    it("should equal the un-composed call of a function", () => {
      let number = 10;
      let result = add(5, sub(10, number));
      let curriedResult = compose(curriedAdd(5), curriedSub(10))(number);

      expect(result).toBe(curriedResult);
    });

    it("should not allow for non-function parameters", () => {
      expect(() => compose(10)).toThrow("Functions only allowed");
      expect(() => compose(null)).toThrow("Functions only allowed");
      expect(() => compose("yes")).toThrow("Functions only allowed");
      expect(() => compose(undefined)).toThrow("Functions only allowed");
    });
  });

  describe("pipe", () => {
    it("should allow to pipe a value through a set of functions", () => {
      expect(pipe(10, curriedAdd(5), curriedSub(3))).toBe(add(5, sub(3, 10)));
    });
  });
});