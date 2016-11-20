/// <reference path="../node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
"use strict";
const Mongoose = require("mongoose");
;
var messageSchema = new Mongoose.Schema({
    driver: Boolean,
    time: String,
    name: String,
    place: String
});
// ReSharper disable once InconsistentNaming
exports.MessageEntity = Mongoose.model("Message", messageSchema);
//# sourceMappingURL=MessageEntity.js.map