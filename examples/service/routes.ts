import { BullMQRouter } from "../../src";
import MyHandler from "./handlers";

const routers = [
    {
        routeType: BullMQRouter,
        queueName: "myQueue",
        handler: MyHandler
    }
];

export default routers;
