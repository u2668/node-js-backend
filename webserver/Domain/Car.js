/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />
"use strict";
const Mongoose = require('mongoose');
;
var carSchema = new Mongoose.Schema({
    time: String,
    place: String,
    passangers: [String]
});
exports.Car = Mongoose.model("Car", carSchema);
//# sourceMappingURL=Car.js.map