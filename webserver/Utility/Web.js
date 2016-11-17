/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function requestAsync(options) {
    return __awaiter(this, void 0, Promise, function* () {
        var requestPromise = require('request-promise');
        return requestPromise(options);
    });
}
exports.requestAsync = requestAsync;
//# sourceMappingURL=Web.js.map