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

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log('loaded', data);
        };
        error = function (data) {
            console.error('!loaded', data);
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

    for (var i in json) {
        var object = json[i];

        log(this.constructor.name, ' i ', i);

        const elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);

        if (!isEmpty(elem)) {

            var jloads = new Load(elem, success, error);

            if (isArray(object)) {
                var url = '';
                for (var id in object) {
                    url = object[id];
                    if (typeof url === 'string') {
                        try {
                            var funcName = getFunctionName(url, mapFunction);
                            log(this.constructor.name, ' funcName ', funcName);
                            // console.log(funcName, url, elem);
                            jloads[funcName]([url]);
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

        } else {
            error(elem);
        }

    }
    success(json);
}
