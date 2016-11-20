"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class ObjectDatabase {
    constructor() {
        this.messages = [];
    }
    getMessagesAsync() {
        var result = this.messages;
        return new Promise(resolve => resolve(result));
    }
    addMessageAsync(message) {
        return __awaiter(this, void 0, Promise, function* () {
            return new Promise((resolve) => {
                this.messages.push(message);
                console.log(`save: ${JSON.stringify(message)}`);
                resolve(message);
            });
        });
    }
    getMatchResultAsync() {
        var result = this.matchResult || { benches: [], cars: [] };
        return new Promise(resolve => {
            resolve(result);
        });
    }
    saveMatchResultAsync(matchResult) {
        this.matchResult = matchResult;
        return new Promise(resole => resole());
    }
    clearAsync() {
        this.messages = [];
        this.matchResult = undefined;
        return new Promise(resole => resole());
    }
}
exports.ObjectDatabase = ObjectDatabase;
//# sourceMappingURL=ObjectDatabase.js.map