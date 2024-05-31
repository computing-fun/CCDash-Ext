// ==UserScript==
// @name         CCDash Ext
// @namespace    computingfun.org
// @version      0.1
// @description  ...
// @author       zachary@computingfun.org
// @match        https://dashboard.calclosets.com/*
// @updateURL    https://cdn.jsdelivr.net/gh/computing-fun/ccdash-ext@master/userscript.js
// @downloadURL  https://cdn.jsdelivr.net/gh/computing-fun/ccdash-ext@master/userscript.js
// ==/UserScript==

(function () {
    'use strict';
    ["job-titles", "times-hm-inputs", "labor-counter"].forEach((name) => {
        import("https://cdn.jsdelivr.net/gh/computing-fun/ccdash-ext@master/" + name + ".js");
    });
})();