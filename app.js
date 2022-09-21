import cors from "cors";
import express from "express";
import useragent from "express-useragent";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from 'url';

import { ImageUploader } from "./src/routes/imageUploader.route.js";

// const date = new Date();
// console.log(Date.now());

dotenv.config();
const app = express();

let corsOptions = {
    optionsSuccessStatus: 200,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log('directory-name 👉️', path.join(__dirname, '/public/images'));
// console.log('directory-name 👉️', path);

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