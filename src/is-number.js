// is-array.js
jlogs('exist?','isNumber');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isNumber(val) {
    return val !== null ||
        (typeof val === 'number')
        ;
}
