import dotenv from "dotenv";

dotenv.config();


export default {
    port: 3000,
    dbUri: process.env.MONGO_URI,
    logLevel: "info",
    smtp: {
        user: 'ounup4zotlulfbup@ethereal.email',
        pass: 'PMepRpUK8C6UfESJxp',
        host: "smtp.ethereal.email",
        port: 587,
        secuure: false
    }
};