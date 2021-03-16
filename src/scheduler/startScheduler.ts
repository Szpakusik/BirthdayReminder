import { UserModel } from "../database/users/users.model";
import { scheduleJob } from "node-schedule";
import { DateTime } from 'luxon';
import { send } from "./mailer";

const monthlyJob = () =>
// "0 11 */1 * *"
    scheduleJob("0 10 1 */1 *", async function() {
        const current:DateTime = DateTime.now()

        const result = await UserModel.find({ monthOfBirth: current.month });
        
        let content = `\nDeclared birthdays for ${current.setLocale("en").toFormat("MMMM")}: \n \n`

        result.forEach( (single) => {
            content+= `${single.firstName} ${single.lastName} (${single.email}) - ${single.dayOfBirth}-${single.monthOfBirth}-${current.year} \n`
        } )

        console.log(content);

        send(content, "szpakusik@gmail.com", "Test")

    });

const dailyJob = () =>
    scheduleJob("0 11 */1 * *", async function() {
        const current:DateTime = DateTime.now()

        let content = `Happy bithday from Collagen Colway UK!`;
        let subject = `It's your day!`

        const result = await UserModel.find({ 
            monthOfBirth: current.month,
            dayOfBirth: current.day
        });

        result.forEach( (single) => {
            send(content, single.email, subject);
        })

    });

const startSchedule = () => {
    dailyJob();
    monthlyJob();
}

export default startSchedule;
