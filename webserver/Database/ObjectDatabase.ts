import {IMessage} from "../Domain/Message"
import {ICar} from "../Domain/Car"
import {IBench} from "../Domain/Bench"
import {IMatchResult} from "../Domain/MatchResult";

import {IDatabase} from "./IDatabase";

export class ObjectDatabase implements IDatabase {

    private messages: IMessage[] = [];
    private matchResult: IMatchResult;


    getMessagesAsync(): Promise<IMessage[]> {
        var result = this.messages;
        return new Promise<IMessage[]>(resolve => resolve(result));
    }

    async addMessageAsync(message: IMessage): Promise<any> {
        return new Promise((resolve) => {
            this.messages.push(message);
            console.log(`save: ${JSON.stringify(message)}`);
            resolve(message);
        });
    }

    getMatchResultAsync(): Promise<IMatchResult> {
        var result = this.matchResult || { benches: [], cars: [] };
        return new Promise<IMatchResult>(resolve => {
            resolve(result);
        });
    }

    saveMatchResultAsync(matchResult: IMatchResult): Promise<void> {
        this.matchResult = matchResult;
        return new Promise<void>(resole => resole());
    }

    clearAsync(): Promise<void> {
        this.messages = [];
        this.matchResult = undefined;        
        return new Promise<void>(resole => resole());
    }
}