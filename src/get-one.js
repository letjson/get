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
    var f = 'jloadsTarget getOne';

    jlogs(f, ' load.getTarget() ', load.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (selector === 'head' || !isEmpty(load.getTarget())) {
    jlogs(f, ' selector ', selector);
    jlogs(f, ' url 1', url, typeof url, isString(url), Object.keys(url).length);

    if (isArray(url) && Object.keys(url).length === 1 && isString(url[0])) {
        url = url[0];
        //load.replaceOn();
    }
    jlogs(f, ' load.isReplaceOn() ', load.isReplaceOn());
    jlogs(f, ' url 2 ', url, typeof url, isString(url));

    if (isString(url)) {

        jlogs(f, ' wait for element selector ', selector);
        jlogs(f, ' wait for element url ', url);
        // console.log(f, ' wait for element target ', load.getTarget(selector));
        var funcName = getFunctionName(url, mapFunction, f);
        jlogs(f, ' funcName ', funcName);
        //jlogs(funcName, url, elem);
        //l[funcName](url);
        load[funcName](url);

    } else {
        var list = url;
        jlogs(f, ' list from url4 ', list);
        jlogs(f, ' list isArray', isArray(list));
        jlogs(f, ' list isObject', isObject(list));


        //
        if (isArray(list)) {
            for (var i in list) {
                var url = list[i];

                jlogs(f, 'isArray url5 ', url);
                jlogs(f, 'isArray list ', list);
                jlogs(f, 'isArray selector ', selector);

                getOne(load, url, selector, mapFunction, success, error);

                // waitForSelector(url, selector, mapFunction, success, error);
                //

            }//for
        } else if (isObject(list)) {

            url = Object.keys(list)[0];
            jlogs(f, 'isObject url5 ', url);
            jlogs(f, 'isObject list ', list);
            jlogs(f, 'isObject list[url] ', list[url]);
            jlogs(f, 'isObject selector ', selector);

            /// Wait for first isObject url5 , page/text.html,
            /// and load isObject list , {"page/text.html":["menu/radio.html"]},

            var afterLoaded = function () {

                jlogs(f, 'afterLoaded ', selector, list[url]);

                var l = new Load({
                    target: selector,
                    success: success,
                    error: error,
                    replace: 0,
                });
                getOne(l, list[url], selector, mapFunction, success, error);
            };

            var load = new Load({
                target: selector,
                success: afterLoaded,
                error: error,
                replace: 1,
            });
            getOne(load, url, selector, mapFunction, success, error);

        }
    }
    // error(elem);
}


