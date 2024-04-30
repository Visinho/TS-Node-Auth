require("dotenv").config();
import express from "express";
import config from "config";
import connectToDB from "./utils/connectToDB";
import log from "./utils/logger";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);


const port = config.get("port");

app.listen(port, () => {
    console.log(`App is running on http://localhost/${port}`);

    connectToDB();
})