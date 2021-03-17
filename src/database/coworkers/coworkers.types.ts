import { Document, Model } from "mongoose";

export interface ICoworker {
  email: string,
  prefix: string,
  dateOfEntry?: Date;
  lastUpdated?: Date;
}

export interface ICoworkerDocument extends ICoworker, Document {}
export interface ICoworkerModel extends Model<ICoworkerDocument> {}
