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
if (typeof getOne !== 'function') getOne = function (jloads, url, selector, mapFunction, success, error) {
    const f = 'jloadsTarget getOne';

    jlogs(f, ' jloads.getTarget() ', jloads.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (selector === 'head' || !isEmpty(jloads.getTarget())) {
    jlogs(f, ' selector ', selector);
    jlogs(f, ' url 1', url, typeof url, isString(url), Object.keys(url).length);

    if (isArray(url) && Object.keys(url).length === 1) {
        url = url[0];
    }

    jlogs(f, ' url 2 ', url, typeof url, isString(url));

    if (isString(url)) {
        if (selector === 'head') {
            loadContentByUrls(jloads, url, mapFunction, success, error);
            success(jloads.getTarget());
        } else if (selector === 'body') {
            jlogs(f, ' wait for body selector ', selector);
            jlogs(f, ' wait for body target ', jloads.getTarget());
            document.addEventListener("DOMContentLoaded", function () {
                ReadyHtml(url, selector, mapFunction, success, error);
            });
        } else {
            jlogs(f, ' wait for element selector ', selector);
            jlogs(f, ' wait for element target ', jloads.getTarget());

            waitForSelector(url, selector, mapFunction, success, error)
        }
    } else {
        var url1 = Object.keys(url)[0];
        jlogs(f, ' url1 ', url1);

        waitForSelector(url1, selector, mapFunction, function () {
            for (var i in url) {
                var object = url[i];
                jlogs(f, ' url1 i ', i);
                jlogs(f, ' url1 object ', object);
                for (var ii in object) {
                    jlogs(f, ' url1 object[ii], ii ', object[ii], ii);
                    getOne(jloads, object[ii], selector, mapFunction, success, error);
                }
            }
        }, error)
    }
    // error(elem);
}


