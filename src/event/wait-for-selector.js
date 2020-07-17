// wait-for-selector.js

/**
 *
 * @param url
 * @param selector
 * @param mapFunction
 * @param success
 * @param error
 */
function waitForSelector(url, selector, mapFunction, success, error) {
    const f = 'jloadsTarget waitForSelector';

    try {
        // set up the mutation observer
        var observer = new MutationObserver(function (mutations, me) {
            // `mutations` is an array of mutations that occurred
            // `me` is the MutationObserver instance
            // var canvas = document.getElementById('my-canvas');
            var canvas = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector)
            if (canvas) {
                // callback executed when canvas was found
                ReadyHtml(url, selector, mapFunction, success, error);
                me.disconnect(); // stop observing
                return;
            }
        });

        // start observing
        observer.observe(document, {
            childList: true,
            subtree: true
        });

    } catch (e) {
        //jlogs(f, ' ERROR elem ', elem);
        jlogs(f, ' getOne ERROR e ', e);
        error(e);
    }
}
