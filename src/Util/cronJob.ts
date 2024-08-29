const cron = require('node-cron');
import Application from '../Models/applicationModel'; // Make sure the path is correct

cron.schedule('* * * * *', async () => {

    const application = await Application.find();
    application.forEach(async (app: any) => {
        const timeout = app.timer.getTime() - new Date().getTime();
        if (app.status === 'Accepted' && timeout < 0) {
            app.status = 'Not Submitted'
            await app.save();
        }
    })
});