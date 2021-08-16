import * as path from "path";
import * as fs from "fs";

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
      throw new Error(`[server]: wrong check dir ${directoryArray}, error: ${e.message}`);
    }
  }

  createDirectory(directoryPath: string) {
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
    } catch (err) {
      let e: Error = err;
      throw new Error(`[server]: Can't create directory ${directoryPath}, error: ${e.message}`);
    }
  }
}

export const directoryServices = new DirectoryServices();
