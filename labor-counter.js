'use strict';

/**
 * 
 * @param {string} str 
 * @returns 
 */
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

/**
 * 
 * @param {string} str 
 * @returns 
 */
function parseRange(str) {
    const [startTime, endTime] = str.split(' - ');
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    return { start, end };
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
function parseRangeIntoDifference(str) {
    const range = parseRange(str);
    return range.end - range.start;
}

/**
 * 
 * @param {number} millisecounds 
 * @returns 
 */
function differenceToHoursMinutes(millisecounds) {
    const differenceInMinutes = millisecounds / 1000 / 60;
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;
    return { hours, minutes };
}

/**
 * 
 * @param {number} hours 
 * @param {number} minutes 
 * @returns 
 */
function hoursMinutesFormated(hours, minutes) {
    return `${hours}h ${minutes}m`;
}

/**
 * 
 * @param {number} millisecounds 
 * @returns 
 */
function differenceToHoursMinutesFormated(millisecounds) {
    const hm = differenceToHoursMinutes(millisecounds);
    return hoursMinutesFormated(hm.hours, hm.minutes);
}

setInterval(() => {
    const fraRightFrame = document.getElementById("fraRightFrame");
    if (!fraRightFrame || !(fraRightFrame instanceof HTMLIFrameElement)) {
        return;
    }

    const fraRightFrameDoc = fraRightFrame.contentDocument;
    if (!fraRightFrameDoc) {
        return;
    }

    /**
     * @type {HTMLFrameElement}
     */
    const fraJobMain = fraRightFrameDoc.getElementById("fraJobMain");
    if (!fraJobMain) {
        return;
    }

    const fraJobMainDoc = fraJobMain.contentDocument;
    if (!fraJobMainDoc) {
        return;
    }

    (fraJobMainDoc.querySelectorAll(".boxing-1")).forEach((box) => {
        const header = box.querySelector('td');
        if (!header || !header.textContent || !header.textContent.includes('Service Appointments') || header.textContent.includes('-')) {
            return;
        }

        const tables = Array.from(box.querySelectorAll("tr")).slice(1);

        /**
         * @type {Map<string, number>}
         */
        const installer_times = new Map();
        let total_diff = 0;

        tables.forEach((row) => {
            const items = row.getElementsByTagName('td');

            const time_item = items[2];
            const installer_item = items[4];
            if (!time_item || !installer_item) {
                return;
            }

            const local_diff = parseRangeIntoDifference(time_item.innerText);
            total_diff += local_diff;

            const installer = installer_item.innerText;
            const old_installer_diff = installer_times.get(installer) ?? 0;
            installer_times.set(installer, old_installer_diff + local_diff);
        });

        let alertDisplay = '';
        for (const [installer, time] of installer_times) {
            alertDisplay += installer + '\t - \t' + differenceToHoursMinutesFormated(time) + '\n\n';
        }

        const info_btn = document.createElement('span');
        info_btn.innerText = differenceToHoursMinutesFormated(total_diff);
        info_btn.onclick = () => {
            alert(alertDisplay);
        };

        header.textContent += " - ";
        header.appendChild(info_btn);
    });
}, 3000);