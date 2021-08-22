import { errorServices } from "../error";
import { UserModel } from "../../models/user";
import { IUserDto } from "../../dto/user";
import { IUserDocument } from "../../types/user";
import trim from "validator/lib/trim";

class UserServices {
  convertToDto(user: IUserDocument | object): IUserDto {
    const result: IUserDto = {
      email: "",
      firstName: "",
      lastName: "",
      photo: "",
    };
    if ("email" in user) {
      result.email = trim(user.email);
    }
    if ("firstName" in user) {
      result.firstName = trim(user.firstName);
    }
    if ("lastName" in user) {
      result.lastName = trim(user.lastName);
    }
    if ("photo" in user) {
      result.photo = trim(user.photo);
    }
    return result;
  }

  async saveProfile(data: IUserDto): Promise<string> {
    try {
      const userData = new UserModel(data);
      await userData.save();
      return userData._id;
    } catch (err) {
      let e: Error = err;
      throw errorServices.badRequest(e.message, ["User not saved"]);
    }
  }

  async findById(id: string): Promise<IUserDto> {
    try {
      const user = await UserModel.findById(id);
      return user ? this.convertToDto(user) : this.convertToDto({});
    } catch (err) {
      let e: Error = err;
      throw errorServices.badRequest(e.message, ["User not found"]);
    }
  }

  async findOne(field: object): Promise<IUserDto> {
    const user = await UserModel.findOne(field);
    return user ? this.convertToDto(user) : this.convertToDto({});
  }
}

export const userServices = new UserServices();
