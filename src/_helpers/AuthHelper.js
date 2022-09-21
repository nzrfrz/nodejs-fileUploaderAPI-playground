import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { 
    responseStatus, 
    responseMessage, 
    responseHelper 
} from "./ResponseHelper.js";

dotenv.config();

export const Authentication = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, responseStatus().errorRequest, responseMessage().errorAccess, {});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return responseHelper(res, responseStatus().errorRequest, responseMessage().errorTokenInvalid, {});
        req.user = user;
    });
    // console.log(token);
};