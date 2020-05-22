// include-script.js
if (typeof TARGET_DEBUG !== 'boolean') {
    var TARGET_DEBUG = false;
}
if (typeof log !== 'function') {
    var log = console.log;
}
/**
 *
 * @param target
 * @returns {HTMLHeadElement}
 */
function getTarget(target) {

    !TARGET_DEBUG || log('target', target);
    if (isEmpty(target)) {
        !TARGET_DEBUG || log('HEAD');
        target = document.getElementsByTagName('head')[0];
        if (isEmpty(target)) {
            !TARGET_DEBUG || log('BODY');
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
