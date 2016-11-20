/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />

import * as Http from "http";

import {Web} from "../Utility/Web"
import { ICommunicator } from "./ICommunicator"

export class WebCommunicator implements ICommunicator {
    private uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async sendNoticeAsync<T>(notice: T): Promise<void> {
        console.log(`sent notice: ${JSON.stringify(notice)}`);
        return new Promise<void>(async (resolve) => {
            return Web.requestAsync({
                method: 'POST',
                uri: this.uri,
                body: notice,
                json: true
            })
        });        
    }
}