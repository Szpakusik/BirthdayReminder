import mongoose from "mongoose";
// import { UserModel } from "./users/users.model";
let database: mongoose.Connection;

export const connect = () => {
    // add your own uri below
    const uri = <string>process.env.DB_URI;
    if (database) {
        return;
    }
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose.disconnect();
};
