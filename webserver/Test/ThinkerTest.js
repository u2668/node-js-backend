/// <reference path="../node_modules/retyped-mocha-tsd-ambient/mocha.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Assert = require('assert');
const Thinker_1 = require("../Scripts/Thinker");
const ObjectDatabase_1 = require("../Database/ObjectDatabase");
const FakeCommunicator_1 = require("../Communicate/FakeCommunicator");
describe("Test Suite 1", () => {
    it("Test A", () => __awaiter(this, void 0, void 0, function* () {
        var db = new ObjectDatabase_1.ObjectDatabase();
        var thinker = new Thinker_1.Thinker(new FakeCommunicator_1.FakeCommunicator(), db);
        yield db.clearAsync();
        yield db.addMessageAsync({ name: "Ivanov", place: undefined, driver: undefined, time: undefined });
        var messages = yield db.getMessagesAsync();
        var matchResult = thinker.analyze(messages);
        Assert.ok(matchResult.benches.length == 1, "Bench length");
    }));
    it("Test 2", () => __awaiter(this, void 0, void 0, function* () {
        var db = new ObjectDatabase_1.ObjectDatabase();
        var thinker = new Thinker_1.Thinker(new FakeCommunicator_1.FakeCommunicator(), db);
        yield db.clearAsync();
        yield db.addMessageAsync({ name: "Ivanov", place: undefined, driver: undefined, time: undefined });
        yield db.addMessageAsync({ name: "Ivanov", place: undefined, driver: undefined, time: undefined });
        var messages = yield db.getMessagesAsync();
        var matchResult = thinker.analyze(messages);
        Assert.ok(matchResult.benches.length == 1, "Bench length");
    }));
    it("Test 3", () => __awaiter(this, void 0, void 0, function* () {
        var db = new ObjectDatabase_1.ObjectDatabase();
        var thinker = new Thinker_1.Thinker(new FakeCommunicator_1.FakeCommunicator(), db);
        yield db.clearAsync();
        yield db.addMessageAsync({ name: "Shushunov", place: undefined, driver: undefined, time: undefined });
        yield db.addMessageAsync({ name: "Ivanov", place: undefined, driver: undefined, time: undefined });
        yield db.addMessageAsync({ name: "Ivanov", place: undefined, driver: true, time: undefined });
        var messages = yield db.getMessagesAsync();
        var matchResult = thinker.analyze(messages);
        Assert.ok(matchResult.benches.length == 2, "Bench length");
    }));
});
//# sourceMappingURL=ThinkerTest.js.map