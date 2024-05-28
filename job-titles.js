// ==UserScript==
// @name         CCDash Job Titles
// @namespace    computingfun.org
// @version      2023-12-23
// @description  update CC Dashboard titles to show job names
// @author       zachary@computingfun.org
// @match        https://dashboard.calclosets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=calclosets.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const defaultTitle = "CC Dash";

    const getTitle = function(){
        let frame = document.getElementById('fraRightFrame');
        if (!frame) {
            return defaultTitle;
        }

        frame = frame.contentDocument;
        if (!frame) {
            return defaultTitle;
        }

        try {
            const name = frame.querySelector('.tab-title').innerText;
            if (name) {
                return name;
            }
        }
        catch {
        }

        let innerFrame = frame.querySelector('frame');
        if (!innerFrame) {
            innerFrame = frame.querySelector('iframe');
            if (!innerFrame) {
                return defaultTitle;
            }
        }

        innerFrame = innerFrame.contentDocument;
        if (!innerFrame) {
            return defaultTitle;
        }

        try {
            const name = innerFrame.querySelector('.tab-title').innerText;
            if (name) {
                return name;
            }
        }
        catch {
        }

        try {
            const name = innerFrame.querySelector('.tab-title div').innerText;
            if (name) {
                return name;
            }
        }
        catch {
        }

        return defaultTitle;
    };

    setInterval(function(){
        document.title = getTitle();
    }, 3000);
})();
