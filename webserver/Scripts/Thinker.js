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
const Web = require("../Utility/Web");
const Output_1 = require("../Data/Output");
class Thinker {
    constructor(uri) {
        this.uri = uri;
    }
    analyze(inputs, old) {
        var all = inputs.map(_ => _.name);
        var car = new Output_1.CarOutput();
        var places = inputs.filter(_ => Boolean(_.place));
        var times = inputs.filter(_ => Boolean(_.time));
        car.place = (places[places.length - 1] || { place: null }).place;
        car.time = (times[times.length - 1] || { time: null }).time;
        var driverCount = inputs.filter(_ => _.driver).length;
        if (driverCount == 0) {
            var result = new Output_1.Output();
            result.flag = new Output_1.FlagOutput();
            result.flag.needPlace = car.place != null;
            result.flag.needTime = car.time != null;
            result.flag.newCar = false;
            result.bench = all;
            result.cars = [];
            return result;
        }
        car.passangers = all;
        var result = new Output_1.Output();
        result.flag = new Output_1.FlagOutput();
        result.flag.needPlace = car.place != null;
        result.flag.needTime = car.time != null;
        result.flag.newCar = !old.length;
        result.bench = [];
        result.cars = [car];
        return result;
    }
    analyzeAndSend(input, old) {
        return __awaiter(this, void 0, Promise, function* () {
            var result = this.analyze(input, old);
            /*
            if (result.flag.needTime) {
                await Web.requestAsync({
                    method: 'POST',
                    uri: this.uri,
                    body: {
                        type: 'needTime'
                    },
                    json: true
                });
            }
            if (result.flag.needPlace) {
                await Web.requestAsync({
                    method: 'POST',
                    uri: this.uri,
                    body: {
                        type: 'needPlace'
                    },
                    json: true
                });
            }
            */
            if (result.flag.newCar) {
                yield Web.requestAsync({
                    method: 'POST',
                    uri: this.uri,
                    body: {
                        type: 'newCar',
                        passangers: result.cars[0].passangers
                    },
                    json: true
                });
            }
            return new Promise((resolve, reject) => {
                resolve(result);
            });
        });
    }
}
exports.Thinker = Thinker;
//# sourceMappingURL=Thinker.js.map