import { Document } from "mongoose";

export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

export interface IUserDto {
  email: IUserDocument["email"];
  firstName: IUserDocument["firstName"];
  lastName: IUserDocument["lastName"];
  photo: IUserDocument["photo"];
}