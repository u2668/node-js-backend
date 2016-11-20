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
const Bluebird = require("bluebird");
const Mongoose = require('mongoose');
class MongoUtility {
    static initialize(connectionString) {
        return __awaiter(this, void 0, Promise, function* () {
            console.log(`Mongo version: ${Mongoose.version}`);
            Mongoose.Promise = Bluebird;
            return new Promise((resolve, reject) => {
                Mongoose.connect(connectionString);
                var db = Mongoose.connection;
                Mongoose.connection
                    .on('error', () => {
                    console.error.bind(console, 'connection error:');
                })
                    .once('open', () => {
                    console.log(`database '${connectionString}' connect`);
                    resolve(db);
                })
                    .once('error', () => {
                    console.error.bind(console, 'connection error:');
                    reject("error connection");
                });
            });
        });
    }
    static addEntityAsync(entity) {
        return new Promise((resolve, reject) => {
            entity.save((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`saved: ${JSON.stringify(entity)}`);
                resolve(entity);
            });
        });
    }
    static getAllAsync(db, collection) {
        return new Promise((resolve, reject) => {
            db.collections[collection].find().toArray((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`find: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }
    static dropAsync(db, collection) {
        return new Promise((resolve, reject) => {
            if (!db.collections[collection]) {
                resolve();
                return;
            }
            db.collections[collection].drop((err, result) => {
                console.log(`droped: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }
}
exports.MongoUtility = MongoUtility;
//# sourceMappingURL=MongoUtility.js.map