import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

import { userServices } from "../user";
import { IUserDto } from "../../dto/user";

class ValidationServices {
  checkAllFields(data: object, file: object): object {
    let flag: boolean = true;
    let errors: string[] = [];
    let dataUser: IUserDto = {
      email: "",
      firstName: "",
      lastName: "",
      photo: "",
    };

    if (!file || !Object.keys(file).length) {
      flag = false;
      errors.push("photo not found");
    }

    if (!Object.keys(data).length) {
      flag = false;
      errors.push("Bad input data");
      return { flag, errors, dataUser };
    }

    dataUser = userServices.convertToDto(data);
    Object.entries(dataUser).forEach(async (element) => {
      if (element[0] !== "photo" && isEmpty(element[1])) {
        flag = false;
        errors.push(`${element[0]} not entered. `);
        return;
      }
      if (element[0] === "email") {
        if (!isEmail(element[1])) {
          flag = false;
          errors.push("email is not valid. ");
          return;
        }
        if (!(await this.emailIsRegistered(element[1]))) {
          flag = false;
          errors.push("email already registered. ");
        }
      }
    });

    return { flag, errors, dataUser };
  }

  async emailIsRegistered<IUserDocument, P extends keyof IUserDocument>(
    email: P | string
  ): Promise<boolean> {
    const user = await userServices.findOne({ email });
    return !!Object.keys(user).length;
  }
}

export const validationServices = new ValidationServices();
