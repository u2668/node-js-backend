/// <reference path="../node_modules/retyped-lodash-tsd-ambient/lodash.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const _ = require("lodash");
class Thinker {
    constructor(communicator, database) {
        this.communicator = communicator;
        this.database = database;
    }
    getLastProperty(messages, getter) {
        var last = _(messages)
            .filter(message => getter(message) !== undefined && getter(message) !== null)
            .last();
        return last !== undefined ? getter(last) : null;
    }
    analyze(messages) {
        var users = _(messages)
            .groupBy(item => item.name)
            .map(item => ({
            name: _(item).first().name,
            driver: this.getLastProperty(item, message => message.driver),
            place: this.getLastProperty(item, message => message.place),
            time: this.getLastProperty(item, message => message.time)
        }));
        var cars = users
            .filter(message => message.driver)
            .map(user => ({
            driver: user.name,
            place: user.place,
            time: user.time,
            passangers: [user.name]
        }))
            .value();
        var passangers = users.filter(message => !message.driver);
        var benches = [];
        passangers.forEach(user => {
            var car = _(cars)
                .filter(car => car.passangers.length < 3)
                .filter(car => car.place == null || user.place == null || car.place == user.place)
                .filter(car => car.time == null || user.time == null || car.time == user.time)
                .first();
            if (car == null) {
                benches.push({ name: user.name });
                return;
            }
            car.passangers.push(user.name);
            car.place = car.place != null ? car.place : user.place;
            car.time = car.time != null ? car.time : user.time;
        });
        return {
            cars: cars,
            benches: benches
        };
    }
    generateOutput(current, prev) {
        return _(current.cars)
            .filter(car => !prev.cars
            .map(c => c.driver)
            .some(driver => driver == car.driver))
            .map(car => ({ type: "NewCar", car: car }))
            .value();
    }
    fix(matchResult) {
        return {
            benches: matchResult.benches,
            cars: _(matchResult.cars)
                .map(car => ({
                driver: car.driver,
                place: car.place == null ? "неизвестно" : car.place,
                time: car.time == null ? "неизвестно" : car.time,
                passangers: car.passangers
            }))
                .value()
        };
    }
    processAsync() {
        return __awaiter(this, void 0, Promise, function* () {
            var prev = yield this.database.getMatchResultAsync();
            var messages = yield this.database.getMessagesAsync();
            var matchResult = this.fix(this.analyze(messages));
            yield this.database.saveMatchResultAsync(matchResult);
            var output = this.generateOutput(matchResult, prev);
            if (output.length > 0) {
                console.log(`output messages: ${JSON.stringify(output)}`);
                yield this.communicator.sendNoticeAsync(output[0]);
            }
            console.log(`match result: ${JSON.stringify(matchResult)}`);
            yield this.communicator.sendNoticeAsync({
                type: "Status",
                matchResult: matchResult
            });
            return new Promise(resolve => resolve());
        });
    }
}
exports.Thinker = Thinker;
//# sourceMappingURL=Thinker.js.map