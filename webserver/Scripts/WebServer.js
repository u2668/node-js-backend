/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-serve-static-tsd-ambient/serve-static.d.ts" />
/// <reference path="../node_modules/retyped-mime-tsd-ambient/mime.d.ts" />
/// <reference path="../node_modules/retyped-request-tsd-ambient/request.d.ts" />
/// <reference path="../node_modules/retyped-lodash-tsd-ambient/lodash.d.ts" />
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
const _ = require("lodash");
const Web_1 = require("../Utility/Web");
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
            app
                .use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET');
                next();
            })
                .listen(this.port, () => {
                console.log(`Server running at http://${this.host}:${this.port}/`);
            });
            app
                .get('/cars', (request, response) => __awaiter(this, void 0, void 0, function* () {
                var match = yield this.database.getMatchResultAsync();
                response.send(match.cars);
            }))
                .get('/bench', (request, response) => __awaiter(this, void 0, void 0, function* () {
                var match = yield this.database.getMatchResultAsync();
                var benches = _(match.benches)
                    .map(bench => bench.name)
                    .toArray();
                response.send(benches);
            }))
                .post('/send', (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var body = yield Web_1.Web.assembleBodyAsync(request);
                    console.log(`send body: ${JSON.stringify(body)}`);
                    yield this.database.addMessageAsync({
                        driver: body.driver,
                        time: body.time,
                        name: body.name,
                        place: body.place
                    });
                    yield this.thinker.processAsync();
                }
                catch (exception) {
                    console.log(exception);
                }
                response.send({ "result": "ok" });
            }))
                .post('/clear', (request, response) => __awaiter(this, void 0, void 0, function* () {
                yield this.database.clearAsync();
                response.send({ "result": "clear" });
            }));
        });
    }
}
exports.WebServer = WebServer;
//# sourceMappingURL=WebServer.js.map