import * as mongoose from "mongoose";

import { TMongooseOptions } from "../types/mongoose";

export const connect = ({ db }: TMongooseOptions): void => {
  const connect = () => {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => {
        console.log("[server]: Mongodb connected");
      })
      .catch((err) => {
        let e: Error = err;
        console.log(`[server]: Error connection to db: ${e.message}`);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnected", connect);
};
