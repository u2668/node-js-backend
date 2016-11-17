/// <reference path="../node_modules/retyped-mocha-tsd-ambient/mocha.d.ts" />
"use strict";
const Assert = require('assert');
const Calculator_1 = require("../Scripts/Calculator");
describe("Test Suite 1", () => {
    var calculator = new Calculator_1.Calculator();
    it("Test A", () => {
        Assert.ok(true, "This shouldn't fail");
    });
    it("Test B", () => {
        Assert.equal(calculator.getResult(2, 3), 2 + 4, `This ${calculator.getResult(2, 3)}  istead of ${6}`);
    });
});
//# sourceMappingURL=UnitTest1.js.map