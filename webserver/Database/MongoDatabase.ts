/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />

import {IDatabase} from "../Database/IDatabase"

import {MessageEntity, IMessageModel} from "../Entity/MessageEntity"
import {CarEntity, ICarModel} from "../Entity/CarEntity"
import {BenchEntity, IBenchModel} from "../Entity/BenchEntity"

import {IMessage} from "../Domain/Message"
import {ICar} from "../Domain/Car"
import {MongoUtility} from "../Database/MongoUtility"

import {IBench} from "../Domain/Bench"
import {IMatchResult} from "../Domain/MatchResult";

import * as Bluebird from "bluebird";
import * as Mongoose from 'mongoose';
import * as Message from "../Domain/Message";

export class MongoDatabase implements IDatabase {

    db: Mongoose.Connection;

    constructor(db: Mongoose.Connection) {
        this.db = db;
    }

    async getMatchResultAsync(): Promise<IMatchResult> {
        var cars = await MongoUtility.getAllAsync<ICar>(this.db, "cars");
        var benches = await MongoUtility.getAllAsync<IBench>(this.db, "benches");

        var result: IMatchResult = {
            benches: benches || [],
            cars: cars || []
        };

        return new Promise<IMatchResult>(resolve => resolve(result));
    }

    async saveMatchResultAsync(matchResult: IMatchResult): Promise<void> {
        await MongoUtility.dropAsync(this.db, "cars");
        await MongoUtility.dropAsync(this.db, "benches");

        for (var car of matchResult.cars) {
            var carEntity = new CarEntity(car);
            await MongoUtility.addEntityAsync<ICarModel>(carEntity);
        }

        for (var bench of matchResult.benches) {
            var benchEntity = new BenchEntity(bench);
            await MongoUtility.addEntityAsync<IBenchModel>(benchEntity);
        }

        return new Promise<void>(resolve => resolve());
    }

    getMessagesAsync(): Promise<IMessage[]> {
        return MongoUtility.getAllAsync<IMessage>(this.db, "messages");
    }

    async clearAsync(): Promise<void> {
        await MongoUtility.dropAsync(this.db, "cars");
        await MongoUtility.dropAsync(this.db, "benches");
        await MongoUtility.dropAsync(this.db, "messages");
        return new Promise<void>(resolve => resolve());
    }

    addMessageAsync(message: IMessage): Promise<void> {
        var entity = new MessageEntity(message);
        return MongoUtility.addEntityAsync<IMessageModel>(entity);
    }
}
