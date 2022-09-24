import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    REDIRECT_URI
});

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

export const googleDrive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

export const setFilePermission = async (id) => {
    await googleDrive.permissions.create({
        fileId: id,
        requestBody: {
            role: "reader",
            type: "anyone"
        }
    });
};