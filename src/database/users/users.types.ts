import { Document, Model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  dayOfBirth: number;
  monthOfBirth: number;
  email: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
