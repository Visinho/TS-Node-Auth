import { Request, Response } from "express";
import { CreateUserInput, ForgotPasswordInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserByEmail, findUserById } from "../services/user.service";
import sendEmail from "../utils/mailer";
import log from "../utils/logger";
import { v4 as uuidv4 } from "uuid";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body
    try {
        const user = await createUser(body);

        await sendEmail({
            from: "Elvisvisinho97@gmail.com",
            to: user.email,
            subject: "Please verify your account",
            text: `Verification code ${user.verificationCode}, Id: ${user._id}`
        });
        return res.send("User successfully Created")
    } catch (e: any) {
        if(e.code === 11000) {
            return res.status(409).send("Account already exists")
        }
        return res.status(500).send(e);
    }    
}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode

    //Find user by Id
    const user = await findUserById(id);

    if(!user) {
        return res.send("User not found!")
    }

    //Check to see if they are already verified
    if(user.verified) {
        return res.send("User is already verified!")
    }

    //Check to see if the verificationCode matches
    if(user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.send("User successfully verified");
    }
        return res.send("Could not verify user!")

    
}

export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {

    const message = "If a user with that email is registered, you will receive a password reset email!";

    const { email } = req.body;

    const user = await findUserByEmail(email);

    if(!user) {
        log.debug(`User with email ${email} does not exist!`)
        return res.send(message);
    }

    if(!user.verified) {
        return res.send("User is not verified!");
    }

    const passwordResetCode = uuidv4();

    user.passwordResetCode = passwordResetCode;

    await user.save();

    await sendEmail({
        to: user.email,
        from: "Elvisvisinho97@gmail.com",
        subject: "Reset your Password",
        text: `Password reset code: ${passwordResetCode}, Id: ${user._id}`,
    });

    log.debug(`Password reset email sent to ${email}`);

    return res.send(message);
}