/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />

export async function requestAsync(options: any): Promise<any> {
    var requestPromise = require('request-promise');
    return requestPromise(options);
}
