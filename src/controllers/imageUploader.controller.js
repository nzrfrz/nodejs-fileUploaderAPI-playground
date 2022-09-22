import * as fs from "fs";
import { 
    responseStatus,
    responseMessage,
    responseHelper 
} from "../_helpers/ResponseHelper.js";

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/svg',
];

export const uploadImage = async (req, res) => {
    if (!whitelist.includes(req.file.mimetype)) {
        fs.unlinkSync(req.file.path);
        responseHelper(res, responseStatus().errorRequest, responseMessage().errorFileType, {});
    } 
    else if (req.file.size / 1024 / 1024 > 2) {
        fs.unlinkSync(req.file.path);
        responseHelper(res, responseStatus().errorRequest, responseMessage().errorFileSize, {});
    }
    else {
        responseHelper(res, responseStatus().success, responseMessage().successUpload, {url: `${req.protocol}://${req.hostname}/${req.file.path}`});
    }
};