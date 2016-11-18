/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-serve-static-tsd-ambient/serve-static.d.ts" />
/// <reference path="../node_modules/retyped-mime-tsd-ambient/mime.d.ts" />
/// <reference path="../node_modules/retyped-body-parser-tsd-ambient/body-parser.d.ts" />
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
class AnalyzerServer {
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            var app = Express();
            //app.use(BodyParser.json({ type: 'application/*+json' }))
            app.use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET');
                next();
            });
            app.get('/bench', (req, res) => {
                res.send([
                    "aalexandrovv",
                    "drozdovii"
                ]);
            });
            app.listen(this.port, () => {
                console.log(`Server running at http://${this.host}:${this.port}/`);
            });
        });
    }
}
exports.AnalyzerServer = AnalyzerServer;
//# sourceMappingURL=AnalyzerServer.js.map