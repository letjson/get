// include-script.js
/**
 *
 * @param target
 * @returns {HTMLHeadElement}
 */
function getTarget(target) {

    if (typeof TARGET_DEBUG === 'undefined') {
        var TARGET_DEBUG = true;
    }

    TARGET_DEBUG || console.log('target', target);
    if (isEmpty(target)) {
        TARGET_DEBUG || console.log('HEAD');
        target = document.getElementsByTagName('head')[0];
        if (isEmpty(target)) {
            TARGET_DEBUG || console.log('BODY');
            target = document.body;
        }
    }
    return target;
}


/**
 *
 * @param url
 * @param target
 * @param success
 * @param error
 * @returns {HTMLScriptElement}
 */
function includeJs(url, target, success, error) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.type = 'text/javascript';

    scriptTag.onerror = error;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;

    return getTarget(target).appendChild(scriptTag);
}
