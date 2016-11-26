/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />

import {IDatabase} from "../Database/IDatabase"

import * as Bluebird from "bluebird";
import * as Mongoose from 'mongoose';

export class MongoUtility {

    public static async initialize(connectionString: string): Promise<Mongoose.Connection> {
        console.log(`Mongo version: ${Mongoose.version}`);
        Mongoose.Promise = (Bluebird as any);

        return new Promise<Mongoose.Connection>((resolve, reject) => {
            Mongoose.connect(connectionString);
            var db = Mongoose.connection;
            Mongoose.connection
                .on(
                    'error',
                    () => {
                        console.error.bind(console, 'connection error:');
                    })
                .once(
                    'open',
                    () => {
                        console.log(`database '${connectionString}' connect`);
                        resolve(db);
                    })
                .once('error',
                    () => {
                        console.error.bind(console, 'connection error:');
                        reject("error connection");
                    });
        });
    }

    public static addEntityAsync<T extends Mongoose.Document>(entity: T): Promise<any> {
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

    public static getAllAsync<T>(db: Mongoose.Connection, collection: string): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            (<any>db.collections[collection]).find().toArray((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`find: ${JSON.stringify(result)}`);
                resolve(result as T[]);
            });
        });
    }

    public static dropAsync(db: Mongoose.Connection, collection: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!db.collections[collection]) {
                resolve();
                return;
            }
            (<any>db.collections[collection]).drop((err, result) => {
                console.log(`droped: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }
}
