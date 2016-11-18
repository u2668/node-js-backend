/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />


import {Message, IMessage} from "../Domain/Message"
import {Car, ICar} from "../Domain/Car"
import {Bench, IBench} from "../Domain/Bench"

import * as Mongoose from 'mongoose';


export interface IDatabase {
    addMessageAsync(message): Promise<any>;
    addCarAsync(car): Promise<any>;
    addBenchAsync(bench): Promise<any>;
    getAllAsync(collection: string): Promise<any>;
    dropAsync(collection: string): Promise<any>;
}

export class Database implements IDatabase {

    db: Mongoose.Connection;

    constructor(db: Mongoose.Connection) {
        this.db = db;
    }
    async addMessageAsync(message): Promise<any> {
        var record = new Message(message);
        return new Promise((resolve, reject) => {
            record.save((err) => {
                if (err) {
                    reject(err);
                }
                console.log(`saved: ${JSON.stringify(message)}`);
                resolve(message);
            });
        });
    }

    addCarAsync(car): Promise<any> {
        var record = new Car(car);
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

    addBenchAsync(bench): Promise<any> {
        var record = new Bench(bench);
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

    getAllAsync(collection: string): Promise<any> {
        return new Promise((resolve, reject) => {
            
            (<any>this.db.collections[collection]).find().toArray((err, result) => {
                if (err) {
                    reject(err);
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
            }
            (<any>this.db.collections[collection]).drop((err, result) => {
                console.log(`droped: ${JSON.stringify(result)}`);
                resolve(result);
            });
        });
    }
}

export class FakeDatabase implements IDatabase {
    async addMessageAsync(message): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(`result: ${JSON.stringify(message)}`);
            resolve(message);
        });
    }

    addCarAsync(car): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(`result: ${JSON.stringify(car)}`);
            resolve(car);
        });
    }

    addBenchAsync(bench): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(`result: ${JSON.stringify(bench)}`);
            resolve(bench);
        });
    }

    getAllAsync(collection: string): Promise<any> { throw new Error("Not implemented"); }

    dropAsync(collection: string): Promise<any> { throw new Error("Not implemented"); }
}