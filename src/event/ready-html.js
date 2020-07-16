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
if (typeof ReadyHtml !== 'function') ReadyHtml = function (object, i, mapFunction, success, error) {
    const f = 'jloadsTarget ReadyHtml';

    jlogs(f, ' i ', i);
    var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    // jlogs(f, ' elem ', elem);

    var jloads = new Load(i, success, error);

    if (!isEmpty(elem)) {
        loadContentByUrls(jloads, object, mapFunction, success, error);
        success(elem);
    } else {
        waitFor(i, 40, function (i) {
            // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
            var jloads = new Load(i, success, error);
            loadContentByUrls(jloads, object, mapFunction, success, error);
        });
        // error(elem);
    }
}
