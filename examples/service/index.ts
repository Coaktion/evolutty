import LuffyManager from "../../luffy/managers";
import routers from "./routes";

const manager = new LuffyManager(routers);
manager.start();
