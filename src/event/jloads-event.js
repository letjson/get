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
    var f = 'jloadsEvent';

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
    var jloads = new Load({
        target: selector,
        success: success,
        error: error,
        //replace: 1,
    });

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

