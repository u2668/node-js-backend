/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
"use strict";
const Mongoose = require("mongoose");
;
var benchSchema = new Mongoose.Schema({
    name: String
});
// ReSharper disable once InconsistentNaming
exports.BenchEntity = Mongoose.model("Bench", benchSchema);
//# sourceMappingURL=BenchEntity.js.map