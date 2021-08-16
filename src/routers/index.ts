import { Request, Response } from "express";
import { TRoutesOptions } from "../types/routes";
import { userController } from "../controlles/user";

export const routes = ({ app }: TRoutesOptions): void => {
  app.get("/api/user/:id", (req: Request, res: Response) => {
    res.send('API GET');
    userController.getUser();
  });
  app.post("/api/user", (req: Request, res: Response) => {
    res.send('API POST');
    userController.saveData(req, res);
  });
};
