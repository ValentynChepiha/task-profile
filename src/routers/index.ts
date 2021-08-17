import { Request, Response } from "express";
import { TRoutesOptions } from "../types/routes";
import { userController } from "../controlles/user";
import * as multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const routes = ({ app }: TRoutesOptions): void => {
  app.get("/api/user/:id", (req: Request, res: Response) => {
    console.log('routes / get :: ');
    userController.getUser();
  });
  app.post("/api/user", upload.single("photo"), (req: Request, res: Response) => {
    try {
      userController.saveData(req, res);
    } catch (err) {
      let e:Error = err;
      console.log(e.message);
      res.status(500).send('Error upload file');
    }
  });
};
