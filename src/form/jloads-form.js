// jloads-event.js
/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
jlogs('exist?', 'jloadsForm');
if (typeof jloadsForm !== 'function') jloadsForm = function (json, success, error, mapFunction) {
    const f = 'jloadsForm';


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
    jlogs(' jloadsForm', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    // jlogs('jloadsForm selectorEvent1 ', ' elem ', elem, !isEmpty(elem));
    jlogs('jloadsForm selectorEvent1 selector', selector);

    var jloads = new Load(selector, success, error);

    jlogs('jloadsForm Object.keys(json).length', Object.keys(json).length);

    if (Object.keys(json).length === 1) {

        var selector = Object.keys(json)[0];
        var event = json[selector];
        // loadUrlData(jloads, selector, event, mapFunction, success, error)
    } else {
        for (var selector in json) {
            var event = json[selector];
            // selectorEvent1(jloads, selector, event, mapFunction, success, error)
        }
    }
    // success(json);

    return jloads;
}


/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'loadUrlData');
if (typeof loadUrlData !== 'function') loadUrlData = function (jloads, object, mapFunction, success, error) {

    const f = 'jloadsForm loadUrlData';

    jlogs(f, ' isArray object, elem, mapFunction', object, isArray(object), mapFunction);

    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            jlogs(f, ' isArray', ' id ', id);
            url = object[id];
            jlogs(f, ' isArray', ' url ', url);

            if (typeof url === 'string') {
                try {
                    // base64 in url
                    if (url.length > 200) {
                        jloads['img'](url);
                    } else {
                        const funcName = getFunctionName(url, mapFunction);
                        jlogs(f, ' funcName ', funcName);
                        //jlogs(funcName, url, elem);
                        jloads[funcName](url);
                    }
                    success(url);
                } catch (e) {
                    //jlogs(f, ' ERROR elem ', elem);
                    jlogs(f, ' ERROR e ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    } else {
        jlogs(f, ' isArray ERROR object', object);
        error(object);
    }
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
jlogs('exist?', 'selectorEvent1');
if (typeof selectorEvent1 !== 'function') selectorEvent1 = function (jloads, selector, event, mapFunction, success, error) {
    const f = 'jloadsForm selectorEvent1';

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
    for (var i = 0; i < forms.length; i++) {

                var form = forms[i];
                //formEvent(forms[i], rest_form, error, success);
                form.addEventListener(self.cfg.event, function (event) {
                    event.preventDefault();

                    !RESTFORM_DEBUG || console.log(this);

                    var data = formToObject(this);
                    var method = data.method;

                    delete data.method;
                    delete data.submit;

                    !RESTFORM_DEBUG || console.log(method);

                    rest_form.byMethod(method, data);
                    !RESTFORM_DEBUG || console.log(data);

                    success(event);


                });
            }

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
        jlogs(f, ' selectorEvent1 ERROR e ', e);
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
// jlogs('exist?', 'addEvent');
// if (typeof eventResponse !== 'function') eventResponse = function (selector, event, response) {
//     const f = 'jloadsForm eventResponse';
//     jlogs(f, ' selector ', selector);
//     jlogs(f, ' event ', event);
//
//     var success = function (data) {
//         console.table('FORM success', data);
//     };
//     var error = function (data) {
//         console.error('!FORM', data);
//     }
//
//
//     var form = new RestForm(selector, response, error, success);
//
//     form.cfg({
//         "target": selector,
//         "url": "//api.paas.info/index.php",
//         "method": "GET",
//         "event": "submit"
//     });
//
//     form.url((window.location.hostname === 'localhost') ? "//localhost:8000/index.php" : "//php.jloads.com/index.php");
//
//     form.submit();
// }
