module.exports = (() => {
  let merge = (f1, f2) => (...args) => f2(f1.apply(null, args));

  let compose = (...args) => {
    if (args.some((x) => !(x instanceof Function))) throw "Functions only allowed";
    return args.reduce((fn, f) => merge(fn, f), args.shift());
  }

  let pipe = (value, ...funcs) => funcs.reduce((v, func) => func(v), value);

  let curry = (fn) => {
    let curried = function curried(...args) {
      let _ref = undefined;
      let _curried = (...args2) => curried.apply(this, args.concat(args2));
      Object.defineProperty(_curried, 'arity', { value: curried.arity, writable: true })

      return (args.length >= curried.arity)
        ? (_ref = fn.apply(this, args)) instanceof Function
          ? curry(_ref).apply(this, args.slice(fn.length))
          : _ref
        : _curried;
    };

    curried.arity = fn.arity = (fn.arity || fn.length);
    return curried;
  }

  return { compose, pipe, curry };
})();