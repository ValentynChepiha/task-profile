import { Schema, model } from "mongoose";

import { IUserDocument } from "../../types/user";

const UserSchema: Schema = new Schema(
  {
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    photoId: {type: String, required: true, unique: true}
  }
);

export const UserModel = model<IUserDocument>('User', UserSchema);