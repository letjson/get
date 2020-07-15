// load-text-by-status.js
jlogs('exist?', 'loadTextByStatus');

/**
 * @param status
 * @param responseText
 * @param url
 * @param success
 * @param error
 * @returns {*}
 */
function loadTextByStatus(status, responseText, url, success, error) {
    const f = 'loadTextByStatus';

    if (status == 200) {
        jlogs(f, ' loadText loaded: ', responseText);
        return success(responseText, url);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "loadText Page not found.";
        return error(this, status);
    }
    return error(responseText);
}
