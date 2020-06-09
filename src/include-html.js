// include-html.js
if (typeof log !== 'function') {
    const log = console.log;
}

/**
 *
 * @param url
 * @param target
 * @param replace
 * @param success
 * @param error
 * @returns {includeHtml|boolean}
 */
function includeHtml(url, target, replace, success, error) {

    if (typeof replace === 'number' && replace === 1) {
        replace = true;
    }

    if (typeof success !== 'function') {
        success = function () {
            log(this.constructor.name, ' includeHtml success ', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            log(this.constructor.name, ' includeHtml error ', "Page not found.");
        }
    }
    log(this.constructor.name, ' includeHtml url ', url);

    if (url) {
        /* Make an HTTP request using the attribute value as the url name: */
        var xhttp = getXHRObject();
        xhttp.onreadystatechange = function () {

            log(this.constructor.name, ' includeHtml target: ', target);

            if (this.readyState == 4) {
                window.onload = loadHtmlByStatus(this.status, this.responseText, target);

                /* Remove the attribute, and call this function once more: */
                // includeHtml(url, success, error);
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
        /* Exit the function: */
        return this;
    }
    return false;

}

function loadHtmlByStatus(status, responseText, target) {
    log(this.constructor.name, ' includeHtml waiting for DOM tree ', getTarget(target));

    if (status == 200) {
        log(this.constructor.name, ' includeHtml loaded HTML: ', this.responseText);
        getTarget(target).insertAdjacentHTML('beforeend', this.responseText);
        success(this);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "includeHtml Page not found.";
        error(this);
    }
}
