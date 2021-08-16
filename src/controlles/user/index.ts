import { Request, Response } from "express";
import { IUserDto } from "../../types/user";
import { UserModel } from "../../models/user";

import { userServices } from "../../services/user";

class UserController {
  saveData(req: Request, res: Response) {
    try {
      const fileId: string = userServices.savePhoto(req.body);
      const userId = userServices.saveProfile({ ...req.body, fileId });
      return userId;
    } catch (err) {
      return res.status(400).send("Error create profile, error save data");
    }
  }

  getUser() {}
}

export const userController = new UserController();