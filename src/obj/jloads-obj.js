// jloads-obj.js
/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
jlogs('exist?', 'jloadsObj');
if (typeof jloadsObj !== 'function') jloadsObj = function (url, success, error, mapFunction) {
    var f = 'jloadsObj';

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
    }

    if (typeof error !== 'function' && (typeof error !== 'object' || error === null)) {
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }


    if (typeof mapFunction !== 'object' && typeof map === 'object') {
        // Configuration
        mapFunction = map;
    }

    // var json = {};

    if (typeof url === 'string') {
        try {
            // base64 in url
            if (url.length > 2) {
                return loadJson(url, success);
            }
            // success(json, url);
            // return json;
        } catch (e) {
            //jlogs(f, ' ERROR elem ', elem);
            jlogs(f, ' ERROR e ', e);
            return error(e, url);
        }
    }


    return null;
}
