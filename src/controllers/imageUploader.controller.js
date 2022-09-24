import streamifier from "streamifier";

import { 
    responseStatus,
    responseMessage,
    responseHelper 
} from "../_helpers/ResponseHelper.js";
import { googleDrive, setFilePermission } from "../_helpers/googleDriveHelper.js";

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/svg',
];

export const uploadImage = async (req, res) => {
    if (!whitelist.includes(req.file.mimetype)) {
        responseHelper(res, responseStatus().errorRequest, responseMessage().errorFileType, {});
    } 
    else if (req.file.size / 1024 / 1024 > 2) {
        responseHelper(res, responseStatus().errorRequest, responseMessage().errorFileSize, {});
    }
    else {
        try {
            const uploadResponse = await googleDrive.files.create({
                requestBody: {
                    name: req.file.originalname,
                    mimeType: req.file.mimetype
                },
                media: {
                    mimeType: req.file.mimetype,
                    body: streamifier.createReadStream(req.file.buffer)
                }
            });

            setFilePermission(uploadResponse.data.id);

            const generatePublicURL = await googleDrive.files.get({
                fileId: uploadResponse.data.id,
                fields: "*"
            });

            const returnResponse = {
                id: generatePublicURL.data.id,
                url: `http://drive.google.com/uc?export=view&id=${generatePublicURL.data.id}`
            }

            responseHelper(res, responseStatus().success, responseMessage().successUpload, returnResponse);
            // console.log(generatePublicURL.data);
        } catch (error) {
            // console.log(error);
            responseHelper(res, responseStatus().errorServer, responseMessage().errorServer, error.response.message);
        }
    }

    // responseHelper(res, responseStatus().success, responseMessage().successUpload, {});
};

export const deleteImage = async (req, res) => {
    try {
        const response = await googleDrive.files.delete({
            fileId: req.params.id
        });
        const clearTrash = await googleDrive.files.emptyTrash();
        responseHelper(res, responseStatus().success, responseMessage().successDelete, {});
        // console.log("SUCCESS DELETE IMAGE", response.data, response.status);
    } catch (error) {
        responseHelper(res, responseStatus().errorRequest, responseMessage().successDelete, {});
        // console.log("ERROR DELETE IMAGE", error.response.message);
    }

    // responseHelper(res, responseStatus().success, responseMessage().successUpload, {});
};