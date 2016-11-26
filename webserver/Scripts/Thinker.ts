/// <reference path="../node_modules/retyped-lodash-tsd-ambient/lodash.d.ts" />

import * as _ from "lodash"

import {IDatabase} from "../Database/IDatabase";
import {ICommunicator} from "../Communicate/ICommunicator"

import {IMessage} from "../Domain/Message";
import {IBench} from "../Domain/Bench";
import {ICar} from "../Domain/Car";
import {IMatchResult} from "../Domain/MatchResult";

export interface IFunc<T, TResult> {
    (item: T): TResult;
}
export class Thinker {

    private communicator : ICommunicator;
    private database : IDatabase;

    constructor(communicator: ICommunicator, database: IDatabase) {
        this.communicator = communicator;
        this.database = database;
    }

    public getLastProperty<T>(messages: IMessage[], getter: IFunc<IMessage, T>): T {
        var last = _(messages)
            .filter(message => getter(message) !== undefined && getter(message) !== null)
            .last();
        return last !== undefined ? getter(last) : null;
    }

    public analyze(messages: IMessage[]): IMatchResult {

        var users = _(messages)
            .groupBy(item => item.name)
            .map(item => <IMessage>{
                name: _(<IMessage[]>item).first().name,
                driver: this.getLastProperty(<IMessage[]>item, message => message.driver),
                place: this.getLastProperty(<IMessage[]>item, message => message.place),
                time: this.getLastProperty(<IMessage[]>item, message => message.time)
            });

        var cars = users
            .filter(message => message.driver)
            .map(user => <ICar>{
                driver: user.name,
                place: user.place,
                time: user.time,
                passangers: [user.name]
            })
            .value();

        var passangers = users.filter(message => !message.driver);
        var benches: IBench[] = [];

        passangers.forEach(user => {
            var car = _(cars)
                .filter(car => car.passangers.length < 3)
                .filter(car => car.place == null || user.place == null || car.place == user.place)
                .filter(car => car.time == null || user.time == null || car.time == user.time)
                .first();

            if (car == null) {
                benches.push(<IBench>{ name: user.name });
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

    public generateOutput(current: IMatchResult, prev: IMatchResult): any[] {
        return _(current.cars)
            .filter(car => !prev.cars
                .map(c => c.driver)
                .some(driver => driver == car.driver))
            .map(car => <any>{ type: "NewCar", car: car })
            .value();
    }
    public fix(matchResult: IMatchResult): IMatchResult {
        return <IMatchResult>{
            benches: matchResult.benches,
            cars: _(matchResult.cars)
                .map(car => <ICar> {
                    driver: car.driver,
                    place: car.place == null ? "неизвестно" : car.place,
                    time: car.time == null ? "неизвестно" : car.time,
                    passangers: car.passangers
                })
            .value()
        };
    }

    public async processAsync(): Promise<void> {

        var messages = await this.database.getMessagesAsync();
        var prev = await this.database.getMatchResultAsync();

        var matchResult = this.fix(this.analyze(messages));
        await this.database.saveMatchResultAsync(matchResult);

        var output = this.generateOutput(matchResult, prev);
        if (output.length > 0) {
            console.log(`output messages: ${JSON.stringify(output)}`);
            await this.communicator.sendNoticeAsync(output[0]);
        }
        
        console.log(`match result: ${JSON.stringify(matchResult)}`);
        await this.communicator.sendNoticeAsync(<any>{
            type: "Status",
            matchResult: matchResult
        });

        return new Promise<void>(resolve => resolve());
    }
}