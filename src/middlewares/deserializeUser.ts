import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers.authorization || "").replace(/^Bearer\s/, "");

    console.log("Access", accessToken);

    if(!accessToken) {
        return next()
    }

    const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

    console.log("decoded", decoded);

    if(decoded) {
        res.locals.user = decoded;
    };
    return next();

}

export default deserializeUser;