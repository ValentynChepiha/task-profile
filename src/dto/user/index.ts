import { IUserDocument } from "../../types/user";

export interface IUserDto {
  email: IUserDocument["email"];
  firstName: IUserDocument["firstName"];
  lastName: IUserDocument["lastName"];
  photoId: IUserDocument["photoId"];
}
