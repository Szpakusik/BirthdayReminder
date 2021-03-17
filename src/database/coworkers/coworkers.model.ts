import { model } from "mongoose";
import { ICoworkerDocument } from "./coworkers.types";
import CoworkerSchema from "./coworkers.schema";
export const CoworkerModel = model<ICoworkerDocument>("coworker", CoworkerSchema);
