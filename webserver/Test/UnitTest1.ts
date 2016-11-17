﻿/// <reference path="../node_modules/retyped-mocha-tsd-ambient/mocha.d.ts" />

import * as Assert from 'assert';
import {Calculator} from "../Scripts/Calculator";


describe("Test Suite 1", () => {
    var calculator = new Calculator();

    it("Test A", () => {
        Assert.ok(true, "This shouldn't fail");
    });

    it("Test B", () => {
        Assert.equal(calculator.getResult(2, 3), 2 + 4, `This ${calculator.getResult(2, 3)}  istead of ${6}`);
    });
});
