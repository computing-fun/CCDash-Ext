// ==UserScript==
// @name         CCDash Labor Counter
// @namespace    computingfun.org
// @version      2024-05-24
// @description  Adds a total labor counter to the job's page.
// @author       zachary@computingfun.org
// @match        https://dashboard.calclosets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=calclosets.com
// @grant        none
// ==/UserScript==

'use strict';

function parseTime(str) {
    const [time, period] = str.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === "PM" && hours !== 12) {
        hours += 12;
    } else if (period === "AM" && hours === 12) {
        hours = 0;
    }

    return new Date().setHours(hours, minutes, 0, 0);
}

function parseRange(str) {
    const [startTime, endTime] = str.split(' - ');
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    return { start, end };
}

function parseRangeIntoDifference(str) {
    const range = parseRange(str);
    return range.end - range.start;
}

function parseRangesIntoDifference(strArray) {
    const diffs = strArray.map(parseRangeIntoDifference);
    return diffs.reduce((total, diff) => {
        return total + diff;
    }, 0);
}

function differenceToHoursMinutes(millisecounds) {
    const differenceInMinutes = millisecounds / 1000 / 60;
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;
    return { hours, minutes };
}

function parseRangesToHourMinutesDifference(strArray) {
    const diff = parseRangesIntoDifference(strArray);
    return differenceToHoursMinutes(diff);
}

function parseRangesToHourMinutesDifferenceFormated(strArray) {
    const hm = parseRangesToHourMinutesDifference(strArray);
    return `${hm.hours}h ${hm.minutes}m`;
}

function ccdashlabortest (timeStr) {
    return parseRangesToHourMinutesDifferenceFormated(timeStr);
}

window.ccdashlabortest = ccdashlabortest;
