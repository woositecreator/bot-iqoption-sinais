function setTime(re) {
    const time = re.split(';')[0].split(':');

    return {
        hour: time[0],
        minutes: time[1]
    };
}

function setActive(re) {
    const active = re.split(';')[1].split('/').join('');
    return active;
}
    
function setDirection(re) {
    const direction = re.split(';')[2];
    return direction;
}

function setDuration(re) {
    const duration = re.split(';')[3];
    return Number(duration);
}

async function createOperation(trade, API) {
    const active = setActive(trade);
    const direction = setDirection(trade);
    const duration = setDuration(trade);
    const { hour, minutes } = setTime(trade);

    const job = schedule.scheduleJob({ hour: hour, minute: minutes }, async function() {
        console.log('\nTRADE STARTED');
        await operate(API, active, direction, duration);
        this.cancel();
    });
}

function resetOperations() {
    Object.keys(schedule.scheduledJobs).forEach((key) => {
        schedule.scheduledJobs[key].cancel();
    });

}

//createOperation('11:50;USD/EUR;PUT;2');
module.exports = { createOperation , resetOperations };
//createOperation('10:40;EUR/JPY;PUT;2');
const { operate } = require('./trade');
const schedule = require('node-schedule');
