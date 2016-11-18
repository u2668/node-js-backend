/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-serve-static-tsd-ambient/serve-static.d.ts" />
/// <reference path="../node_modules/retyped-mime-tsd-ambient/mime.d.ts" />

import * as Express from "express";
import {Thinker} from "./Thinker"
import {IDatabase} from "./Database";
import {Input} from "../Data/Input"


export class WebServer {
    private port: number;
    private host: string;
    private thinker: Thinker;
    private database : IDatabase;

    public constructor(host: string, port: number, thinker: Thinker, database: IDatabase) {

        this.host = host;
        this.port = port;
        this.thinker = thinker;
        this.database = database;
    }

    public async start() {

        const app = Express();

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET');
            next();
        });

        app.use('/static', Express.static('files'));


        app.get('/cars', async (req, res) => {

            var cars = await this.database.getAllAsync("cars");
            var result = cars.map(_ => {
                var car = {
                    "time": _.time,
                    "place": _.place,
                    "passangers": _.passangers
                };
                return car;
            });
            
            res.send(result);
        });

        app.get('/bench', async (req, res) => {
            var benches = await this.database.getAllAsync("benches");

            res.send(benches.map(_ => _.name));
        });

        app.post('/addbench',
            (req, res) => {
                var queryResponse = "";
                req.on('data', chunk => { queryResponse += chunk; });
                req.on(
                    'end',
                    () => {
                        var result = JSON.parse(queryResponse);
                        console.log(result);
                        this.database.addBenchAsync({
                            "name": "Aleksandr Aleksandrov"
                        });
                    });

                res.send({ "result": "ok" });
            });

        app.post('/send',
            (req, res) => {
                var queryResponse = "";
                req.on('data', chunk => { queryResponse += chunk; });
                req.on(
                    'end',
                    async () => {
                        var result = JSON.parse(queryResponse);
                        console.log(result);
                        await this.database.addMessageAsync({
                            driver: result.driver,
                            time: result.time,
                            name: result.name,
                            place: result.place
                        });

                        var messages = await this.database.getAllAsync("messages");
                        var inputs = messages.map(_ => {
                            var input = new Input();
                            input.name = _.name;
                            input.driver = _.driver;
                            input.time = _.time;
                            input.place = _.place;
                            return input;
                        });
                        console.log(JSON.stringify(messages));
                        var old = this.database.getAllAsync("cars");
                        var output = await this.thinker.analyzeAndSend(inputs, old);

                        await this.database.dropAsync("benches");
                        await this.database.dropAsync("cars");

                        output.bench.forEach(_ => {
                            this.database.addBenchAsync({
                                "name":  _
                            }).then();
                        });

                        
                        output.cars.forEach(_ => {
                            this.database.addCarAsync({
                                time: _.time,
                                place: _.place,
                                passangers: _.passangers
                            }).then();
                        });
                    });

                res.send({"result": "ok"});
            });

        app.post('/check',
            (req, res) => {
                var queryResponse = "";
                req.on('data', chunk => { queryResponse += chunk; });
                req.on(
                    'end',
                    () => {
                        console.log(`check: ${queryResponse}`);
                    });

                res.send({ "result": "ok" });
            });

        app.post('/clear',
            async (req, res) => {
                this.database.dropAsync("messages");
                this.database.dropAsync("benches");
                this.database.dropAsync("cars");
                res.send({ "result": "clear" });
            });

        app.listen(this.port, () => {
            console.log(`Server running at http://${this.host}:${this.port}/`);
        });
    }
}