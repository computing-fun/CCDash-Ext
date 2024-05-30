// ==UserScript==
// @name         CCDash Ext
// @namespace    computingfun.org
// @version      0.1
// @description  ...
// @author       zachary@computingfun.org
// @match        https://dashboard.calclosets.com/*
// @updateURL    https://raw.githubusercontent.com/computingfun-org/CCDash-Ext/main/userscript.js
// @downloadURL  https://raw.githubusercontent.com/computingfun-org/CCDash-Ext/main/userscript.js
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 
     * @param {string} url
     */
    function loadScript(url) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.head.appendChild(script);
    }

    loadScript("https://github.com/computingfun-org/CCDash-Ext/raw/main/job-titles.js");
    loadScript("https://github.com/computingfun-org/CCDash-Ext/raw/main/times-hm-inputs.js");
    loadScript("https://github.com/computingfun-org/CCDash-Ext/raw/main/labor-counter.js");

})();