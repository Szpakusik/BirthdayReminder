import { CoworkerModel } from "../database/coworkers/coworkers.model";
import { Express } from "express";
import { ICoworkerDocument } from "../database/coworkers/coworkers.types";

const setupCoworkersRoute = (app: Express) => {
    app.get("/coupon", async (req, res, next) => {
        try {
            
            let result: ICoworkerDocument[] = await CoworkerModel.find();

            return res.json(result);
        } catch (error) {
            next(error);
        }
    });

    app.post("/coupon", async ({ body }, res, next) => {
        if (!body.email || !body.prefix) {
            return next(new Error("Invalid body!"));
        }

        try {
            const alreadyExist = await CoworkerModel.find({
                prefix: body.prefix,
            });

            if (alreadyExist.length) {
                res.json({ message: "Already have this prefix" });
                return;
            }

            const coupon = await CoworkerModel.create({
                email: body.email,
                prefix: body.prefix,
            });

            return res.json(coupon);
        } catch (error) {
            next(error);
        }
    });
}

export default setupCoworkersRoute;