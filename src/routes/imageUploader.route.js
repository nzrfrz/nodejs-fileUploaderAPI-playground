import express from "express";
import multer from "multer";
import path from "path";

import { uploadImage, deleteImage } from "../controllers/imageUploader.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({storage: storage});

export const ImageUploader = (app) => {
    const imageUpload = router.post("/image/upload", upload.single("file"), uploadImage);
    const imageDelete = router.delete("/image/delete=:id", deleteImage);

    app.use("/fileUploader", imageUpload);
    app.use("/fileUploader", imageDelete);
};