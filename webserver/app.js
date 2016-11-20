"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const WebServer_1 = require("./Scripts/WebServer");
const Thinker_1 = require("./Scripts/Thinker");
const ObjectDatabase_1 = require("./Database/ObjectDatabase");
const WebCommunicator_1 = require("./Communicate/WebCommunicator");
const FakeCommunicator_1 = require("./Communicate/FakeCommunicator");
var devinit = () => __awaiter(this, void 0, void 0, function* () {
    var database = new ObjectDatabase_1.ObjectDatabase();
    var communicator = new FakeCommunicator_1.FakeCommunicator();
    var thinker = new Thinker_1.Thinker(communicator, database);
    new WebServer_1.WebServer("127.0.0.1", 8080, thinker, database).start();
});
var init = () => __awaiter(this, void 0, void 0, function* () {
    var database = new ObjectDatabase_1.ObjectDatabase();
    var communicator = new WebCommunicator_1.WebCommunicator(process.env.CHAT_BOT_ENDPOINT);
    var thinker = new Thinker_1.Thinker(communicator, database);
    new WebServer_1.WebServer("127.0.0.1", 8080, thinker, database).start();
});
console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === "development") {
    devinit();
}
else {
    init();
}
//# sourceMappingURL=app.js.map