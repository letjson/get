// load-html-by-status.js
jlogs('exist?', 'loadHtmlByStatus');

/**
 *
 * @param status
 * @param responseText
 * @param target
 * @param success
 * @param error
 * @returns {*}
 */
function loadHtmlByStatus(status, responseText, target, success, error) {
    const f = 'loadHtmlByStatus';

    jlogs(f, ' includeHtml waiting for DOM tree ', target, getTarget(target));

    if (status == 200) {
        jlogs(f, ' includeHtml loaded: ', responseText, target, getTarget(target));
        onSelector(target, function (selector, element) {
            jlogs('onSelector insertAdjacentHTML selector, element ', selector, target, element);
            jlogs('onSelector insertAdjacentHTML responseText  ', responseText);
            element.insertAdjacentHTML('beforeend', responseText);
        });
        return success(this);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "includeHtml Page not found.";
        return error(this, status);
    }
    return error(this);
}
