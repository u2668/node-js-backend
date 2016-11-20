/// <reference path="../node_modules/retyped-node-tsd-ambient/node.d.ts" />
/// <reference path="../node_modules/retyped-express-tsd-ambient/express.d.ts" />
/// <reference path="../node_modules/retyped-request-tsd-ambient/request.d.ts" />
/// <reference path="../node_modules/retyped-bluebird-tsd-ambient/bluebird.d.ts" />
/// <reference path="../node_modules/retyped-form-data-tsd-ambient/form-data.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Request = require("request");
const Bluebird = require("bluebird");
class Web {
    static requestAsync(options) {
        return __awaiter(this, void 0, Promise, function* () {
            var requestPromise = require('request-promise');
            return requestPromise(options);
        });
    }
    static getAsync(uri) {
        return __awaiter(this, void 0, Promise, function* () {
            return Bluebird.promisify(Request.get)(uri);
        });
    }
    static postAsync(uri, options) {
        return __awaiter(this, void 0, Promise, function* () {
            return Bluebird.promisify(Request.post)(uri, options);
        });
    }
    static assembleBodyAsync(request) {
        return __awaiter(this, void 0, Promise, function* () {
            var queryResponse = "";
            return new Promise((resolve, reject) => {
                request
                    .on("data", chunk => {
                    queryResponse += chunk;
                })
                    .on("end", () => {
                    try {
                        resolve(JSON.parse(queryResponse));
                    }
                    catch (exception) {
                        reject(exception);
                    }
                })
                    .on("error", () => {
                    reject("body error");
                    resolve();
                });
            });
        });
    }
}
exports.Web = Web;
//# sourceMappingURL=Web.js.map