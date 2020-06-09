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
    this.constructor.name = 'getTarget';

    // log(this.constructor.name, ' target ', target);
    if (isEmpty(target)) {
        target = document.getElementsByTagName('head')[0];
        log(this.constructor.name, ' isEmpty HEAD ', target, typeof target, target.innerHTML !== 'undefined',  target.innerHTML.length, Object.keys(target));
        if (isEmpty(target)) {
            target = document.body;
            log(this.constructor.name, ' isEmpty BODY ', target);
        }
    }
    log(this.constructor.name, ' target: ', target);

    return target;
}
