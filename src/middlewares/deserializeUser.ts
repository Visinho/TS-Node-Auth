import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import config from "config";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers.authorization || "").replace(/^Bearer\s/, "");

    console.log("Access Token", accessToken);

    if(!accessToken) {
        return next()
    }

    const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

    console.log("decoded token", decoded);

    if(decoded) {
        res.locals.user = decoded;
    };
    return next();

}

export default deserializeUser;