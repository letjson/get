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
if (typeof getOne !== 'function') getOne = function (load, url, selector, mapFunction, success, error) {
    const f = 'jloadsTarget getOne';

    jlogs(f, ' load.getTarget() ', load.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (selector === 'head' || !isEmpty(load.getTarget())) {
    jlogs(f, ' selector ', selector);
    jlogs(f, ' url 1', url, typeof url, isString(url), Object.keys(url).length);

    if (isArray(url) && Object.keys(url).length === 1 && isString(url[0])) {
        url = url[0];
    }

    jlogs(f, ' url 2 ', url, typeof url, isString(url));

    if (isString(url)) {
        if (selector === 'head') {
            loadContentByUrls(load, url, mapFunction, success, error);
            success(load.getTarget(selector));
        // } else if (selector === 'body') {
        //     jlogs(f, ' wait for body selector ', selector);
        //     jlogs(f, ' wait for body target ', load.getTarget(selector));

            // var reload = document.querySelector(selector);
            // reload.addEventListener("load", function (event) {
            //
            //     console.log(f, 'event::', event);
            //
            //     ReadyHtml(url, selector, mapFunction, success, error);
            // });
        } else {
            jlogs(f, ' wait for element selector ', selector);
            jlogs(f, ' wait for element url ', url);
            // console.log(f, ' wait for element target ', load.getTarget(selector));

            // waitForSelector(url, selector, mapFunction, success, error)
            waitForSelector(url, selector, mapFunction, success, error);

        }
    } else {
        var url1 = Object.keys(url)[0];
        jlogs(f, ' url3 ', url1);

        waitForSelector(url1, selector, mapFunction, function () {
            for (var i in url) {
                var object = url[i];
                jlogs(f, ' url4 i ', i);
                jlogs(f, ' url4 object ', object);
                for (var ii in object) {
                    jlogs(f, ' url5 object[ii], ii ', object[ii], ii);
                    getOne(load, object[ii], selector, mapFunction, success, error);
                }
            }
        }, error);
    }
    // error(elem);
}


