// is-array.js
jlogs('exist?','isNumberGt');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isNumberGt(val, number) {
    return val !== null ||
        (typeof val === 'number' && val > number)
        ;
}
