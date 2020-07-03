// include-html.js
jlogs('exist?', 'loadText');

/**
 *
 * @param url
 * @param success
 * @param error
 * @returns {html|boolean}
 */
function loadText(url, success, error) {
    const f = 'loadText';


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
                loadTextByStatus(this.status, this.responseText, url, success, error);

                /* Remove the attribute, and call this function once more: */
                // loadText(url, success, error);
            }
        }
        xhrObj.open("GET", url, true);
        // xhrObj.responseType = 'text';
        xhrObj.setRequestHeader('Content-type', 'application/text; charset=utf-8');

        xhrObj.send();
        /* Exit the function: */
        return success(this);
    }
    return false;

}

function loadTextByStatus(status, responseText, url, success, error) {
    const f = 'loadTextByStatus';

    if (status == 200) {
        jlogs(f, ' loadText loaded HTML: ', responseText);
        return success(JSON.parse(responseText), url);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "loadText Page not found.";
        return error(this, status);
    }
    return error(responseText);
}
