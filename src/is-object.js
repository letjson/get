// is-array.js
jlogs('exist?','isObject');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isObject(val) {
    return val !== null ||
        (typeof val === 'object' && Object.keys(val).length > 0)
        ;
}
