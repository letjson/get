// is-empty.js
/**
 *
 * @param val
 * @returns {boolean}
 */
function isEmpty(val) {
    return val == null || typeof val === 'undefined' || val.length < 1;
}
