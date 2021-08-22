import { Request, Response } from "express";
import { TErrorApi } from "../../types/error";

import { userServices } from "../../services/user";
import { fileServices } from "../../services/file";
import { errorServices } from "../../services/error";
import { validationServices } from "../../services/validation";

class UserController {
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData = await userServices.findById(id);
      const photo = `${req.headers.host}/profile/${userData.photo}`;
      res.status(200).json({ ...userData, photo });
    } catch (err) {
      let e: TErrorApi = err;
      errorServices.sendError(e, req, res);
    }
  }

  async saveData(req: Request, res: Response): Promise<void | Response> {
    let photo = "";
    try {
      // @ts-ignore
      const {flag, errors, dataUser} = validationServices.checkAllFields(req.body, req.file);
      if(!flag){
        let e: TErrorApi = new TErrorApi(400, "", errors);
        return errorServices.sendError(e, req, res);
      }

      // @ts-ignore
      const photoData = fileServices.convertToDto(req.file);
      photo = await fileServices.createPhoto(photoData);
      const userId = await userServices.saveProfile({ ...dataUser, photo });
      res.status(200).send(userId);
    } catch (err) {
      let e: TErrorApi = err;
      fileServices.deletePhoto(photo);
      errorServices.sendError(e, req, res);
    }
  }
}

export const userController = new UserController();
