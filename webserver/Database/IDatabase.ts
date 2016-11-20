import {IMessage} from "../Domain/Message"
import {ICar} from "../Domain/Car"
import {IBench} from "../Domain/Bench"
import {IMatchResult} from "../Domain/MatchResult";

export interface IDatabase {
    addMessageAsync(message: IMessage): Promise<void>;
    getMessagesAsync(): Promise<IMessage[]>;

    getMatchResultAsync(): Promise<IMatchResult>;
    saveMatchResultAsync(matchResult: IMatchResult): Promise<void>;

    clearAsync(): Promise<void>;
}
