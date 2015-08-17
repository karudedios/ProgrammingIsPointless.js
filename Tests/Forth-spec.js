import { MATH, QUEUE, LOGIC, EQUALITY, IO, MISC } from '../Forth/Forth.js';

describe("Forth (js version)", function() {
  it("should have modules defined", () => {
    expect(MATH).toBeTruthy("MATH is not defined");
    expect(QUEUE).toBeTruthy("QUEUE is not defined");
    expect(LOGIC).toBeTruthy("LOGIC is not defined");
    expect(EQUALITY).toBeTruthy("EQUALITY is not defined");
    expect(IO).toBeTruthy("IO is not defined");
    expect(MISC).toBeTruthy("MISC is not defined");    
  });

  /**
   * The whole testing of this might take a while
   * for which I hereby declare this a work in progress.
   */
});