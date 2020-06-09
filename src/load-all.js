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
        getOne(json, Object.keys(json)[0], mapFunction, success, error)
    } else {
        for (var i in json) {
            var object = json[i];
            getOne(object, i, mapFunction, success, error)
        }
    }
    // success(json);

}

function getOne(object, i, mapFunction, success, error) {
    console.log('loadAll getOne ', ' object i ', object, i);

    const elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
    console.log('loadAll getOne ', ' elem ', elem);

    if (!isEmpty(elem)) {
        loadContentByUrls(object, elem, mapFunction, success, error);
    } else {
        document.onload = function () {

            const elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);

            log('loadAll getOne document.onload ', ' wait for DOM tree if not exist jet ', i, e);

            if (!isEmpty(elem)) {
                loadContentByUrls(object, elem, mapFunction, success, error);
            } else {
                error(elem);
            }
        }
    }
}

function loadContentByUrls(object, elem, mapFunction, success, error) {
    var jloads = new Load(elem, success, error);

    this.constructor.name = 'loadAll loadContent';

    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            url = object[id];
            if (typeof url === 'string') {
                try {
                    var funcName = getFunctionName(url, mapFunction);
                    log(this.constructor.name, ' funcName ', funcName);
                    // console.log(funcName, url, elem);
                    jloads[funcName](url);
                    success(url);
                } catch (e) {
                    log(this.constructor.name, ' elem ', elem);
                    log(this.constructor.name, ' ERROR ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    }
}
