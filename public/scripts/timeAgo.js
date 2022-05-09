
const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");


function showTime (date) {
    let time = timeAgo.format(new Date()-date);
    return time;
}
