// ready-html.js
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
jlogs('exist?', 'ReadyHtml');
if (typeof ReadyHtml !== 'function') ReadyHtml = function (url, selector, mapFunction, success, error) {
    var f = 'jloadsTarget ReadyHtml';

    jlogs(f, 'url:', url);
    jlogs(f, 'selector:', selector);
    // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector) || document.body;
    var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);

    console.log(f, ' elem ', elem);
    // jlogs(f, ' elem ', elem);

    var l = new Load({
        target: selector,
        success: success,
        error: error,
       // replace: 1,
    });

    if (!isEmpty(elem)) {
        // loadContentByUrls(jloads, object, mapFunction, success, error);
        var funcName = getFunctionName(url, mapFunction, 'ReadyHtml');
        jlogs(f, ' funcName ', funcName);
        //jlogs(funcName, url, elem);
        l[funcName](url);

        return success(elem);
    } else {
        waitFor(selector, 40, function (i) {
            // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
            var l = new Load({
                target: i,
                success: success,
                error: error,
                //replace: 1,
            });
            loadContentByUrls(l, url, mapFunction, success, error);
        });
        // error(elem);
    }
}
