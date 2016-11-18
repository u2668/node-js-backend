/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />
"use strict";
const Mongoose = require('mongoose');
;
var benchSchema = new Mongoose.Schema({
    name: String
});
exports.Bench = Mongoose.model("Bench", benchSchema);
//# sourceMappingURL=Bench.js.map