import { compose, pipe, curry } from '../Utils/Utils.js';

module.exports = (() => {
  let dyadic = curry((f, l) => (function(a, b) { return [f(a, b)] }).apply(null, l).concat(l.slice(2)));
  let comp = (f) => dyadic((b, a) => (f(a, b) ? -1 : 0));
  
  let ADD = dyadic((b, a) => a + b);
  let SUB = dyadic((b, a) => a - b);
  let MUL = dyadic((b, a) => a * b);
  let DIV = dyadic((b, a) => a / b);

  let LIT = curry((v, l) => [v].concat(l));

  let DROP = (l) => l.slice(1);
  let DUP = (l) => LIT(l[0], l);
  let SWAP = (l) => LIT(l[1], LIT(l[0], l.slice(2)))
  let OVER = (l) => LIT(l[1], l);
  let ROT = (l) => LIT(l[2], LIT(l[0], LIT(l[1], l.slice(3))))
  let CLEAR = (l) => [];
  let PRINT = (l) => (console.log(l), l);

  let DDROP = compose(DROP, DROP);
  let RROT = compose(ROT, ROT);
  let DDUP = compose(OVER, OVER);
  let NIP = compose(SWAP, DROP);
  let TUCK = compose(SWAP, OVER);

  let SQUARE = compose(DUP, MUL);
  let CUBE = compose(DUP, DUP, MUL, MUL);

  let NAND = dyadic((a, b) => !(a == -1 && b == -1) ? -1 : 0);

  let NOT = compose(DUP, NAND);
  let AND = compose(NAND, NOT);
  let OR = compose(NOT, SWAP, NOT, NAND);
  let NOR = compose(OR, NOT);
  let XOR = compose(DDUP, AND, RROT, NOR, NOR);
  let XNOR = compose(XOR, NOT);

  let GT = comp((a, b) => a > b);
  let EQ = comp((a, b) => a == b);
  let LT = compose(DDUP, GT, RROT, EQ, OR, NOT);
  let LEQ = compose(DDUP, LT, RROT, EQ, OR);
  let GEQ = compose(DDUP, GT, RROT, EQ, OR);
  let NEQ = compose(EQ, NOT);

  let IF = curry((t, f, l) => ((a) => a == -1 ? t(l) : f(l))(l.shift()));
  let NOP = (l) => l

  let ABS = compose(DUP, LIT(0), LT, IF(compose(LIT(-1), MUL), NOP));
  let MIN = compose(DDUP, GT, IF(SWAP, NOP), DROP);
  let MAX = compose(DDUP, LT, IF(SWAP, NOP), DROP);

  return {
    MATH: { ADD, SUB, MUL, DIV, ABS, MIN, MAX, SQUARE, CUBE },
    QUEUE: { LIT, DROP, DDROP, DUP, DDUP, SWAP, OVER, ROT, RROT, CLEAR, NIP, TUCK },
    LOGIC: { NAND, NOT, AND, OR, NOR, XOR, XNOR, IF },
    EQUALITY: { GT, EQ, LT, LEQ, GEQ, NEQ },
    IO: { PRINT },
    MISC: { NOP }
  };
})();