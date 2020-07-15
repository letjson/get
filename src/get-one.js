// get-one.js
/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'getOne');
if (typeof getOne !== 'function') getOne = function (jloads, object, i, mapFunction, success, error) {
    const f = 'jloadsTarget getOne';

    jlogs(f, ' jloads.getTarget() ', jloads.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (i === 'head' || !isEmpty(jloads.getTarget())) {
    jlogs(f, ' object i ', object, i);
    if (i === 'head') {
        loadContentByUrls(jloads, object, mapFunction, success, error);
        success(jloads.getTarget());
    } else if (i === 'body') {
        jlogs(f, ' wait for body i ', i);
        jlogs(f, ' wait for body target ', jloads.getTarget());
        document.addEventListener("DOMContentLoaded", function () {
            ReadyHtml(object, i, mapFunction, success, error);
        });
    } else {
        jlogs(f, ' wait for element i ', i);
        jlogs(f, ' wait for element target ', jloads.getTarget());

        try {
            // set up the mutation observer
            var observer = new MutationObserver(function (mutations, me) {
                // `mutations` is an array of mutations that occurred
                // `me` is the MutationObserver instance
                // var canvas = document.getElementById('my-canvas');
                var canvas = document.querySelectorAll(i)[0] || document.querySelectorAll(i)
                if (canvas) {
                    // callback executed when canvas was found
                    ReadyHtml(object, i, mapFunction, success, error);
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
    // error(elem);
}
