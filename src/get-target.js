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

    //jlogs(f, ' target ', target);
    if (isEmpty(target)) {
        target = document.getElementsByTagName('head')[0];
       jlogs(f, ' isEmpty HEAD ', target, typeof target, target.innerHTML !== 'undefined',  target.innerHTML.length, Object.keys(target));
        if (isEmpty(target)) {
            target = document.body;
           jlogs(f, ' isEmpty BODY ', target);
        }
    }
   jlogs(f, ' target: ', target);

    return target;
}
