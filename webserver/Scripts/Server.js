/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-serve-static-tsd-ambient/serve-static.d.ts" />
/// <reference path="../node_modules/retyped-mime-tsd-ambient/mime.d.ts" />
"use strict";
//import Http = require("http");
var Express = require("express");
var Server = (function () {
    function Server(host, port) {
        this.host = host;
        this.port = port;
    }
    Server.prototype.start = function () {
        var _this = this;
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
        app.use('/static', Express.static('files'));
        app.listen(this.port, function () {
            console.log("Server running at http://" + _this.host + ":" + _this.port + "/");
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map