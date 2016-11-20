import {WebServer} from "./Scripts/WebServer";
import {Thinker} from "./Scripts/Thinker"

import {IDatabase} from "./Database/IDatabase"
import {MongoDatabase} from "./Database/MongoDatabase"
import {MongoUtility} from "./Database/MongoUtility"
import {ObjectDatabase} from "./Database/ObjectDatabase";

import {ICommunicator} from "./Communicate/ICommunicator"
import {WebCommunicator} from "./Communicate/WebCommunicator"
import {FakeCommunicator} from "./Communicate/FakeCommunicator"


var devinit = async () => {
    var database: IDatabase = new ObjectDatabase();
    var communicator: ICommunicator = new FakeCommunicator();
    var thinker = new Thinker(communicator, database);
    new WebServer("127.0.0.1", 8080, thinker, database).start();
}

var init = async () => {
    var database: IDatabase = new ObjectDatabase();
    var communicator: ICommunicator = new WebCommunicator(process.env.CHAT_BOT_ENDPOINT);
    var thinker = new Thinker(communicator, database);
    new WebServer("127.0.0.1", 8080, thinker, database).start();
}

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === "development") {
    devinit();
} else {
    init();
}

