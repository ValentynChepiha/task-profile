import * as path from "path";
import * as fs from "fs";
import { errorServices } from "../error";

class DirectoryServices {
  checkDirectory(directoryArray: string[]): string {
    try {
      const directoryPath = path.resolve(__dirname, ...directoryArray);
      if (!fs.existsSync(directoryPath)) {
        this.createDirectory(directoryPath);
      }
      return directoryPath;
    } catch (err) {
      let e: Error = err;
      throw errorServices.serverError(
        `Directory ${directoryArray}, error: ${e.message}`,
        ["Server error"]
      );
    }
  }

  createDirectory(directoryPath: string) {
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
    } catch (err) {
      let e: Error = err;
      throw errorServices.serverError(
        `Can't create directory ${directoryPath}, error: ${e.message}`,
        ["Server error"]
      );
    }
  }
}

export const directoryServices = new DirectoryServices();
