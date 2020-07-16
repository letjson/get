// include-script.js
jlogs('exist?', 'includeScript');

/**
 *
 * @param url
 * @param target
 * @param success
 * @param error
 * @returns {HTMLScriptElement}
 */
function includeScript(url, target, replace, success, error) {
    const f = 'includeScript';
    if (typeof replace === 'number' && replace === 1) {
        replace = true;
    }

    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.defer = true;
    // scriptTag.setAttribute('defer','');
    // scriptTag.async = true;
    scriptTag.type = 'text/javascript';

    scriptTag.onerror = error;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;

    if (replace) {
        jlogs(f, ' replace getTarget(target): ', getTarget(target));
        jlogs(f, ' replace getTarget(target) firstChild: ', getTarget(target).firstChild);
        // getTarget(target).removeChild(getTarget(target).firstChild);
        onSelector(target, function (selector, element) {
            jlogs('onSelector includeScript target getTarget(target) selector element: ', selector, element);
            getTarget(selector).removeChild(getTarget(selector).firstChild);
            getTarget(selector).appendChild(scriptTag);
        });
        return success(this);
    }
    onSelector(target, function (selector, element) {
        jlogs('onSelector includeScript target getTarget(target) selector element: ', selector, element);
        getTarget(selector).appendChild(scriptTag);
    });
    // return getTarget(target).appendChild(scriptTag);
}
