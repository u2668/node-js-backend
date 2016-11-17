/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />

import * as Web from "../Utility/Web"

export class Scheduler {

    public static async startAsync() {

        var res = await Web.requestAsync({
            method: 'GET',
            uri: 'https://yandex.ru/'
        });

        console.log(res);
    }
}