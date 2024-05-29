// ==UserScript==
// @name         CCDash Times HM Inputs
// @namespace    computingfun.org
// @version      2024-05-24
// @description  An update in the input for times.
// @author       zachary@computingfun.org
// @match        https://dashboard.calclosets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=calclosets.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function numberInput() {
        const input = document.createElement('span');
        input.setAttribute('contenteditable', true);
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
        if (!fraRightFrame) {
            return;
        }
        const fraRightFrameDoc = fraRightFrame.contentDocument;
        if (!fraRightFrameDoc) {
            return;
        }
        const inputs = fraRightFrameDoc.querySelectorAll('select.cap-tron');
        if (!inputs) {
            return;
        }
        inputs.forEach((defaultInput) => {
            if (!defaultInput || defaultInput.getAttribute('hm-input')) {
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
})();
