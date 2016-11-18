/// <reference path="./node_modules/retyped-mongoose-tsd-ambient/mongoose.d.ts" />
/// <reference path="./node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />

import {Calculator} from "./Scripts/Calculator";
import {WebServer} from "./Scripts/WebServer";
import {Scheduler} from "./Scripts/Scheduler";
import {Thinker} from "./Scripts/Thinker"
import {IDatabase, Database, FakeDatabase} from "./Scripts/Database"
import {Message} from "./Domain/Message"
import {Car} from "./Domain/Car"

import * as Bluebird from "bluebird";
import * as Mongoose from 'mongoose';

console.log(Mongoose.version);
//Mongoose.connect('mongodb://localhost:27017/test');
Mongoose.connect('mongodb://46.101.204.43:27017/test');
Mongoose.Promise = <any>Bluebird;
var db = Mongoose.connection;
Mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
Mongoose.connection.once('open', () => {
    console.log("we connect");
});

var database: IDatabase = new Database(db);

var thinker = new Thinker("http://149127da.ngrok.io/notifications");
new WebServer("127.0.0.1", 1331, thinker, database).start();

setInterval(() => {
        console.log("hello");
    },
    20000);



/*
database.getAllAsync("benches")
    .then(bench => { console.log(`saved: ${JSON.stringify(bench)}`);});
*/