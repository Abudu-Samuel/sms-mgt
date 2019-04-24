import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbConfig = () => {
  mongoose.Promise = global.Promise;
  const url = process.env.MONGO_URL;
  mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

  const db = mongoose.connection;
  db.once("open", () => console.log("connection to the database is on"));
  db.on("error", () => console.log("database connection error!!"));
};

export default mongodbConfig;
