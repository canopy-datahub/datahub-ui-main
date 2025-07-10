import moment from 'moment';

function getLastWeek() {
    return getWeekRange(moment().day(-7));
}
function getWeekDays(weekStart) {
    const days = [weekStart];
    for (let i = 1; i < 7; i += 1) {
        days.push(moment(weekStart).add(i, 'days').toDate());
    }
    return days;
}

function getWeekRange(date) {
    return {
        from: moment(date).startOf('week').toDate(),
        to: moment(date).endOf('week').toDate(),
    };
}

export { getLastWeek, getWeekDays, getWeekRange };
