import { Schema } from "mongoose";
import { findOneOrCreate, findByAge } from "./users.statics";
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  dayOfBirth: Number,
  monthOfBirth: Number,
  email: String,
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.findByAge = findByAge;

export default UserSchema;
