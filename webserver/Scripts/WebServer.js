/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-serve-static-tsd-ambient/serve-static.d.ts" />
/// <reference path="../node_modules/retyped-mime-tsd-ambient/mime.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Express = require("express");
const Input_1 = require("../Data/Input");
class WebServer {
    constructor(host, port, thinker, database) {
        this.host = host;
        this.port = port;
        this.thinker = thinker;
        this.database = database;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = Express();
            app.use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET');
                next();
            });
            app.use('/static', Express.static('files'));
            app.get('/cars', (req, res) => __awaiter(this, void 0, void 0, function* () {
                var cars = yield this.database.getAllAsync("cars");
                var result = cars.map(_ => {
                    var car = {
                        "time": _.time,
                        "place": _.place,
                        "passangers": _.passangers
                    };
                    return car;
                });
                res.send(result);
            }));
            app.get('/bench', (req, res) => __awaiter(this, void 0, void 0, function* () {
                var benches = yield this.database.getAllAsync("benches");
                res.send(benches.map(_ => _.name));
            }));
            app.post('/addbench', (req, res) => {
                var queryResponse = "";
                req.on('data', chunk => { queryResponse += chunk; });
                req.on('end', () => {
                    var result = JSON.parse(queryResponse);
                    console.log(result);
                    this.database.addBenchAsync({
                        "name": "Aleksandr Aleksandrov"
                    });
                });
                res.send({ "result": "ok" });
            });
            app.post('/send', (req, res) => {
                var queryResponse = "";
                req.on('data', chunk => { queryResponse += chunk; });
                req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    var result = JSON.parse(queryResponse);
                    console.log(result);
                    yield this.database.addMessageAsync({
                        driver: result.driver,
                        time: result.time,
                        name: result.name,
                        place: result.place
                    });
                    var messages = yield this.database.getAllAsync("messages");
                    var inputs = messages.map(_ => {
                        var input = new Input_1.Input();
                        input.name = _.name;
                        input.driver = _.driver;
                        input.time = _.time;
                        input.place = _.place;
                        return input;
                    });
                    console.log(JSON.stringify(messages));
                    var old = this.database.getAllAsync("cars");
                    var output = yield this.thinker.analyzeAndSend(inputs, old);
                    yield this.database.dropAsync("benches");
                    yield this.database.dropAsync("cars");
                    output.bench.forEach(_ => {
                        this.database.addBenchAsync({
                            "name": _
                        }).then();
                    });
                    output.cars.forEach(_ => {
                        this.database.addCarAsync({
                            time: _.time,
                            place: _.place,
                            passangers: _.passangers
                        }).then();
                    });
                }));
                res.send({ "result": "ok" });
            });
            app.post('/check', (req, res) => {
                var queryResponse = "";
                req.on('data', chunk => { queryResponse += chunk; });
                req.on('end', () => {
                    console.log(`check: ${queryResponse}`);
                });
                res.send({ "result": "ok" });
            });
            app.post('/clear', (req, res) => __awaiter(this, void 0, void 0, function* () {
                this.database.dropAsync("messages");
                this.database.dropAsync("benches");
                this.database.dropAsync("cars");
                res.send({ "result": "clear" });
            }));
            app.listen(this.port, () => {
                console.log(`Server running at http://${this.host}:${this.port}/`);
            });
        });
    }
}
exports.WebServer = WebServer;
//# sourceMappingURL=WebServer.js.map