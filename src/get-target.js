// get-target.js
jlogs('exist?', 'getTarget');

/**
 *
 * @param selector
 * @returns {HTMLHeadElement}
 */
function getTarget(selector) {
    const f = 'getTarget';

    if(typeof selector === 'string'){
        jlogs(f, 'selector', selector);
        var target = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector) || document.getElementsByTagName('head')[0] || document.body;
        console.log(f, 'string target', target, typeof target);
        return target;
    }

    console.log(f, 'obj target', selector);
    //jlogs(f, ' target ', target);
    // if (isEmpty(target)) {
    //     target = document.getElementsByTagName('head')[0];
    //     jlogs(f, ' isEmpty HEAD ', target, typeof target, target.innerHTML !== 'undefined', target.innerHTML.length, Object.keys(target));
    //     if (isEmpty(target)) {
    //         target = document.body;
    //         jlogs(f, ' isEmpty BODY ', target);
    //     }
    // }
    // jlogs(f, 'target', target);

    return selector;
}
