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
class MongoDatabase {
    constructor(db) {
        this.db = db;
    }
    addMessageAsync(message) {
        return __awaiter(this, void 0, Promise, function* () {
            var record = new MessageEntity_1.MessageEntity(message);
            return new Promise((resolve, reject) => {
                record.save((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.log(`saved: ${JSON.stringify(message)}`);
                    resolve();
                });
            });
        });
    }
    getAllAsync(collection) {
        return new Promise((resolve, reject) => {
            this.db.collections[collection].find().toArray((err, result) => {
                if (err) {
                    reject(err);
                    return;
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
                return;
            }
            this.db.collections[collection].drop((err, result) => {
                console.log(`droped: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }
    getMatchResultAsync() {
        throw new Error("Not implemented");
    }
    saveMatchResultAsync(matchResult) {
        throw new Error("Not implemented");
    }
    getMessagesAsync() {
        throw new Error("Not implemented");
    }
    clearAsync() {
        throw new Error("Not implemented");
    }
}
exports.MongoDatabase = MongoDatabase;
//# sourceMappingURL=MongoDatabase.js.map