import mongoose from "mongoose";

const mongoUrl: string =
  "mongodb+srv://ndahimana154:GitPASS123@cluster0.ljwz9hc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Mongodb connected successfully."))
  .catch((error: any) => console.log(`Mongodb error ${error}`));
