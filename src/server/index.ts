import * as express from "express";
import { Express, Request, Response } from "express";
import * as mongoose from "mongoose";
import webAPIRouter from "./presentation";
import * as bodyParser from "body-parser";

const app: Express = express();
const dbURI: string = require("../../config/keys").mongoURI;

mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(`MongoDB connection failed: ${error}`));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => res.send("Hello World success"));

app.use("/api", webAPIRouter);

const port: string = process.env.PORT || "5000";

app.listen(port, () => console.log(`Server starts at port: ${port}`));
