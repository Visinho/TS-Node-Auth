import { Request, Response } from "express";
import { CreateSessionInput } from "../schema/auth.schema";
import { findUserByEmail, findUserById } from "../services/user.service";
import { findSessionById, signAccessToken, signRefreshToken } from "../services/auth.service";
import { verifyJwt } from "../utils/jwt";

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const message = "Invalid email or password!"
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if(!user) {
        return res.send(message);
    }

    if(!user.verified) {
        return res.send("Please verify your email!")
    }

    const isValid = await user.validatePassword(password)

    if(!isValid) {
        return res.send(message)
    }

    // Sign access token
    const accessToken =signAccessToken(user);

    // Sign refresh token
    const refreshToken = await signRefreshToken({userId: user.id});

    // Send the tokens
    return res.send({accessToken, refreshToken});
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {

    const refreshToken = req.headers["x-refresh"] as string;

    if (!refreshToken) {
        return res.status(401).send("Refresh token is missing");
    }

    const decoded = verifyJwt<{session: string}>(refreshToken, "refreshTokenPrivateKey");

    if(!decoded) {
        return res.status(401).send("Could not refresh access token");
    }

    const session = await findSessionById(decoded.session);

    if(!session || !session.valid) {
        return res.status(401).send("Could not refresh access token");
    }

    const user = await findUserById(String(session.user));

    if(!user) {
        return res.status(401).send("Could not refresh access token");

    }

    const accessToken = signAccessToken(user)

    return res.send({ accessToken })
}