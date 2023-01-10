import { BullMQRouter } from "../../src";
import MyHandler from "./handlers";

const routers = [
    new BullMQRouter("myQueue", MyHandler)
];

export default routers;
