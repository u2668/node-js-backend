/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
"use strict";
const Mongoose = require("mongoose");
;
var carSchema = new Mongoose.Schema({
    time: String,
    place: String,
    driver: String,
    passangers: [String]
});
// ReSharper disable once InconsistentNaming
exports.CarEntity = Mongoose.model("Car", carSchema);
//# sourceMappingURL=CarEntity.js.map