/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />

import * as Bluebird from "bluebird";
import * as Mongoose from 'mongoose';

export interface IBench {
    name: string;
}

export interface IBenchModel extends IBench, Mongoose.Document {
};

var benchSchema = new Mongoose.Schema({
    name: String
});

export var Bench = Mongoose.model<IBenchModel>("Bench", benchSchema);
