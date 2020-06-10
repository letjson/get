// load.js
if (typeof log !== 'function') {
    const log = console.log;
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
 * @returns {any[] | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | SharedArrayBuffer | string | Uint16Array | ArrayBuffer | Int32Array | Float32Array | BigInt64Array | Uint8Array | Int8Array}
 */
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

/**
 *
 * @param url
 * @param map
 * @returns {*}
 */
function getFunctionName(url, map) {

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
 */
function loadAll(json, success, error, mapFunction) {
    this.constructor.name = 'loadAll';
    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log('loadAll loaded ', data);
        };
        error = function (data) {
            console.error('loadAll !loaded ', data);
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
    console.log(' loadAll', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);

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
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 */
function getOne(jloads, object, i, mapFunction, success, error) {
    console.log('loadAll getOne ', ' object i ', object, i);

    elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    console.log('loadAll getOne ', ' elem ', elem, !isEmpty(elem));

    if (!isEmpty(elem)) {
        console.log('loadAll getOne ', ' !isEmpty ', elem, !isEmpty(elem));
        success(elem);
        loadContentByUrls(jloads, object, elem, mapFunction, success, error);
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            ReadyHtml(jloads, object, i, elem, mapFunction, success, error);
        });

    }
    error(elem);
}

/**
 *
 * @param object
 * @param elem
 * @param mapFunction
 * @param success
 * @param error
 */
function loadContentByUrls(jloads, object, elem, mapFunction, success, error) {

    this.constructor.name = 'loadAll loadContent';

    console.log(this.constructor.name, ' isArray object, elem, mapFunction', object, isArray(object), elem, mapFunction);


    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            console.log('loadContentByUrls isArray', ' object ', object);
            url = object[id];
            console.log('loadContentByUrls isArray', ' url ', url, typeof url === 'string');

            if (typeof url === 'string') {
                try {
                    var funcName = getFunctionName(url, mapFunction);
                    console.log(this.constructor.name, ' funcName ', funcName);
                    // console.log(funcName, url, elem);
                    jloads[funcName](url);
                    success(url);
                } catch (e) {
                    console.log(this.constructor.name, ' ERROR elem ', elem);
                    console.log(this.constructor.name, ' ERROR e ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    } else {
        console.log(this.constructor.name, ' isArray ERROR object', object);
        error(object);
    }
}


/**
 *
 * @param object
 * @param i
 * @param elem
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 * @constructor
 */
function ReadyHtml(object, i, elem, mapFunction, success, error) {

    elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;

    console.log('ReadyHtml getOne ', ' elem ', elem, !isEmpty(elem));
    console.log('ReadyHtml getOne ', ' i ', i);

    if (!isEmpty(elem)) {
        loadContentByUrls(object, elem, mapFunction, success, error);
        return success(elem);
    } else {
        return error(elem);
    }
}
