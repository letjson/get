// get-target.js
jlogs('exist?', 'getTarget');

/**
 *
 * @param target
 * @returns {HTMLHeadElement}
 */
function getTarget(selector) {
    const f = 'getTarget';

    var target = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector); // || document.body;
    jlogs(f, 'selector', selector, target);

    //jlogs(f, ' target ', target);
    if (isEmpty(target)) {
        target = document.getElementsByTagName('head')[0];
        jlogs(f, ' isEmpty HEAD ', target, typeof target, target.innerHTML !== 'undefined', target.innerHTML.length, Object.keys(target));
        if (isEmpty(target)) {
            target = document.body;
            jlogs(f, ' isEmpty BODY ', target);
        }
    }
    jlogs(f, ' target: ', target);

    return target;
}
