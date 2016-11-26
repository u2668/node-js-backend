/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-serve-static-tsd-ambient/serve-static.d.ts" />
/// <reference path="../node_modules/retyped-mime-tsd-ambient/mime.d.ts" />
/// <reference path="../node_modules/retyped-request-tsd-ambient/request.d.ts" />
/// <reference path="../node_modules/retyped-lodash-tsd-ambient/lodash.d.ts" />

import * as Express from "express";
import * as Http from "http";
import * as _ from "lodash"

import {Thinker} from "./Thinker"
import {Web} from "../Utility/Web"
import {IDatabase} from "../Database/IDatabase";
import {ICommunicator} from "../Communicate/ICommunicator"

import {IMessage} from "../Domain/Message";

export class WebServer {
    private port: number;
    private host: string;
    private thinker: Thinker;
    private database: IDatabase;

    public constructor(
        host: string,
        port: number,
        thinker: Thinker,
        database: IDatabase) {
        this.host = host;
        this.port = port;
        this.thinker = thinker;
        this.database = database;
    }

    public async start() {

        const app = Express();

        app
            .use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET');
                next();
            })
            .listen(
                this.port,
                () => {
                    console.log(`Server running at http://${this.host}:${this.port}/`);
                });

        app
            .get(
                '/cars',
                async (request, response) => {
                    var match = await this.database.getMatchResultAsync();
                    response.send(match.cars);
                })
            .get(
                '/bench',
                async (request, response) => {
                    var match = await this.database.getMatchResultAsync();
                    var benches = _(match.benches)
                        .map(bench => bench.name)
                        .toArray();
                    response.send(benches);
                })
            .post(
                '/send',
                async (request, response) => {
                    try {
                        var body = await Web.assembleBodyAsync<IMessage>(request);
                        console.log(`send body: ${JSON.stringify(body)}`);

                        await this.database.addMessageAsync({
                            driver: body.driver,
                            time: body.time,
                            name: body.name,
                            place: body.place
                        });

                        await this.thinker.processAsync();
                    }
                    catch (exception) {
                        console.log(exception);
                    }

                    response.send({ "result": "ok" });
                })
            .post(
                '/clear',
                async (request, response) => {
                    await this.database.clearAsync();
                    response.send({ "result": "clear" });
                });
    }
}