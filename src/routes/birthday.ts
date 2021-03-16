import { UserModel } from "../database/users/users.model";
import { Express } from "express";
import { IUserDocument } from "#root/database/users/users.types";

const setupRoutes = (app: Express) => {
    app.get("/birthdate", async (req, res, next) => {
        try {
            let birthdates: IUserDocument[] = await UserModel.find();
            let response: any[] = birthdates.map((birthdate: IUserDocument) => {
                return {
                    email: birthdate.email,
                    firstName: birthdate.firstName,
                    lastName: birthdate.lastName,
                    dayOfBirth: birthdate.dayOfBirth,
                    monthOfBirth: birthdate.monthOfBirth,
                };
            });

            return res.json(response);
        } catch (error) {
            next(error);
        }
    });

    app.post("/birthdate", async ({ body }, res, next) => {
        if (!body.email || !body.dayOfBirth || !body.monthOfBirth) {
            return next(new Error("Invalid body!"));
        }

        try {
            const alreadyExist = await UserModel.find({
                email: body.email,
            });

            if (alreadyExist.length) {
                res.json({ message: "Already have birthdate for this email" });
                return;
            }

            const birthdate = await UserModel.create({
                dayOfBirth: body.dayOfBirth,
                monthOfBirth: body.monthOfBirth,
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
            });

            return res.json(birthdate);
        } catch (error) {
            next(error);
        }
    });

    app.delete("/birthdate/:mail", async (req, res, next) => {
        if (!req.query.email) {
            return next(new Error("Invalid query!"));
        }
        try {
            const result = await UserModel.deleteMany({ email: <string>req.query.email});
            return res.json(result);
        } catch (error) {
            next(error);
        }
    });
};

export default setupRoutes;
