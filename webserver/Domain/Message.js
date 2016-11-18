/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />
"use strict";
const Mongoose = require('mongoose');
;
var messageSchema = new Mongoose.Schema({
    driver: Boolean,
    time: String,
    name: String,
    place: String
});
exports.Message = Mongoose.model("Message", messageSchema);
//# sourceMappingURL=Message.js.map