function calc(x, parameters) {
  function ext16(num) {
    return BigInt.asUintN(128, BigInt(num));
  }
  function procTerm(exp, index) {
    const tmp = (ext16(parameters[index]) * ext16(x ** exp) * ext16("0x20C49BA5E353F7CF")) % BigInt(2 ** 128);
    return (tmp >> 71n) + (tmp >> 127n);
  }

  return Number(BigInt.asIntN(32, procTerm(3, 0) + procTerm(2, 1) + procTerm(1, 2) + ext16(parameters[3])));
}

export default calc