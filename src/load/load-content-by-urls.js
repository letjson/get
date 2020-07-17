/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'loadContentByUrls');
if (typeof loadContentByUrls !== 'function') loadContentByUrls = function (load, object, mapFunction, success, error) {

    var f = 'jloadsTarget loadContentByUrls';

    jlogs(f, ' isArray object: ', object);
    jlogs(f, ' isArray array: ', isArray(object));

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
                        load['img'](url);
                    } else {
                        var funcName = getFunctionName(url, mapFunction, 'loadContentByUrls');
                        jlogs(f, ' funcName ', funcName);
                        //jlogs(funcName, url, elem);
                        load[funcName](url);
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
}
