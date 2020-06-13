// jlogs.js

if (typeof jlogs !== 'function') jlogs = function () {
    var str = ':: ';
    for (var i in arguments) {
        console.log('--- jlogs', arguments[i], typeof arguments[i]);

        if (typeof arguments[i].innerHTML !== "undefined") {
            // str += arguments[i].innerHTML;
            str += xml2string(arguments[i]);
        } else if (typeof arguments[i] === "object") {
            str += JSON.stringify(arguments[i]);
        } else {
            str += arguments[i];
        }
        str += ', ';
    }
    console.log(str);
    return str;
}

function xml2string(node) {
    if (typeof(XMLSerializer) !== 'undefined') {
        var serializer = new XMLSerializer();
        return serializer.serializeToString(node);
    } else if (node.xml) {
        return node.xml;
    }
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
