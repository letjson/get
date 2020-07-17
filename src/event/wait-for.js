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
    var f = 'waitFor';
    jlogs(f, ' selector ', selector);
    // console.log(f, ' selector document.querySelector(selector) ', typeof document.querySelector(selector), document.querySelector(selector));
    // console.log(f, ' selector document.querySelectorAll(selector) ', typeof document.querySelectorAll(selector), document.querySelectorAll(selector), document.querySelectorAll(selector).length);
    if (typeof document.querySelectorAll(selector) === 'object' && document.querySelectorAll(selector).length > 0) {
        // alert("The element is displayed, you can put your code instead of this alert.")
        return callback(selector);
    } else {
        setTimeout(function () {
            waitFor(selector, time, callback);
        }, time);
    }
}
