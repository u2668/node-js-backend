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
const Web_1 = require("../Utility/Web");
class Scheduler {
    static startAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            var res = yield Web_1.Web.requestAsync({
                method: 'GET',
                uri: 'https://yandex.ru/'
            });
            console.log(res);
        });
    }
}
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map