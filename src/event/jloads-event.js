// jloads-event.js
/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
jlogs('exist?', 'jloadsEvent');
if (typeof jloadsEvent !== 'function') jloadsEvent = function (json, success, error, mapFunction) {
    const f = 'jloadsEvent';

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
    }

    if (typeof error !== 'function' && (typeof error !== 'object' || error === null)) {
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }

    if (typeof mapFunction !== 'object' && typeof map === 'object') {
        // Configuration
        mapFunction = map;
    }
    jlogs(' jloadsEvent', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    // jlogs('jloadsEvent selectorEvent ', ' elem ', elem, !isEmpty(elem));
    jlogs('jloadsEvent selectorEvent selector', selector);
    var jloads = new Load(selector, success, error);

    if (Object.keys(json).length === 1) {
        var selector = Object.keys(json)[0];
        var event = json[selector];
        selectorEvent(jloads, selector, event, mapFunction, success, error)
    } else {
        for (var selector in json) {
            var event = json[selector];
            selectorEvent(jloads, selector, event, mapFunction, success, error)
        }
    }
    // success(json);

    return jloads;
}



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


/**
 *
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 * @constructor
 */
jlogs('exist?', 'addEvent');
if (typeof eventResponse !== 'function') eventResponse = function (selector, event, response) {
    const f = 'jloadsEvent eventResponse';
    jlogs(f, ' selector ', selector);
    jlogs(f, ' event ', event);

    var success = function (data) {
        console.table('FORM success', data);
    };
    var error = function (data) {
        console.error('!FORM', data);
    }


    var form = new RestForm(selector, response, error, success);

    form.cfg({
        "target": selector,
        "url": "//api.paas.info/index.php",
        "method": "GET",
        "event": "submit"
    });

    form.url((window.location.hostname === 'localhost') ? "//localhost:8000/index.php" : "//php.jloads.com/index.php");

    form.submit();
}
