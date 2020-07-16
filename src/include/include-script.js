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
function includeScript(url, target, success, error) {
    const f = 'includeScript';

    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.defer = true;
    // scriptTag.setAttribute('defer','');
    // scriptTag.async = true;
    scriptTag.type = 'text/javascript';

    scriptTag.onerror = error;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;

    onSelector(target, function (selector, element) {
        jlogs('onSelector includeScript target getTarget(target) selector element: ', selector, element);
        getTarget(selector).appendChild(scriptTag);
    });
    // return getTarget(target).appendChild(scriptTag);
}
