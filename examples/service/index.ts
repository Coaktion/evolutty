import {EvoluttyManager} from "../../src";
import routers from "./routes";

const manager = new EvoluttyManager(routers);
manager.start();
