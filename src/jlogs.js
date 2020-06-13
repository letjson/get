// jlogs.js

(typeof jlogs === 'function') || (jlogs = function () {
    var str = ':: ';
    for (var i in arguments) {
        str += arguments[i];
        str += ', ';
    }
    console.log(str);
    return str;
})

(typeof err === 'function') || (err = function () {
    var str = ':: ';
    for (var i in arguments) {
        str += arguments[i];
        str += ', ';
    }
    console.error(str);
    return str;
})
