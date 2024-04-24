import mongoose from "mongoose";

const mongoUrl: string =
  "mongodb+srv://ndahimana154:GitPAUL123@cluster0.ljwz9hc.mongodb.net/";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Mongodb connected successfully."))
  .catch((error: any) => console.log(`Mongodb error ${error}`));
