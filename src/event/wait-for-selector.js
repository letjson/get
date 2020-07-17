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
    var f = 'jloadsTarget waitForSelector';

    if (isEmpty(url) || url.length < 2) {
        throw new Error('url not exits');
    }

    if (isEmpty(selector) || selector.length < 2) {
        throw new Error('map not exits');
    }

    try {
        jlogs(f, ' url: ', url);
        jlogs(f, ' selector: ', selector);
        // set up the mutation observer
        var observer = new MutationObserver(function (mutations, me) {
            // `mutations` is an array of mutations that occurred
            // `me` is the MutationObserver instance
            var l = new Load(selector, success, error);

            // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
            // if (elem) {
                // callback executed when canvas was found

                // loadContentByUrls(jloads, object, mapFunction, success, error);
                var funcName = getFunctionName(url, mapFunction, f);
                jlogs(f, ' funcName ', funcName);
                //jlogs(funcName, url, elem);
                l[funcName](url);


                me.disconnect(); // stop observing
                // return;
                return success(elem);

            // }

            // setTimeout(function () {
            //         jlogs(f, ' stop observing ', url);
            //         me.disconnect(); // stop observing
            //     },
            //     2000
            // )

        });

        // start observing
        observer.observe(document, {
            childList: true,
            subtree: false
        });

    } catch (e) {
        //jlogs(f, ' ERROR elem ', elem);
        jlogs(f, ' getOne ERROR e ', e);
        error(e);
    }
}
