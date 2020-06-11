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
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.defer = 'defer';
    // scriptTag.async = 'async';
    scriptTag.type = 'text/javascript';

    scriptTag.onerror = error;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;

    return getTarget(target).appendChild(scriptTag);
}
