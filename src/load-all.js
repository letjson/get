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
    return map[ext];
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
        }
    }

    for (var i in json) {
        var object = json[i];
        console.log(i);
        const elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);

        if (!isEmpty(elem)) {

            var jloads = new Load(elem, success, error);

            if (isArray(object)) {
                var url = '';
                for (var id in object) {
                    url = object[id];
                    if (typeof url === 'string') {

                        log(this.constructor.name, 'elem', elem);
                        var funcName = getFunctionName(url, mapFunction);

                        log(this.constructor.name, 'funcName', funcName);
                        // console.log(funcName, url, elem);

                        jloads[funcName]([url]);
                        // jloads.js([url]);
                        // elem.appendChild(url, funcName);
                        // success(elem);

                    }
                }
            }

        } else {
            error(elem);
        }

    }

};
