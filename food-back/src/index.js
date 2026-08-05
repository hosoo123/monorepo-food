import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const port = 8000;
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://monhjargalhosbat_db_user:TdT1PMlrHLfuZNkg@cluster0.1whp0q1.mongodb.net/",
  )
  .then(() => console.log("Connected"));
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
//testaaaaaaasdasdasdasda