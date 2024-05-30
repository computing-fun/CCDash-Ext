'use strict';

/**
 * 
 * @returns 
 */
function numberInput() {
    const input = document.createElement('span');
    input.setAttribute('contenteditable', 'true');
    input.style.width = '30px';
    input.style.height = '100%';
    input.style.display = 'inline-block';
    input.style.border = 'solid 1px lightgray';
    input.style.marginLeft = '5px';
    input.style.marginRight = '5px';
    return input;
}

setInterval(() => {
    const fraRightFrame = document.getElementById('fraRightFrame');
    if (!fraRightFrame || !(fraRightFrame instanceof HTMLIFrameElement)) {
        return;
    }

    const fraRightFrameDoc = fraRightFrame.contentDocument;
    if (!fraRightFrameDoc) {
        return;
    }

    (fraRightFrameDoc.querySelectorAll('select.cap-tron')).forEach((defaultInput) => {
        if (defaultInput.getAttribute('hm-input')) {
            return;
        }

        const parent = defaultInput.parentElement;
        if (!parent) {
            return;
        }

        const hoursInput = numberInput();
        const minutesInput = numberInput();

        hoursInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                minutesInput.focus();
            }
        });

        minutesInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const hours = Number(hoursInput.innerText.trim());
                const minutes = Number(minutesInput.innerText.trim());
                if (isNaN(hours) || isNaN(minutes)) {
                    return;
                }
                if (hours < 0) {
                    defaultInput.value = (hours * 60) - minutes;
                } else {
                    defaultInput.value = (hours * 60) + minutes;
                }
            }
        });

        defaultInput.setAttribute('hm-input', true);
        parent.appendChild(hoursInput);
        parent.appendChild(minutesInput);
    });
}, 5000);