// selector-event-target.js

// TODO: base lib APIFUNC, with E

/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'selectorEventTarget');
if (typeof selectorEventTarget !== 'function') selectorEventTarget = function (selector, event, targets, success, error) {

    const f = 'jloadsForm selectorEventTarget';

    var target = Object.keys(targets)[0];
    jlogs(f, 'selector event target', selector, event, target);

    var n = target.indexOf(">");
    if (n > 0) {
        var se = target.split(">", 2);
        var target_group = se[0];
        var target_task = "append";
        var target_item = se[1];
    }

    jlogs(f, 'target_group, target_task, target_item', target_group, target_task, target_item);

    // jlogs(f, ' isArray target', target, isArray(target));
    console.log(f, ' getTarget(selector)', selector, getTarget(selector));
    if (selector === 'html' && event === 'onload') {
        event = "DOMContentLoaded";
    }
    // var element = new E(selector);
    // console.log(f, ' E', selector, element.first());

    // if (typeof selector === 'string') {
    try {

        if (typeof getTarget(selector) !== 'undefined') {
            append(targets, target, selector, event, target_group, target_item, f)
        } else {
            getTarget(selector).addEventListener(event, function () {
                append(targets, target, selector, event, target_group, target_item, f)
            });
        }

    } catch (e) {
        //jlogs(f, ' ERROR elem ', elem);
        jlogs(f, ' ERROR e ', e);
        error(e);
    }

    // jloads.js([selector]);
    // elem.appendChild(selector, funcName);
    // }

}
