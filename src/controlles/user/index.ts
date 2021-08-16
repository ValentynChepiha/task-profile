import { Request, Response } from "express";
import { UserModel } from "../../models/user";

import { userServices } from "../../services/user";
import { fileServices } from "../../services/file";

class UserController {
  async saveData(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, file: photo } = req.body;

      console.log(firstName, lastName, email, photo);

      const photoId = await fileServices.createPhoto(photo, photoDirectory);

      const dataUser = new UserModel({
        firstName,
        lastName,
        email,
        photoId,
      });

      const userId = await userServices.saveProfile(dataUser);
      res.status(200).send('All ok!');
      // if (userId) {
      //   return userId;
      // }
      // res.status(500).send("User do not save");
    } catch (err) {
      return res.status(400).send("Error create profile, error save data");
    }
  }

  getUser() {}
}

export const userController = new UserController();
