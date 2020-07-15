// selector-event.js


/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'selectorEvent');
if (typeof selectorEvent !== 'function') selectorEvent = function (jloads, selector, event, mapFunction, success, error) {
    const f = 'jloadsEvent selectorEvent';

    jlogs(f, ' event ', event);
    jlogs(f, ' selector ', selector);

    document.addEventListener("DOMContentLoaded", function () {
        jlogs(f, ' addEventListener eventResponse');

        eventResponse(selector, event, function (xhr) {
            console.log("xhr", xhr);
            AddMessage(xhr.status);
            AddMessage(xhr.statusText);
            AddMessage(xhr.response);
        });
    });
    /*
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
            jlogs(f, ' canvas ', canvas);

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
        jlogs(f, ' selectorEvent ERROR e ', e);
        error(e);
    }
}
*/
    // error(elem);
}


