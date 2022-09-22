import express from "express";
import multer from "multer";
import path from "path";

import { v4 as uuidv4 } from 'uuid';

import { uploadImage } from "../controllers/imageUploader.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

export const ImageUploader = (app) => {
    const imageUpload = router.post("/image/upload", upload.single("file"), uploadImage);

    app.use("/fileUploader", imageUpload);
};