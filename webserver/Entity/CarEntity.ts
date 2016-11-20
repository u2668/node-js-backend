/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />

import * as Mongoose from "mongoose";
import {ICar} from "../Domain/Car"


export interface ICarModel extends ICar, Mongoose.Document {
};

var carSchema = new Mongoose.Schema({
    time: String,
    place: String,
    driver: String,
    passangers: [String]
});

// ReSharper disable once InconsistentNaming
export var CarEntity = Mongoose.model<ICarModel>("Car", carSchema);
