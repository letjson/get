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
        jlogs(f, ' url: ', url);
        jlogs(f, ' selector: ', selector);
        // set up the mutation observer
        var observer = new MutationObserver(function (mutations, me) {
            // `mutations` is an array of mutations that occurred
            // `me` is the MutationObserver instance
            // var canvas = document.getElementById('my-canvas');
            var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector)
            if (elem) {
                // callback executed when canvas was found
                // ReadyHtml(url, selector, mapFunction, success, error);
                var l = new Load(selector, success, error);

                // loadContentByUrls(jloads, object, mapFunction, success, error);
                const funcName = getFunctionName(url, mapFunction);
                jlogs(f, ' funcName ', funcName);
                //jlogs(funcName, url, elem);
                l[funcName](url);


                me.disconnect(); // stop observing
                // return;
                return success(elem);

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
