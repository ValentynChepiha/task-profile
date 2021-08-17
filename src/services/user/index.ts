import { IUserDto } from "../../dto/user";
import { IUserDocument } from "../../types/user";

class UserServices {
  async saveProfile(data: IUserDto): Promise<string> {
    //: Promise<IUserDocument>
    // const a: IUserDocument = new IUserDocument(data.firstName, data.lastName, data.email, data.photoId);
    const a = '';
    console.log("Save profile", a);
    return a;
  }
}

export const userServices = new UserServices();
