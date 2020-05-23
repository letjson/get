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
