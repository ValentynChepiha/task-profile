import { v4 as uuidV4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
// import { IFileDto } from "../../dto/file";
import { Request } from "express";
import { directoryServices } from "../directory";

class FileServices {
  photoDirectory = directoryServices.checkDirectory([
    "..",
    "..",
    "..",
    "public",
    "images",
  ]);

  // createPhoto(photo: IFileDto): string {
  createPhoto(req: Request): string {
    const { file: photo } = req;
    const photoId = uuidV4();
    // @ts-ignore
    const photoExtension = photo.originalname.split(".").pop();
    const photoName = `${photoId}.${photoExtension}`;
    const photoPath = path.resolve(this.photoDirectory, photoName);
    // @ts-ignore
    fs.writeFileSync(photoPath, photo.buffer);
    return photoId;
  }

  deletePhoto(id: string) {
    console.log("id", id);
    return true;
  }
}

export const fileServices = new FileServices();
