export const responseStatus = () => {
    return {
        success: 200,
        errorServer: 500,
        errorRequest: 400,
    }
};

export const responseMessage = () => {
    return {
        errorServer: "Something went wrong, please try again later !!",
        errorFileType: "File type does not supported, please choose either .png, .jpeg, .jpg, .webp, or .svg",
        errorFileSize: "File too large, only max 2MB allowed",
        successUpload: "File successfully uploaded",
    }
};

export const responseHelper = (res, status, message, data) => {
    return res.status(status).send({ status, message, data });
};