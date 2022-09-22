import cors from "cors";
import express from "express";
import useragent from "express-useragent";
import dotenv from "dotenv";

import { ImageUploader } from "./src/routes/imageUploader.route.js";

dotenv.config();
const app = express();

let corsOptions = {
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(useragent.express());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/fileUploader", (req, res) => {
    res.status(200).send({message: "!!! NODEJS FILE UPLOADER PLAYGROUND API !!!"});
});

ImageUploader(app);

app.listen(process.env.PORT, () => {
    console.log(`App Running on: http://localhost:${process.env.PORT}`);
});