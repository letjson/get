// jlogs.js

if (typeof jlogs !== 'function') jlogs = function () {
    var str = ':: ';
    for (var i in arguments) {
        if (typeof arguments[i] === "object") {
            str += JSON.stringify(arguments[i]);
        } else {
            str += arguments[i];
        }
        str += ', ';
    }
    console.log(str);
    return str;
}

if (typeof err !== 'function') err = function () {
    var str = ':: ';
    for (var i in arguments) {
        str += arguments[i];
        str += ', ';
    }
    console.error(str);
    return str;
}
