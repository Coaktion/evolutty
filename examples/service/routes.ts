import BullMQRouter from "../../src/ext/bullmq/routes";
import MyHandler from "./handlers";

const routers = [
    new BullMQRouter("myQueue", MyHandler)
];

export default routers;
