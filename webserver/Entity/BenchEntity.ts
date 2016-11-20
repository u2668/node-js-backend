/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />

import * as Mongoose from "mongoose";
import {IBench} from "../Domain/Bench"

export interface IBenchModel extends IBench, Mongoose.Document {
    };

var benchSchema = new Mongoose.Schema({
    name: String
});

// ReSharper disable once InconsistentNaming
export var BenchEntity = Mongoose.model<IBenchModel>("Bench", benchSchema);
