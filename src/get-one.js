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
// if (typeof getOne !== 'function') getOne = function (load, url, selector, mapFunction, success, error) {
if (typeof getOne !== 'function') getOne = function (load) {
    var f = 'jloadsTarget getOne';

    jlogs(f, ' load.getTarget() ', load.getTarget());
    var url = load.cfg.url;
    var selector = load.cfg.target;
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
        load.setUrl(url);
        load.setMap(map);
        load.run();
        // console.log(f, ' wait for element target ', load.getTarget(selector));

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

                getOne(new Load({
                        mapFunction: map,
                        url: url,
                        target: selector,
                        success: load.success,
                        error: load.error,
                        replace: 0,
                    })
                );

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

                getOne(new Load({
                        mapFunction: map,
                        url: list[url],
                        target: selector,
                        success: load.success,
                        error: load.error,
                        replace: 0,
                    })
                );
            };

            getOne(new Load({
                    mapFunction: map,
                    url: url,
                    target: selector,
                    success: afterLoaded,
                    error: load.error,
                    replace: 1,
                })
            );

        }
    }
    // error(elem);
}


