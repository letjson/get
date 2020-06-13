// get-target.js
jlogs('exist?', 'getTarget');

/**
 *
 * @param selector
 * @returns {HTMLHeadElement}
 */
function onSelector(selector, callback) {
    const f = 'target';

    jlogs(f, 'selector', selector);

    if(selector === 'string'){
        var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector) || document.getElementsByTagName('head')[0] || document.body;
        jlogs(f, ' elem ', elem);

        if (!isEmpty(elem)) {
            return callback(selector);
        } else {
            // if (i === 'head') {
            //     loadContentByUrls(jloads, object, mapFunction, success, error);
            //     success(jloads.getTarget());
            // } else if (i === 'body') {
            //     jlogs(f, ' wait for body i ', i);
            //     jlogs(f, ' wait for body target ', jloads.getTarget());
            //     document.addEventListener("DOMContentLoaded", function () {
            //         ReadyHtml(object, i, mapFunction, success, error);
            //     });
            // } else {
            //     jlogs(f, ' wait for element i ', i);
            //     jlogs(f, ' wait for element target ', jloads.getTarget());
            //
            //     try {
            //         // set up the mutation observer
            //         var observer = new MutationObserver(function (mutations, me) {
            //             // `mutations` is an array of mutations that occurred
            //             // `me` is the MutationObserver instance
            //             // var canvas = document.getElementById('my-canvas');
            //             var canvas = document.querySelectorAll(i)[0] || document.querySelectorAll(i)
            //             if (canvas) {
            //                 // callback executed when canvas was found
            //                 ReadyHtml(object, i, mapFunction, success, error);
            //                 me.disconnect(); // stop observing
            //                 return;
            //             }
            //         });
            //
            //         // start observing
            //         observer.observe(document, {
            //             childList: true,
            //             subtree: true
            //         });
            //
            //     } catch (e) {
            //         //jlogs(f, ' ERROR elem ', elem);
            //         jlogs(f, ' getOne ERROR e ', e);
            //         error(e);
            //     }
            // }
            waitFor(selector, 40, function (i) {
                // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
                jlogs(f, 'elem delay', elem);
                return callback(selector);
            });
            // error(elem);
        }

    }
    if (!isEmpty(selector)) {
        jlogs(f, 'elem now', elem);
        return callback(selector);
    }
    jlogs(f, 'elem NOT', elem);

}
