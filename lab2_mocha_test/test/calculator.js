const { expect } = require("chai");
const calc = require("../app/calculator");

function msg(pass, text) {
  console.log((pass ? "PASS: " : "FAIL: ") + text);
}

describe("Calculator tests", () => {

  // ADD
  it("add(5,2) should be 7", () => {
    const result = calc.add(5, 2);
    msg(result === 7, "add(5,2) expected 7 got " + result);
    expect(result).to.equal(7);
  });

  it("add(5,2) should be 8 (FAIL test)", () => {
    const result = calc.add(5, 2);
    msg(result === 8, "add(5,2) expected 8 got " + result);
    expect(result).to.equal(8);
  });

  // SUB
  it("sub(5,2) should be 3", () => {
    const result = calc.sub(5, 2);
    msg(result === 3, "sub(5,2) expected 3 got " + result);
    expect(result).to.equal(3);
  });

  it("sub(5,2) should be 5 (FAIL test)", () => {
    const result = calc.sub(5, 2);
    msg(result === 5, "sub(5,2) expected 5 got " + result);
    expect(result).to.equal(5);
  });

  // MUL
  it("mul(5,2) should be 10", () => {
    const result = calc.mul(5, 2);
    msg(result === 10, "mul(5,2) expected 10 got " + result);
    expect(result).to.equal(10);
  });

  it("mul(5,2) should be 12 (FAIL test)", () => {
    const result = calc.mul(5, 2);
    msg(result === 12, "mul(5,2) expected 12 got " + result);
    expect(result).to.equal(12);
  });

  // DIV
  it("div(10,2) should be 5", () => {
    const result = calc.div(10, 2);
    msg(result === 5, "div(10,2) expected 5 got " + result);
    expect(result).to.equal(5);
  });

  it("div(10,2) should be 2 (FAIL test)", () => {
    const result = calc.div(10, 2);
    msg(result === 2, "div(10,2) expected 2 got " + result);
    expect(result).to.equal(2);
  });

});
