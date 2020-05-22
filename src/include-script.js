// include-script.js
if (typeof log !== 'function') {
    const log = console.log;
}

/**
 *
 * @param target
 * @returns {HTMLHeadElement}
 */
function getTarget(target) {

    log(this.constructor.name, 'target', target);
    if (isEmpty(target)) {
        log(this.constructor.name, 'HEAD');
        target = document.getElementsByTagName('head')[0];
        if (isEmpty(target)) {
            log(this.constructor.name, 'BODY');
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
