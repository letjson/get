// jlogs.js

typeof jlogs === 'function' || function jlogs() {
    var str = ':: ';
    for (var i in arguments) {
        str += arguments[i];
        str += ', ';
    }
    console.log(str);
    return str;
}

typeof err === 'function' || function err() {
    var str = ':: ';
    for (var i in arguments) {
        str += arguments[i];
        str += ', ';
    }
    console.error(str);
    return str;
}
