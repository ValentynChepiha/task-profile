import { TErrorApi } from "../../types/error";
import { Request, Response } from "express";

class ErrorServices {
  badRequest(message: string, errors: string[] = []) {
    return new TErrorApi(400, message, errors);
  }

  serverError(message: string, errors: string[] = []) {
    return new TErrorApi(500, message, errors);
  }

  sendError(err: TErrorApi, req: Request, res: Response) {
    if(err.message){
      console.log(`[server] ${err.message}`);
    }
    if (!err.errors.length) {
      err.errors.push(err.message);
    }
    return res.status(err.status).json({ errors: err.errors });
  }
}

export const errorServices = new ErrorServices();
