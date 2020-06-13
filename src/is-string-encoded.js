// is-array.js
jlogs('exist?','isStringEncoded');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isStringEncoded(val, type) {
    // base64, md5
    return val !== null ||
        (typeof val === 'string' && val.length > 0)
        ;
}
