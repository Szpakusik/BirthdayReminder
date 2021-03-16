import { connect } from "./database/database";
import setupRoutes from "./routes/birthday";
import express, { Express } from "express";
import startSchedule from "./scheduler/startScheduler";
import "dotenv/config";
import { runMailer } from "./scheduler/mailer";

const app = express();
const port = 5002;
connect();

app.use( express.json() )

setupRoutes(app)

startSchedule()

runMailer();

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
