import datejs from 'datejs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import subscription from '../models/subscription.model.js';

const REMINDERS = [7, 5, 2, 1]; // days before renewal to send reminders
export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    // Logic to send reminder for the given subscriptionId
    const subscription = await fetchSubscription(context, subscriptionId);
    if (!subscription || subscription.status !== 'active') return;
    const renewalDate = datejs(subscription.renewalDate);

    if (renewalDate.isBefore(datejs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`)
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(datejs())) {
            await sleepUntilReminder(context, `reminder_${daysBefore} days_before`, reminderDate);
        }
        await triggerReminder(context, `reminder_${daysBefore} days_before`);

    }

});


const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return subscription.findById(subscriptionId).populate('user', 'name email');
    });
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntilReminder(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // send email,sms, push notification logic here
    })
}