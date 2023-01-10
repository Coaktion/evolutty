import BullMQProvider from "./provider";
import Router from "../../routes";

class BullMQRouter extends Router {
    constructor(
        queueName: string,
        handler: any,
        ...args: any[]
    ) {
        if (!queueName) {
            throw new Error("Queue name must be provided");
        }

        super(new BullMQProvider(queueName), handler, ...args);
    }
}


export default BullMQRouter;
