// each.js
jlogs('exist?','each');

/**
 *
 * @param array
 * @param callback
 * @param limit
 * @param is_last
 * @param is_first
 */
function each(array, callback, limit, is_last, is_first) {

    // limit = 5;
    var count = 1;
    var obj = {};

    if (is_first) {
        obj = firstArray(array);
        callback(obj,0);

    } else if (is_last) {
        obj = lastArray(array);
        callback(obj,-1);

    } else {

        for (var key in array) {

            // skip loop if the property is from prototype
            if (!array.hasOwnProperty(key)) continue;
            if (count > limit) continue;
            count++;

            obj = array[key];

            // console.log(obj);
            // console.log(limit, count);

            callback(obj, key);
        }
    }
    // return this;
}

var firstArray = function (array) {
    var key = array.length - 1;
    return array[key];
}

var lastArray = function (array) {
    return array.slice(-1);
}
