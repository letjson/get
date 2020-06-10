// get-target.js
if (typeof log !== 'function') {
    const log = console.log;
}

/**
 *
 * @param target
 * @returns {HTMLHeadElement}
 */
function getTarget(target) {
    const f = 'getTarget';

    // log(f, ' target ', target);
    if (isEmpty(target)) {
        target = document.getElementsByTagName('head')[0];
        log(f, ' isEmpty HEAD ', target, typeof target, target.innerHTML !== 'undefined',  target.innerHTML.length, Object.keys(target));
        if (isEmpty(target)) {
            target = document.body;
            log(f, ' isEmpty BODY ', target);
        }
    }
    log(f, ' target: ', target);

    return target;
}
