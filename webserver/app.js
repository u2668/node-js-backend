/// <reference path="./node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="./node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />
"use strict";
const WebServer_1 = require("./Scripts/WebServer");
const Thinker_1 = require("./Scripts/Thinker");
const Database_1 = require("./Scripts/Database");
const Bluebird = require("bluebird");
const Mongoose = require('mongoose');
console.log(Mongoose.version);
//Mongoose.connect('mongodb://localhost:27017/test');
Mongoose.connect('mongodb://46.101.204.43:27017/test');
Mongoose.Promise = Bluebird;
var db = Mongoose.connection;
Mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
Mongoose.connection.once('open', () => {
    console.log("we connect");
});
var database = new Database_1.Database(db);
var thinker = new Thinker_1.Thinker("http://149127da.ngrok.io/notifications");
new WebServer_1.WebServer("127.0.0.1", 1331, thinker, database).start();
setInterval(() => {
    console.log("hello");
}, 20000);
/*
database.getAllAsync("benches")
    .then(bench => { console.log(`saved: ${JSON.stringify(bench)}`);});
*/ 
//# sourceMappingURL=app.js.map