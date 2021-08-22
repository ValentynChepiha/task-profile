import { Schema, model } from "mongoose";

import { IUserDocument } from "../../types/user";

const UserSchema: Schema = new Schema(
  {
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    photo: {type: String, required: true}
  }
);

export const UserModel = model<IUserDocument>('User', UserSchema);