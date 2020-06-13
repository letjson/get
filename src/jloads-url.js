// get.js

// PUBLIC
var elem = document.body;

/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
(typeof jloadsUrl === 'function') || jlogs('exist?', 'jloadsUrl') && (function jloadsUrl(json, success, error, mapFunction) {
    const f = 'jloadsUrl';

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }

    if (typeof mapFunction !== 'object') {
        // Configuration
        mapFunction = {
            'js': 'js',
            'css': 'css',
            'css2': 'css',
            'css3': 'css',
            'png': 'img',
            'bmp': 'img',
            'jpg': 'img',
            'gif': 'img',
            'htm': 'html',
            'html': 'html',
            'html5': 'html'
        }
    }
    jlogs(' jloadsUrl', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    jlogs('jloadsUrl getOne ', ' elem ', elem, !isEmpty(elem));
    jlogs('jloadsUrl getOne ', ' Load ', Load, typeof Load);

    var jloads = Load(elem, success, error);

    if (Object.keys(json).length === 1) {
        var i = Object.keys(json)[0];
        getOne(jloads, json[i], i, mapFunction, success, error)
    } else {
        for (var i in json) {
            var object = json[i];
            getOne(jloads, object, i, mapFunction, success, error)
        }
    }
    // success(json);

    return jloads;
})


/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
(typeof getOne === 'function') || jlogs('exist?', 'getOne') && (function getOne(jloads, object, i, mapFunction, success, error) {
    const f = 'jloadsUrl getOne';

    jlogs(f, ' jloads.getTarget() ', jloads.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (i === 'head' || !isEmpty(jloads.getTarget())) {
    jlogs(f, ' object i ', object, i);
    if (i === 'head') {
        loadContentByUrls(jloads, object, mapFunction, success, error);
        success(jloads.getTarget());
    } else if (i === 'body') {
        jlogs(f, ' wait for body i ', i);
        jlogs(f, ' wait for body target ', jloads.getTarget());
        document.addEventListener("DOMContentLoaded", function () {
            ReadyHtml(object, i, mapFunction, success, error);
        });
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
            jlogs(f, ' getOne ERROR e ', e);
            error(e);
        }
    }
    // error(elem);
})

jlogs('exist?', 'loadContentByUrls');

/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
(typeof loadContentByUrls === 'function') || jlogs('exist?', 'loadContentByUrls') && (function loadContentByUrls(jloads, object, mapFunction, success, error) {

    const f = 'jloadsUrl loadContentByUrls';

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
})


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
(typeof ReadyHtml === 'function') || jlogs('exist?', 'ReadyHtml') && (function ReadyHtml(object, i, mapFunction, success, error) {
    const f = 'jloadsUrl ReadyHtml';

    jlogs(f, ' i ', i);
    var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    jlogs(f, ' elem ', elem);

    var jloads = new Load(elem, success, error);

    if (!isEmpty(elem)) {
        loadContentByUrls(jloads, object, mapFunction, success, error);
        success(elem);
    } else {
        waitFor(i, 40, function (i) {
            var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
            var jloads = new Load(elem, success, error);
            loadContentByUrls(jloads, object, mapFunction, success, error);
        });
        // error(elem);
    }
})
