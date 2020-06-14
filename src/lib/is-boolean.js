// is-array.js
jlogs('exist?','isBoolean');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isBoolean(val) {
    return val !== null ||
        (typeof val === 'boolean')
        ;
}
