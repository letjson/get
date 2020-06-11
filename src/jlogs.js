// jlogs.js

if (typeof jlogs !== 'function') {

    var print_log = function (arguments) {
        var str = ':: ';
        for (var i in arguments) {
            str += arguments[i];
            str += ', ';
        }
        console.log(str);
        return str;
    }
    var jlogs = function () {
        return print_log(arguments);
        // arguments[0] === 'Load' || print_log();
    }

}

if (typeof err !== 'function') {
    var print_error = function (arguments) {
        var str = ':: ';
        for (var i in arguments) {
            str += arguments[i];
            str += ', ';
        }
        console.error(str);
        return str;
    }
    var err = function () {
        return print_error(arguments);
        // arguments[0] === 'Load' || print_log();
    }

}
