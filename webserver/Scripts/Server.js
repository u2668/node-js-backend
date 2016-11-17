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
class Server {
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            Http
                .createServer((req, res) => {
                    res.writeHead(200, { 'Content-Type': "text/plain" });
                    res.end(`Hello World (result is $5)`);
                })
                .listen(this.port, this.host);
            console.log(`Server running at http://${this.host}:${this.port}/`);
            */
            var app = Express();
            //app.use(app.route);
            app.use('/static', Express.static('files'));
            app.get('/api', (req, res) => {
                res.send({ error: 'Validation error' });
            });
            app.listen(this.port, () => {
                console.log(`Server running at http://${this.host}:${this.port}/`);
            });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map