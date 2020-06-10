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

/**
 *
 * @param filename
 * @returns {string}
 */
function getFileExtension(filename) {
    return filename.split("?")[0].split("#")[0].split('.').pop();
}

/**
 *
 * @param url
 * @param map
 * @returns {*}
 */
function getFunctionName(url, map) {
    this.constructor.name = 'getFunctionName';

    var ext = getFileExtension(url)
    log(this.constructor.name, ' url ', url);
    log(this.constructor.name, ' map ', map);
    var result = map[ext];

    if (isEmpty(result)) {
        throw new Error('key or Value Is Empty or Key not exits in Map');
    }
    return result;
}


/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
function loadAll(json, success, error, mapFunction) {
    this.constructor.name = 'loadAll';
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
    this.constructor.name = 'loadAll getOne';

    log(this.constructor.name, ' object i ', object, i);

    elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    log('loadAll getOne ', ' elem ', elem, !isEmpty(elem));

    if (i === 'head' || !isEmpty(elem)) {
        log(this.constructor.name, ' !isEmpty ', elem, !isEmpty(elem));
        success(elem);
        loadContentByUrls(jloads, object, elem, mapFunction, success, error);
    } else {
        log(this.constructor.name, ' wait for DOM tree ', i, elem, !isEmpty(elem));
        document.addEventListener("DOMContentLoaded", function () {
            ReadyHtml(jloads, object, i, elem, mapFunction, success, error);
        });
    }
    // error(elem);
}

/**
 *
 * @param jloads
 * @param object
 * @param elem
 * @param mapFunction
 * @param success
 * @param error
 */
function loadContentByUrls(jloads, object, elem, mapFunction, success, error) {

    this.constructor.name = 'loadAll loadContentByUrls';

    log(this.constructor.name, ' isArray object, elem, mapFunction', object, isArray(object), elem, mapFunction);

    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            log(this.constructor.name,' isArray', ' id ', id);
            url = object[id];
            log(this.constructor.name,' isArray', ' url ', url);

            if (typeof url === 'string') {
                try {
                    var funcName = getFunctionName(url, mapFunction);
                    log(this.constructor.name, ' funcName ', funcName);
                    // log(funcName, url, elem);
                    jloads[funcName](url);
                    success(url);
                } catch (e) {
                    log(this.constructor.name, ' ERROR elem ', elem);
                    log(this.constructor.name, ' ERROR e ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    } else {
        log(this.constructor.name, ' isArray ERROR object', object);
        error(object);
    }
}


/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param elem
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 * @constructor
 */
function ReadyHtml(jloads, object, i, elem, mapFunction, success, error) {

    elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;

    log('loadAll ReadyHtml ', ' elem ', elem, !isEmpty(elem));
    log('loadAll ReadyHtml ', ' i ', i);

    if (!isEmpty(elem)) {
        loadContentByUrls(jloads, object, elem, mapFunction, success, error);
        success(elem);
    } else {
        error(elem);
    }
}
