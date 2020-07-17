// load-json.js
jlogs('exist?', 'loadJson');

/**
 *
 * @param url
 * @param success
 * @param error
 * @returns {html|boolean}
 */
function loadJson(url, success, error) {
    var f = 'loadJson';


    if (typeof success !== 'function') {
        success = function () {
            jlogs(f, ' success ', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            jlogs(f, ' error ', "Page not found.");
        }
    }
    jlogs(f, ' url ', url);

    if (url.length > 5) {

        /* Make an HTTP request using the attribute value as the url name: */
        var xhrObj = getXHRObject();
        // xhrObj.setRequestHeader("Content-Type","text/html; charset=UTF-8");
        // xhrObj.setRequestHeader("Content-Type","multipart/form-data; boundary=something");
        xhrObj.onreadystatechange = function () {

            if (this.readyState == 4) {
                // document.onload =
                loadJsonByStatus(this.status, this.responseText, url, success, error);

                /* Remove the attribute, and call this function once more: */
                // loadJson(url, success, error);
            }
        }
        xhrObj.open("GET", url, true);
        // xhrObj.responseType = 'text';
        xhrObj.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhrObj.send();
        /* Exit the function: */
        return success(this);
    }
    return false;
}
