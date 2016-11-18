/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />

import * as Bluebird from "bluebird";
import * as Mongoose from 'mongoose';

export interface ICar {
    time: string;
    place: string;
    passangers: string[];
}

export interface ICarModel extends ICar, Mongoose.Document {
};

var carSchema = new Mongoose.Schema({
    time: String,
    place: String,
    passangers: [String]
});

export var Car = Mongoose.model<ICarModel>("Car", carSchema);
