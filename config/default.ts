import dotenv from "dotenv";

dotenv.config();


export default {
    port: 3000,
    dbUri: process.env.MONGO_URI,
    logLevel: "info",
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
    smtp: {
        user: 'ounup4zotlulfbup@ethereal.email',
        pass: 'PMepRpUK8C6UfESJxp',
        host: "smtp.ethereal.email",
        port: 587,
        secuure: false
    }
};