/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-request-tsd-ambient/request.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />
/// <reference path="../node_modules/retyped-form-data-tsd-ambient/form-data.d.ts" />

import * as Express from "express";
import * as Request from "request";
import * as Bluebird from "bluebird";
import * as Http from "http";

export class Web {
    static async requestAsync(options: any): Promise<any> {
        var requestPromise = require('request-promise');
        return requestPromise(options);
    }

    static async getAsync(uri: string): Promise<Http.IncomingMessage> {
        return Bluebird.promisify<Http.IncomingMessage, string>(Request.get)(uri);
    }

    static async postAsync(uri: string, options: Http.RequestOptions): Promise<Http.IncomingMessage> {
        return Bluebird.promisify<Http.IncomingMessage, string, Http.RequestOptions>(Request.post)(uri, options);
    }

    static async assembleBodyAsync<T>(request: Express.Request): Promise<T> {
        var queryResponse = "";
        return new Promise<any>((resolve, reject) => {
            request
                .on(
                    "data",
                    chunk => {
                        queryResponse += chunk;
                    })
                .on(
                    "end",
                    () => {
                        try {
                            resolve(JSON.parse(queryResponse) as T);
                        }
                        catch (exception) {
                            reject(exception);
                        }
                    })
                .on("error",
                    () => {
                        reject("body error");
                        resolve();
                    });
        });
    }
    
}


