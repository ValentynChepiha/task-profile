import { v4 as uuidV4 } from "uuid";
import * as fs from "fs";
import { IFileDto } from "../../dto/file";
import {directoryServices} from "../directory";

class FileServices {

  // ???? обдумати де буде запускатися екземплар класу
  // де краще зробити цю змінну
  photoDirectory = directoryServices.checkDirectory(["..", "public", "images"]);

  createPhoto(photo: IFileDto, photoDirectory: string): string {

    const photoId = uuidV4();
    const photoExtension = photo.originalname.split(".").pop();
    const photoName = `${photoId}.${photoExtension}`;

    fs.copyFileSync(photoDirectory);

    console.log(photoName, photoDirectory);
    return photoId;
  }

  deletePhoto(id: string) {
    console.log("id", id);
    return true;
  }
}

export const fileServices = new FileServices();
