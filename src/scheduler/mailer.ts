import nodemailer from "nodemailer";
import { UserModel } from "../database/users/users.model";

let transporter:any;

export const runMailer = async () => {
    
    const transport = {
        host: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
    };

    transporter = await nodemailer.createTransport(transport);

    transporter.verify((err: Error, success: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Server is ready to take messages");
        }
    });

}

export const send = (content: string, receiver: string, subject: string) => {
    const mail = {
        from: `Birthday Reminder`,
        to: receiver,
        subject: subject,
        text: content,
    };

    transporter.sendMail(mail, (err: Error, data: any) => {
        if (err) throw new Error("Message not send");

        if(receiver !== process.env.ADMIN_MAIL ) send(`Message was sent to ${receiver}`, <string>process.env.ADMIN_MAIL , "Message reminder")

        console.log("Message sent");
        return { message: "Send successfully " };
    });
};