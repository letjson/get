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
// loadHtmlByStatus(this.status, this.responseText, target, replace, success, error);
function loadHtmlByStatus(status, responseText, target, replace, success, error, url) {
    var f = 'loadHtmlByStatus';

    jlogs(f, ' includeHtml waiting for DOM tree: target, url ', target, url);

    if (status == 200) {
        jlogs(f, ' includeHtml loaded: ', target);
        onSelector(target, function (selector, element) {
            jlogs(f, ' selector ', selector);
            jlogs(f, ' target ', target);
            jlogs(f, ' element ', element);
            // jlogs('onSelector insertAdjacentHTML responseText  ', responseText);
            if (replace) {
                jlogs(f, 'replaced:', replace);
                element.innerHTML = '';
            }
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
