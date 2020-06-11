// is-empty.js
jlogs('exist?','isEmpty');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isEmpty(val) {
    return val == null ||
        typeof val === 'undefined' ||
        (typeof val === 'string' && val.length < 1) ||
        (typeof val === 'object' &&
            (
                !(
                    (typeof val.innerText !== 'undefined' && val.innerText.length !== 0) ||
                    (typeof val.innerHTML !== 'undefined' && val.innerHTML.length !== 0)
                )
                &&
                (Object.keys(val).length === 0)
            )
        )
        // (typeof val !== 'boolean')
        ;
}

//
// function isEmpty(obj) {
//     for (var prop in obj) {
//         if (obj.hasOwnProperty(prop)) {
//             return false;
//         }
//     }
//
//     return JSON.stringify(obj) === JSON.stringify({});
// }
