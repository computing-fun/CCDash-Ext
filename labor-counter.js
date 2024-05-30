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

/**
 * @param {Element} box
 */
function forEachBox(box) {
    if (!box || !(box instanceof Element)) {
        return;
    }

    const header = box.querySelector('td');
    if (!header || !header.textContent || !header.textContent.includes('Service Appointments') || header.textContent.includes('-')) {
        return;
    }

    const tables = Array.from(box.querySelectorAll("tr")).slice(1);
    const installer_times = new Map();
    let total_diff = 0;

    tables.forEach((row) => {
        const items = row.getElementsByTagName('td');
        if (!items) {
            return;
        }

        const time_item = items[2];
        if (!time_item || !time_item.innerText) {
            return;
        }

        const installer_item = items[4];
        if (!installer_item || !installer_item.innerText) {
            return;
        }

        const local_diff = parseRangeIntoDifference(time_item.innerText);
        total_diff += local_diff;

        const installer = installer_item.innerText;
        const old_installer_diff = (installer_times.has(installer)) ? installer_times.get(installer) : 0;
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

    const fraJobMain = fraRightFrameDoc.getElementById("fraJobMain");
    if (!fraJobMain || !(fraJobMain instanceof HTMLIFrameElement)) {
        return;
    }

    const fraJobMainDoc = fraJobMain.contentDocument;
    if (!fraJobMainDoc) {
        return;
    }

    (fraJobMainDoc.querySelectorAll(".boxing-1")).forEach(forEachBox);
}, 3000);