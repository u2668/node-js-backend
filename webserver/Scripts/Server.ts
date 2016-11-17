/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-serve-static-tsd-ambient/serve-static.d.ts" />
/// <reference path="../node_modules/retyped-mime-tsd-ambient/mime.d.ts" />

//import Http = require("http");
import Express = require("express");

export class Server {
    private port: number;
    private host: string;

    public constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    public start() {
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
        app.listen(this.port, () => {
            console.log(`Server running at http://${this.host}:${this.port}/`);
        });
    }
}