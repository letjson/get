// xhr.js
jlogs('exist?','getXHRObject');
/**
 * @returns {boolean}
 */
function getXHRObject() {
    var xhrObj = false;
    try {
        xhrObj = new XMLHttpRequest();
    } catch (e) {
        var progid = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
            'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var i = 0; i < progid.length; ++i) {
            try {
                xhrObj = new ActiveXObject(progid[i]);
            } catch (e) {
                continue;
            }
            break;
        }
    } finally {

        return xhrObj;
    }
}
