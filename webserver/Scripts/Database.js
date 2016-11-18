/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Message_1 = require("../Domain/Message");
const Car_1 = require("../Domain/Car");
const Bench_1 = require("../Domain/Bench");
class Database {
    constructor(db) {
        this.db = db;
    }
    addMessageAsync(message) {
        return __awaiter(this, void 0, Promise, function* () {
            var record = new Message_1.Message(message);
            return new Promise((resolve, reject) => {
                record.save((err) => {
                    if (err) {
                        reject(err);
                    }
                    console.log(`saved: ${JSON.stringify(message)}`);
                    resolve(message);
                });
            });
        });
    }
    addCarAsync(car) {
        var record = new Car_1.Car(car);
        return new Promise((resolve, reject) => {
            record.save((err) => {
                if (err) {
                    reject(err);
                }
                console.log(`saved: ${JSON.stringify(car)}`);
                resolve(car);
            });
        });
    }
    addBenchAsync(bench) {
        var record = new Bench_1.Bench(bench);
        return new Promise((resolve, reject) => {
            record.save((err) => {
                if (err) {
                    reject(err);
                }
                console.log(`saved: ${JSON.stringify(bench)}`);
                resolve(bench);
            });
        });
    }
    getAllAsync(collection) {
        return new Promise((resolve, reject) => {
            this.db.collections[collection].find().toArray((err, result) => {
                if (err) {
                    reject(err);
                }
                console.log(`find: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }
    dropAsync(collection) {
        return new Promise((resolve, reject) => {
            if (!this.db.collections[collection]) {
                resolve();
            }
            this.db.collections[collection].drop((err, result) => {
                console.log(`droped: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }
}
exports.Database = Database;
class FakeDatabase {
    addMessageAsync(message) {
        return __awaiter(this, void 0, Promise, function* () {
            return new Promise((resolve, reject) => {
                console.log(`result: ${JSON.stringify(message)}`);
                resolve(message);
            });
        });
    }
    addCarAsync(car) {
        return new Promise((resolve, reject) => {
            console.log(`result: ${JSON.stringify(car)}`);
            resolve(car);
        });
    }
    addBenchAsync(bench) {
        return new Promise((resolve, reject) => {
            console.log(`result: ${JSON.stringify(bench)}`);
            resolve(bench);
        });
    }
    getAllAsync(collection) { throw new Error("Not implemented"); }
    dropAsync(collection) { throw new Error("Not implemented"); }
}
exports.FakeDatabase = FakeDatabase;
//# sourceMappingURL=Database.js.map