import { Schema } from "mongoose";
import { findOneOrCreate, findByAge } from "./coworkers.statics";
const CoworkerSchema = new Schema({
    email: String,
    prefix: String,
    dateOfEntry: {
        type: Date,
        default: new Date(),
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
    },
});

CoworkerSchema.statics.findOneOrCreate = findOneOrCreate;
CoworkerSchema.statics.findByAge = findByAge;

export default CoworkerSchema;
