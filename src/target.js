// get-target.js
jlogs('exist?', 'getTarget');

/**
 *
 * @param selector
 * @returns {HTMLHeadElement}
 */
function target(selector, callback) {
    const f = 'target';

    jlogs(f, 'selector', selector);

    if(selector === 'string'){
        var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector) || document.getElementsByTagName('head')[0] || document.body;
        jlogs(f, ' elem ', elem);

        if (!isEmpty(elem)) {
            return callback(selector);
        } else {
            waitFor(i, 40, function (i) {
                // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
                jlogs(f, 'elem delay', elem);
                return callback(selector);
            });
            // error(elem);
        }

    }
    if (!isEmpty(selector)) {
        jlogs(f, 'elem now', elem);
        return callback(selector);
    }
    jlogs(f, 'elem NOT', elem);

}
