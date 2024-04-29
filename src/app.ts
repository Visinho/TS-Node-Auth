require("dotenv").config();
import express from "express";
import config from "config";
import connectToDB from "./utils/connectToDB";

const app = express();

const port = config.get("port");

app.listen(port, () => {
    console.log(`App is running on http://localhost/${port}`);

    connectToDB();
})