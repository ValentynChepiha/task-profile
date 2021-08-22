import { v4 as uuidV4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import { directoryServices } from "../directory";
import { errorServices } from "../error";

import * as sharp from "sharp";
import { IFileDto } from "../../dto/file";
import { Buffer } from "buffer";
import { Metadata } from "sharp";
import trim from "validator/lib/trim";

class FileServices {
  photoDirectory;

  constructor() {
    this.photoDirectory = directoryServices.checkDirectory([
      "..",
      "..",
      "public",
      "images",
    ]);
  }

  convertToDto(file: IFileDto | File): IFileDto {
    const result: IFileDto = {
      originalname: "",
      buffer: Buffer.alloc(0),
    };

    if ("originalname" in file) {
      result.originalname = trim(file.originalname);
    }
    if ("buffer" in file) {
      result.buffer = file.buffer;
    }

    return result;
  }

  async cropPhoto(
    photo: Buffer,
    width: number,
    height: number
  ): Promise<Buffer> {
    const photoSharp = sharp(photo);

    const { data, info } = await photoSharp
      .metadata()
      .then((metadata: Metadata) => {
        // @ts-ignore
        let left = Math.round(metadata.width / 2) - width / 2;

        // @ts-ignore
        const top = Math.round(metadata.height / 2) - height / 2;
        return photoSharp
          .extract({ width, height, left, top })
          .toBuffer({ resolveWithObject: true });
      });
    return data;
  }

  async createPhoto(photo: IFileDto): Promise<string> {
    try {
      const photoId = uuidV4();
      const photoExtension = photo.originalname.split(".").pop();
      const photoName = `${photoId}.${photoExtension}`;
      const photoPath = path.resolve(this.photoDirectory, photoName);

      const width = 200;
      const height = 200;
      const photoCrop = await this.cropPhoto(photo.buffer, width, height);

      fs.writeFileSync(photoPath, photoCrop);
      return photoName;
    } catch (err) {
      let e: Error = err;
      throw errorServices.badRequest(e.message, [
        "Server Error: Cannot save photo",
      ]);
    }
  }

  deletePhoto(photoName: string): void {
    try {
      const photoPath = path.resolve(this.photoDirectory, photoName);
      fs.rmSync(photoPath);
    } catch (err) {
      let e: Error = err;
      throw errorServices.serverError(`Can't delete file ${photoName}`, [
        "Server error",
      ]);
    }
  }
}

export const fileServices = new FileServices();
