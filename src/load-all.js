// load.js
if (typeof log !== 'function') {

    var print_log = function (arguments) {
        var str = ':: ';
        for (var i in arguments) {
            str += arguments[i];
            str += ', ';
        }
        console.log(str);
        return str;
    }
    var log = function () {
        return print_log(arguments);
        // arguments[0] === 'Load' || print_log();
    }

}

if (typeof err !== 'function') {

    var print_error = function (arguments) {
        var str = ':: ';
        for (var i in arguments) {
            str += arguments[i];
            str += ', ';
        }
        console.error(str);
        return str;
    }
    var err = function () {
        return print_error(arguments);
        // arguments[0] === 'Load' || print_log();
    }

}

// PUBLIC
var elem = document.body;

var mapFunction = {
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

log('exist?','getFileExtension');
/**
 *
 * @param filename
 * @returns {string}
 */
function getFileExtension(filename) {
    return filename.split("?")[0].split("#")[0].split('.').pop();
}

log('exist?','getFunctionName');
/**
 *
 * @param url
 * @param map
 * @returns {*}
 */
function getFunctionName(url, map) {
    const f = 'getFunctionName';

    var ext = getFileExtension(url)
    log(f, ' url ', url);
    log(f, ' map ', map);
    var result = map[ext];

    if (isEmpty(result)) {
        throw new Error('key or Value Is Empty or Key not exits in Map');
    }
    return result;
}

log('exist?','loadAll');
/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
function loadAll(json, success, error, mapFunction) {
    const f = 'loadAll';

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            log('loadAll loaded ', data);
        };
        error = function (data) {
            err('loadAll !loaded ', data);
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
    log(' loadAll', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    log('loadAll getOne ', ' elem ', elem, !isEmpty(elem));

    var jloads = new Load(elem, success, error);

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
}

log('exist?','getOne');
/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
function getOne(jloads, object, i, mapFunction, success, error) {
    const f = 'loadAll getOne';

    log(f, ' jloads.getTarget() ', jloads.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (i === 'head' || !isEmpty(jloads.getTarget())) {
    log(f, ' object i ', object, i);
    if (i === 'head') {
        loadContentByUrls(jloads, object, mapFunction, success, error);
        success(jloads.getTarget());
    } else if (i === 'body') {
        log(f, ' wait for body i ', i);
        log(f, ' wait for body target ', jloads.getTarget());
        document.addEventListener("DOMContentLoaded", function () {
            ReadyHtml(object, i, mapFunction, success, error);
        });
    } else {
        log(f, ' wait for element i ', i);
        log(f, ' wait for element target ', jloads.getTarget());

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
            // log(f, ' ERROR elem ', elem);
            log(f, ' getOne ERROR e ', e);
            error(e);
        }
    }
    // error(elem);
}

log('exist?','loadContentByUrls');
/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
function loadContentByUrls(jloads, object, mapFunction, success, error) {

    const f = 'loadAll loadContentByUrls';

    log(f, ' isArray object, elem, mapFunction', object, isArray(object), mapFunction);

    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            log(f, ' isArray', ' id ', id);
            url = object[id];
            log(f, ' isArray', ' url ', url);

            if (typeof url === 'string') {
                try {
                    const funcName = getFunctionName(url, mapFunction);
                    log(f, ' funcName ', funcName);
                    // log(funcName, url, elem);
                    jloads[funcName](url);
                    success(url);
                } catch (e) {
                    // log(f, ' ERROR elem ', elem);
                    log(f, ' ERROR e ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    } else {
        log(f, ' isArray ERROR object', object);
        error(object);
    }
}

log('exist?','ReadyHtml');
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
function ReadyHtml(object, i, mapFunction, success, error) {
    const f = 'loadAll ReadyHtml';

    log(f, ' i ', i);
    var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    log(f, ' elem ', elem);

    var jloads = new Load(elem, success, error);

    if (!isEmpty(elem)) {
        loadContentByUrls(jloads, object, mapFunction, success, error);
        success(elem);
    } else {
        waitForElementToDisplay(i, 200, function (i){
            var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
            var jloads = new Load(elem, success, error);
            loadContentByUrls(jloads, object, mapFunction, success, error);
        });
        // error(elem);
    }
}

log('exist?','waitForElementToDisplay');
/**
 *
 * @param selector
 * @param time
 * @param callback
 * @returns {*}
 */
function waitForElementToDisplay(selector, time, callback) {
    const f = 'waitForElementToDisplay';
    log(f, ' selector ', selector);
    if (document.querySelector(selector) != null) {
        // alert("The element is displayed, you can put your code instead of this alert.")
        return callback(selector);
    } else {
        setTimeout(function () {
            waitForElementToDisplay(selector, time, callback);
        }, time);
    }
}
