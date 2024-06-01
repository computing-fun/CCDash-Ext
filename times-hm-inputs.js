(function () {
    'use strict';
    const TAG = 'hm-input';
    const minutesToHours = 60;

    setInterval(() => {
        const fraRightFrame = document.getElementById('fraRightFrame');
        if (!fraRightFrame || !(fraRightFrame instanceof HTMLIFrameElement)) {
            return;
        }

        const fraRightFrameDoc = fraRightFrame.contentDocument;
        if (!fraRightFrameDoc) {
            return;
        }

        const defaultInputs = fraRightFrameDoc.querySelectorAll('select.cap-tron');
        defaultInputs.forEach((defaultInput) => {
            if (defaultInput.getAttribute(TAG)) {
                return;
            }

            const parent = defaultInput.parentElement;
            if (!parent) {
                return;
            }

            const input = document.createElement('span');
            input.setAttribute('contenteditable', 'true');
            input.style.width = '50px';
            input.style.height = '100%';
            input.style.display = 'inline-block';
            input.style.border = 'solid 1px lightgray';
            input.style.marginLeft = '5px';
            input.style.marginRight = '5px';

            input.addEventListener('keypress', (event) => {
                input.style.backgroundColor = '';
                if (event.key === 'Enter') {
                    event.preventDefault();
                    const inputBuffers = input.innerText.split(' ');

                    defaultInput.value = function () {
                        switch (inputBuffers.length) {
                            case 0:
                                return 0;
                            case 1:
                                return Number(inputBuffers[0]);
                            case 2:
                                // if either number is NaN this will return NaN so we don't need to check for NaN.
                                const hours = Number(inputBuffers[0]);
                                const minutes = Number(inputBuffers[1]);
                                if (hours < 0) {
                                    return (hours * minutesToHours) - minutes;
                                }
                                return (hours * minutesToHours) + minutes;
                            default:
                                return NaN;
                        }
                    }();

                    if (!defaultInput.value) {
                        input.style.backgroundColor = 'red';
                    }
                }
            });

            defaultInput.setAttribute(TAG, true);
            parent.appendChild(input);
        });
    }, 1000);
})();