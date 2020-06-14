// is-array.js
jlogs('exist?','isNumberLt');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isNumberLt(val, number) {
    return val !== null ||
        (typeof val === 'number' && val < number)
        ;
}
