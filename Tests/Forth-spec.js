import { compose, pipe, curry } from '../Utils/Utils.js'; // This is required for Forth.js to work
import { MATH, QUEUE, LOGIC, EQUALITY, IO, MISC } from '../Forth/Forth.js';

/**
 * I'll be testing Forth.js using
 * compose, pipe and curry from Utils.js
 */
describe("Forth (js version)", function() {
  /**
   * The whole testing of this might take a while
   * for which I hereby declare this a work in progress.
   */
  it("should have modules defined", () => {
    expect(MATH).toBeTruthy("MATH is not defined");
    expect(QUEUE).toBeTruthy("QUEUE is not defined");
    expect(LOGIC).toBeTruthy("LOGIC is not defined");
    expect(EQUALITY).toBeTruthy("EQUALITY is not defined");
    expect(IO).toBeTruthy("IO is not defined");
    expect(MISC).toBeTruthy("MISC is not defined");    
  });

  let compareArrays = (expected, message, ...result) => expect(expected).toEqual(result, message);

  describe("QUEUE", () => {
    let { LIT, DROP, DDROP, DUP, DDUP, SWAP, OVER, ROT, RROT, CLEAR, NIP, TUCK } = QUEUE;
    let baseLit = compose(LIT(10), LIT(5), LIT(8));

    it("should have LIT add values to the queue", () => {
      compareArrays(
          pipe([], baseLit)
        , 'LIT should add values to queue'
        , 8, 5, 10);
    });

    it("should have DROP remove head", () => {
      compareArrays(
          pipe([], baseLit, DROP)
        , 'DROP should remove head from queue'
        , 5, 10);
    });

    it("should have DDROP should remove the two head values", () => {
      compareArrays(
          pipe([], baseLit, DDROP)
        , 'DDROP should remove the two head values'
        , 10);
    });

    it("should have CLEAR empty the queue", () => {
      compareArrays(
          pipe([], baseLit, CLEAR)
        , 'CLEAR should empty the queue');      
    })

    it("should have DUP duplicating the head", () => {
      compareArrays(
          pipe([], baseLit, DUP)
        , 'DUP should duplicate the head value'
        , 8, 8, 5, 10);
    });

    it("should have OVER duplicating second to head value", () => {
      compareArrays(
          pipe([], baseLit, OVER)
        , 'OVER should duplicate second to head value'
        , 5, 8, 5, 10);      
    });

    it("should have DDUP duplicating the two head values", () => {
      compareArrays(
          pipe([], baseLit, DDUP)
        , 'DDUP should duplicate the two head values'
        , 8, 5, 8, 5, 10);
    });

    it("should have SWAP switching the two head values", () => {
      compareArrays(
          pipe([], baseLit, SWAP)
        , 'SWAP should switch the two head values'
        , 5, 8, 10);
    });

    it("should have ROT switching head with third to head value", () => {
      compareArrays(
          pipe([], baseLit, ROT)
        , 'ROT should switch head with third to head value'
        , 10, 8, 5);
    });
    
    it("should have RROT switching third and fourth to head values", () => {
      compareArrays(
          pipe([], baseLit, LIT(12), RROT)
        , 'RROT should switch third and fourth'
        , 8, 5, 12, 10);
    });
  });

  describe("MATH", () => {
    let { LIT } = QUEUE;
    let { ADD, SUB, MUL, DIV, ABS, MIN, MAX, SQUARE, CUBE } = MATH;

    it("should have ADD adding the first and second in the queue", () => {
      compareArrays(
            pipe([], LIT(10), LIT(6), ADD)
          , "ADD should add the first and second in the queue"
          , 16
        );
    });
  });
});