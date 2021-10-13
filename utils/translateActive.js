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

function translateActive(trade, API) {
    const active = setActive(trade);
    const direction = setDirection(trade);
    const duration = setDuration(trade);
    const { hour, minutes } = setTime(trade);

    return {
        active,
        direction,
        duration,
        time: {
            hour,
            minutes
        }
    }
}

module.exports = translateActive;