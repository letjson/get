// wait-for.js
jlogs('exist?', 'waitFor');

/**
 *
 * @param selector
 * @param time
 * @param callback
 * @returns {*}
 */
function waitFor(selector, time, callback) {
    const f = 'waitFor';
    jlogs(f, ' selector ', selector);
    if (document.querySelector(selector) != null) {
        // alert("The element is displayed, you can put your code instead of this alert.")
        return callback(selector);
    } else {
        setTimeout(function () {
            waitFor(selector, time, callback);
        }, time);
    }
}
