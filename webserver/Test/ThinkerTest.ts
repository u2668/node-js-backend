/// <reference path="../node_modules/retyped-mocha-tsd-ambient/mocha.d.ts" />

import * as Assert from 'assert';
import {Thinker} from "../Scripts/Thinker";

import {IDatabase} from "../Database/IDatabase"
import {ObjectDatabase} from "../Database/ObjectDatabase";

import {ICommunicator} from "../Communicate/ICommunicator"
import {FakeCommunicator} from "../Communicate/FakeCommunicator"



describe("Test Suite 1", () => {
    it("Test A", async () => {
        var db = new ObjectDatabase();
        var thinker: Thinker = new Thinker(new FakeCommunicator(), db);

        await db.clearAsync();
        await db.addMessageAsync({ name: "Ivanov", place: undefined, driver: undefined, time: undefined });
        var messages = await db.getMessagesAsync();

        var matchResult = thinker.analyze(messages);

        Assert.ok(matchResult.benches.length == 1, "Bench length");
    });

    it("Test 2", async () => {
        var db = new ObjectDatabase();
        var thinker: Thinker = new Thinker(new FakeCommunicator(), db);

        await db.clearAsync();
        await db.addMessageAsync({ name: "Ivanov", place: undefined, driver: undefined, time: undefined });
        await db.addMessageAsync({ name: "Ivanov", place: undefined, driver: undefined, time: undefined });
        var messages = await db.getMessagesAsync();

        var matchResult = thinker.analyze(messages);
        Assert.ok(matchResult.benches.length == 1, "Bench length");
    });

    it("Test 3", async () => {
        var db = new ObjectDatabase();
        var thinker: Thinker = new Thinker(new FakeCommunicator(), db);

        await db.clearAsync();
        await db.addMessageAsync({ name: "Shushunov", place: undefined, driver: undefined, time: undefined });
        await db.addMessageAsync({ name: "Ivanov", place: undefined, driver: undefined, time: undefined });
        await db.addMessageAsync({ name: "Ivanov", place: undefined, driver: true, time: undefined });
        var messages = await db.getMessagesAsync();

        var matchResult = thinker.analyze(messages);
        Assert.ok(matchResult.benches.length == 2, "Bench length");
    });
});
