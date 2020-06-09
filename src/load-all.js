// load.js
if (typeof log !== 'function') {
    const log = console.log;
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

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
 * @param target
 * @param success
 * @param error
 * @returns {Load}
 * @constructor
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

    if (Object.keys(json).length === 1) {
        var i = Object.keys(json)[0];
        getOne(json[i], i, mapFunction, success, error)
    } else {
        for (var i in json) {
            var object = json[i];
            getOne(object, i, mapFunction, success, error)
        }
    }
    // success(json);

}

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


function getOne(object, i, mapFunction, success, error) {
    console.log('loadAll getOne ', ' object i ', object, i);

    elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    console.log('loadAll getOne ', ' elem ', elem, !isEmpty(elem));

    if (!isEmpty(elem)) {
        console.log('loadAll getOne ', ' !isEmpty ', elem, !isEmpty(elem));
        loadContentByUrls(object, elem, mapFunction, success, error);
        return success(elem);
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            ReadyHtml(object, i, elem, mapFunction, success, error);
        });

    }
    return error(elem);
}

function loadContentByUrls(object, elem, mapFunction, success, error) {

    var jloads = new Load(elem, success, error);

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
