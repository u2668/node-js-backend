/// <reference path="./node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />

import {Calculator} from "./Scripts/Calculator";
import {Server} from "./Scripts/Server";

import Mongoose = require('mongoose');

/*
var parse = Url.parse("http://www.example.com/profile?name=barry");
console.log(parse.protocol);
console.log(parse.host);
console.log(parse.query);
*/

new Server("127.0.0.1", 1331)
    .start();

new Server("127.0.0.1", 1332)
    .start();

console.log(Mongoose.version);

/*
var db = Mongoose.createConnection('mongodb://localhost/test');

var userSchema = new Mongoose.Schema({
    name: { type: String, default: "hahaha" },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date },
    buff: Buffer
});

var user = db.model("User", userSchema);
*/