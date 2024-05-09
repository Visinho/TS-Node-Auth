import { object } from 'zod';
import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(object: Object, keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey", options?: jwt.SignOptions | undefined) {
    // const signinKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");
    // console.log("signinkey",signinKey);

    return jwt.sign(object, config.get<string>(keyName), {
        // ...(options && options),
        ...options,
        algorithm: "HS256",
    });
}

export function verifyJwt<T>(token: string, keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey"): T | null {
    // const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");

    try {
        const decoded = jwt.verify(token, config.get<string>(keyName)) as T;
        console.log("Decoded", decoded);
        return decoded;
    } catch (e) {
        throw e;
    }
}

