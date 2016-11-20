import { ICommunicator } from "./ICommunicator"

export class FakeCommunicator implements ICommunicator {

    async sendNoticeAsync<T>(notice: T): Promise<void> {
        return new Promise<void>(async (resolve) => {
            console.log(`fake sent notice: ${JSON.stringify(notice)}`);
            resolve();
        });        
    }
}