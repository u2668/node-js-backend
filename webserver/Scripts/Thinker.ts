/// <reference path="../node_modules/retyped-lodash-tsd-ambient/lodash.d.ts" />

import * as Web from "../Utility/Web"
import {Input} from "../Data/Input"
import {Output, CarOutput, FlagOutput} from "../Data/Output"
import * as _ from "lodash"

export class Thinker {
    constructor(uri: string) {
        this.uri = uri;
    }

    private uri: string;

    public analyze(inputs: Input[], old: any): Output {
        var all = inputs.map(_ => _.name);

        var car = new CarOutput();
        var places = inputs.filter(_ => Boolean(_.place));
        var times = inputs.filter(_ => Boolean(_.time));

        car.place = (<any>(places[places.length - 1] || {place: null})).place;
        car.time = (<any>(times[times.length - 1] || {time: null})).time;


        var driverCount = inputs.filter(_ => _.driver).length;
        if (driverCount == 0) {
            var result = new Output();

            result.flag = new FlagOutput();

            result.flag.needPlace = car.place != null;
            result.flag.needTime = car.time != null;
            result.flag.newCar = false;

            result.bench = all;
            result.cars = [];
            return result;
        }

        car.passangers = all;
        var result = new Output();

        result.flag = new FlagOutput();

        result.flag.needPlace = car.place != null;
        result.flag.needTime = car.time != null;
        result.flag.newCar = !old.length;

        result.bench = [];
        result.cars = [car];
        return result;
    }

    public async analyzeAndSend(input: Input[], old: any): Promise<Output>{
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
            await Web.requestAsync({
                method: 'POST',
                uri: this.uri,
                body: {
                    type: 'newCar',
                    passangers: result.cars[0].passangers
                },
                json: true
            });
        }

        return new Promise<Output>((resolve, reject) => {
            resolve(result);
        });
    }
}