import { IUserDto } from "../../types/user";
import { IUserDocument } from "../../types/user";

class UserServices {
   saveProfile(data: IUserDto) {
    //: Promise<IUserDocument>
    // const a: IUserDocument = new IUserDocument(data.firstName, data.lastName, data.email, data.photoId);
    const a = {};
    console.log("Save profile", a);
    return a;
  }
}

export const userServices = new UserServices();
