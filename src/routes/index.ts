import setupBirthdayRoutes from "./birthday";
import setupCoworkersRoute from "./coworkers";
import { Express } from "express";

const setupRoutes = (app: Express) => {
    setupCoworkersRoute(app);
    setupBirthdayRoutes(app);
}

export default setupRoutes;