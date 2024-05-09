import { object } from 'zod';
import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(object: Object, keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey", options?: jwt.SignOptions | undefined) {

    return jwt.sign(object, config.get<string>(keyName), {
        ...options,
        algorithm: "HS256",
    });
}

export function verifyJwt<T>(token: string, keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey"): T | null {

    try {
        const decoded = jwt.verify(token, config.get<string>(keyName)) as T;
        return decoded;
    } catch (e) {
        throw e;
    }
}

