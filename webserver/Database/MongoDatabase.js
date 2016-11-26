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
const MessageEntity_1 = require("../Entity/MessageEntity");
const CarEntity_1 = require("../Entity/CarEntity");
const BenchEntity_1 = require("../Entity/BenchEntity");
const MongoUtility_1 = require("../Database/MongoUtility");
class MongoDatabase {
    constructor(db) {
        this.db = db;
    }
    getMatchResultAsync() {
        return __awaiter(this, void 0, Promise, function* () {
            var cars = yield MongoUtility_1.MongoUtility.getAllAsync(this.db, "cars");
            var benches = yield MongoUtility_1.MongoUtility.getAllAsync(this.db, "benches");
            var result = {
                benches: benches || [],
                cars: cars || []
            };
            return new Promise(resolve => resolve(result));
        });
    }
    saveMatchResultAsync(matchResult) {
        return __awaiter(this, void 0, Promise, function* () {
            yield MongoUtility_1.MongoUtility.dropAsync(this.db, "cars");
            yield MongoUtility_1.MongoUtility.dropAsync(this.db, "benches");
            for (var car of matchResult.cars) {
                var carEntity = new CarEntity_1.CarEntity(car);
                yield MongoUtility_1.MongoUtility.addEntityAsync(carEntity);
            }
            for (var bench of matchResult.benches) {
                var benchEntity = new BenchEntity_1.BenchEntity(bench);
                yield MongoUtility_1.MongoUtility.addEntityAsync(benchEntity);
            }
            return new Promise(resolve => resolve());
        });
    }
    getMessagesAsync() {
        return MongoUtility_1.MongoUtility.getAllAsync(this.db, "messages");
    }
    clearAsync() {
        return __awaiter(this, void 0, Promise, function* () {
            yield MongoUtility_1.MongoUtility.dropAsync(this.db, "cars");
            yield MongoUtility_1.MongoUtility.dropAsync(this.db, "benches");
            yield MongoUtility_1.MongoUtility.dropAsync(this.db, "messages");
            return new Promise(resolve => resolve());
        });
    }
    addMessageAsync(message) {
        var entity = new MessageEntity_1.MessageEntity(message);
        return MongoUtility_1.MongoUtility.addEntityAsync(entity);
    }
}
exports.MongoDatabase = MongoDatabase;
//# sourceMappingURL=MongoDatabase.js.map