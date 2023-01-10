import EvouttyManager from "../../src/managers";
import routers from "./routes";

const manager = new EvouttyManager(routers);
manager.start();
