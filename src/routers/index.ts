import { TRoutesOptions } from "../types/routes";
import { userController } from "../controlles/user";
import * as multer from "multer";

const storage = multer.memoryStorage();
const uploadPhoto = multer({ storage }).single("photo");

export const routes = ({ app }: TRoutesOptions): void => {
  app.get("/api/user/:id", userController.getUser);
  app.post("/api/user", uploadPhoto, userController.saveData);
};
