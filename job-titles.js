(function () {
    'use strict';
    const defaultTitle = "CC Dash";

    setInterval(function () {
        document.title = (() => {
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
        })();
    }, 1000);
})();