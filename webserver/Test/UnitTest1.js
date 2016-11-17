/// <reference path="../node_modules/retyped-mocha-tsd-ambient/mocha.d.ts" />
"use strict";
var assert = require('assert');
var Calculator_1 = require("../Scripts/Calculator");
describe("Test Suite 1", function () {
    var calculator = new Calculator_1.Calculator();
    it("Test A", function () {
        assert.ok(true, "This shouldn't fail");
    });
    it("Test B", function () {
        assert.equal(calculator.getResult(2, 3), 2 + 4, "This " + calculator.getResult(2, 3) + "  istead of " + 6);
    });
});
//# sourceMappingURL=UnitTest1.js.map