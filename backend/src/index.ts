import express, { Express } from "express";
import mongoose from "mongoose";
import router from "./routes";

const app: Express = express();
const port: number = 3300;

const mongoUrl: string ="mongodb+srv://ndahimana154:GitPAUL123@cluster0.ljwz9hc.mongodb.net/";

mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error(`Mongo DB error: ${error}`);
    process.exit(1);
  });

app.use(express.json());
app.use("/api", router);

export default app;
