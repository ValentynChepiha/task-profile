require("dotenv").config();

import * as express from "express";
import { Request, Response, Application } from "express";
import * as bodyPasrer from "body-parser";
import * as cors from "cors";

import { connect } from "./db";
import { routes } from "./routers";

const PORT: number = Number(process.env["PORT"]) || 5000;
const DB_URL: string = process.env["MONGO_DB"] || "";

const app: Application = express();
app.use(bodyPasrer.json());
app.use(bodyPasrer.urlencoded({ extended: true }));
app.use(cors());

const start = (): void => {
  try {
    app.get("/", (req: Request, res: Response) => res.send("REST API Server"));
    app.listen(PORT, (): void =>
      console.log(`[server]: Server is running at https://localhost:${PORT}`)
    );
    connect({ db: DB_URL });
    routes({ app });
  } catch (err) {
    let e: Error = err;
    console.log(`[server]: ${e.message}`);
    process.exit(1);
  }
};

start();
