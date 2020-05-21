// include-html.js
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
    var xhttp;

    try {
        var el = new E(target);
    } catch (err) {
        console.error('!Element not exist  ', target);
        return false;
    }

    var elmnt = el.first();

    if (typeof success !== 'function') {
        success = function () {
            JLOADS_DEBUG || console.log('includeHtml success', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            JLOADS_DEBUG || console.log('includeHtml error', "Page not found.");
        }
    }
    JLOADS_DEBUG || console.log('includeHtml url', url);

    if (url) {
        /* Make an HTTP request using the attribute value as the url name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            JLOADS_DEBUG || console.log('includeHtml el_id', target);

            if (this.readyState == 4) {
                if (this.status == 200) {

                    elmnt.insertAdjacentHTML('beforeend', this.responseText);

                    success(this);
                }
                if (this.status == 404) {
                    elmnt.innerHTML = "includeHtml Page not found.";
                    error(this);
                }
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
