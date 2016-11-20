/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />

import {IDatabase} from "../Database/IDatabase"

import {MessageEntity} from "../Entity/MessageEntity"
import {CarEntity} from "../Entity/CarEntity"
import {BenchEntity} from "../Entity/BenchEntity"

import {IMessage} from "../Domain/Message"
import {ICar} from "../Domain/Car"
import {IBench} from "../Domain/Bench"
import {IMatchResult} from "../Domain/MatchResult";

import * as Bluebird from "bluebird";
import * as Mongoose from 'mongoose';

export class MongoDatabase implements IDatabase {

    db: Mongoose.Connection;

    constructor(db: Mongoose.Connection) {
        this.db = db;
    }

    async addMessageAsync(message: IMessage): Promise<void> {
        var record = new MessageEntity(message);
        return new Promise<void>((resolve, reject) => {
            record.save((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`saved: ${JSON.stringify(message)}`);
                resolve();
            });
        });
    }

    getAllAsync(collection: string): Promise<any> {
        return new Promise((resolve, reject) => {
            (<any>this.db.collections[collection]).find().toArray((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`find: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }

    dropAsync(collection: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.db.collections[collection]) {
                resolve();
                return;
            }
            (<any>this.db.collections[collection]).drop((err, result) => {
                console.log(`droped: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }

    getMatchResultAsync(): Promise<IMatchResult> {
        throw new Error("Not implemented");
    }

    saveMatchResultAsync(matchResult: IMatchResult): Promise<void> {
         throw new Error("Not implemented");
    }

    getMessagesAsync(): Promise<IMessage[]> {
        throw new Error("Not implemented");
    }

    clearAsync(): Promise<void> {
        throw new Error("Not implemented");
    }
}
