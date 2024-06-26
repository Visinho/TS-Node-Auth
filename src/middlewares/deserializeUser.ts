import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import config from "config";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers.authorization || "").replace(/^Bearer\s/, "");

    if(!accessToken) {
        return next()
    }

    const decoded = verifyJwt(accessToken, "accessTokenPrivateKey");

    if(decoded) {
        res.locals.user = decoded;
    };
    return next();

}

export default deserializeUser;