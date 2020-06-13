// is-array.js
jlogs('exist?','isString');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isString(val, type) {
    // base64, md5
    return val !== null ||
        (typeof val === 'string' && val.length > 0)
        ;
}
