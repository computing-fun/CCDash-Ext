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

(function () {
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

    function differenceToHoursMinutes(millisecounds) {
        const differenceInMinutes = millisecounds / 1000 / 60;
        const hours = Math.floor(differenceInMinutes / 60);
        const minutes = differenceInMinutes % 60;
        return { hours, minutes };
    }

    function hoursMinutesFormated(hours, minutes) {
        return `${hours}h ${minutes}m`;
    }

    function differenceToHoursMinutesFormated(millisecounds) {
        const hm = differenceToHoursMinutes(millisecounds);
        return hoursMinutesFormated(hm.hours, hm.minutes);
    }

    setInterval(() => {
        const fraRightFrame = document.getElementById("fraRightFrame");
        if (!fraRightFrame) {
            return;
        }

        const fraRightFrameDoc = fraRightFrame.contentDocument;
        if (!fraRightFrameDoc) {
            return;
        }

        const fraJobMain = fraRightFrameDoc.getElementById("fraJobMain");
        if (!fraJobMain) {
            return;
        }

        const fraJobMainDoc = fraJobMain.contentDocument;
        if (!fraJobMainDoc) {
            return;
        }

        const boxes = fraJobMainDoc.querySelectorAll(".boxing-1");
        if (!boxes) {
            return;
        }

        boxes.forEach((box) => {
            const header = box.querySelector('td');
            if (header && header.textContent && header.textContent.includes('Service Appointments') && !header.textContent.includes('-')) {
                const tables = Array.from(box.querySelectorAll("tr")).slice(1);
                if (!tables) {
                    return;
                }

                let total_diff = 0;
                tables.forEach((row) => {
                    const items = row.getElementsByTagName('td');
                    if (!items) {
                        return;
                    }

                    const time_item = items[2];
                    if (!time_item && !time_item.innerText) {
                        return;
                    }

                    const range = time_item.innerText;
                    const local_diff = parseRangeIntoDifference(range);
                    time_item.innerText += "\n" + differenceToHoursMinutesFormated(local_diff);
                    total_diff += local_diff;
                });
                header.textContent += " - " + differenceToHoursMinutesFormated(total_diff);
            }
        });
    }, 3000);
})();
