import * as express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World success")
);

const port: string = process.env.PORT || "5000";

app.listen(port, () => console.log(`Server starts at port: ${port}`));
