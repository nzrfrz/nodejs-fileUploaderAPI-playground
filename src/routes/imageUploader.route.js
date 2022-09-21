import express from "express";
import multer from "multer";
import path from "path";

import { uploadImage } from "../controllers/index.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export const ImageUploader = (app) => {
    const imageUpload = router.post("/image_upload", upload.single("image"), uploadImage);

    app.use("/playground", imageUpload);
};