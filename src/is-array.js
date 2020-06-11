// is-array.js
jlogs('exist?','isArray');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isArray(val) {
    return val !== null ||
        (typeof val === 'object' && Object.keys(val).length > 0)
        ;
}
