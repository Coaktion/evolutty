import { SQSQueueRouter } from '../../src';
import MyHandler from "./handlers";


const routers = [
    {
        routeType: SQSQueueRouter,
        handler: MyHandler,
        queueName: "teste__tinoco",
    }
];

export default routers;
