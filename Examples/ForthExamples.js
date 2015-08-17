import { compose, pipe } from '../Utils/Utils.js';
import { MATH, QUEUE, LOGIC, EQUALITY, IO, MISC } from '../Forth/Forth.js';

(() => {
  let { ADD, SUB, MUL, DIV } = MATH;
  let { LIT, DUP, DROP, SWAP, ROT, RROT } = QUEUE;
  let { IF } = LOGIC;
  let { GT } = EQUALITY;
  let { PRINT } = IO;
  let { NOP } = MISC;

  let ONE = LIT(1);

  let QUADRATIC = compose(DUP, RROT, MUL, ROT, ADD, MUL, ADD);
  pipe([], compose(LIT(1), LIT(2), LIT(2), LIT(10), QUADRATIC, PRINT));

  let FAC = (l) => pipe(l, compose(DUP, ONE, GT, IF(compose(DUP, ONE, SUB, FAC, MUL), NOP)));
  pipe([], compose(LIT(7), FAC, PRINT));

  let EULER_GEN = (l) => pipe(l, compose(DUP, FAC, ONE, SWAP, DIV, ROT, ADD, SWAP, ONE, SUB, DUP, LIT(0), GT, IF(EULER_GEN, DROP)));
  pipe([], compose(LIT(1), LIT(12), EULER_GEN, PRINT));

  return {};
})();
