// load-json-by-status.js
jlogs('exist?', 'loadJsonByStatus');

/**
 * @param status
 * @param responseText
 * @param url
 * @param success
 * @param error
 * @returns {*}
 */
function loadJsonByStatus(status, responseText, url, success, error) {
    const f = 'loadJsonByStatus';

    if (status == 200) {
        jlogs(f, ' loadJson loaded HTML: ', responseText);
        return success(JSON.parse(responseText), url);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "loadJson Page not found.";
        return error(this, status);
    }
    return error(responseText);
}
