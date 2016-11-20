export interface ICommunicator {
    sendNoticeAsync<T>(notice: T) : Promise<void>;
}