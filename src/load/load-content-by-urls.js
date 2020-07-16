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

    const f = 'jloadsTarget loadContentByUrls';

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
                        load['img'](url);
                    } else {
                        const funcName = getFunctionName(url, mapFunction);
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
