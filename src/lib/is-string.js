// is-array.js
jlogs('exist?','isString');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isString(val) {
    return val !== null ||
        (typeof val === 'string' && val.length > 0)
        ;
}
