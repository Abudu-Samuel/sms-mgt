import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongodbConfig from "./config/config";
import contact from "./routes/contactRoute";
import message from "./routes/messageRoute";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongodbConfig();

app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.json({
    status: "Success",
    message: "Welcome to the app API"
  });
});

app.use("/api", contact);
app.use("/api", message);

app.listen(port, () => console.log(`server is up and running on port ${port}`));
