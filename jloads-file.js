var map = {
    'js': 'js',
    'css': 'css',
    'css2': 'css',
    'css3': 'css',
    'png': 'img',
    'bmp': 'img',
    'jpg': 'img',
    'gif': 'img',
    'htm': 'html',
    'html': 'html',
    'html5': 'html',
    'json': 'json'
}
// ver.js
var JLOADS_VERSION='1.1.1';
// jlogs.js
if (typeof jlogs !== 'function') jlogs = function () {
    var str = ':: ';
    for (var i in arguments) {
        // console.log('--- jlogs', typeof arguments[i]);

        if (typeof arguments[i] === "undefined") {
            str += '';
        } else if (typeof arguments[i] === "boolean") {
            str += arguments[i];
        } else if (typeof arguments[i] === "number") {
            str += arguments[i];
        } else if (typeof arguments[i] === "string") {
            str += arguments[i];
            // str += arguments[i].innerHTML;
        } else if (typeof arguments[i] === "object") {
            str += JSON.stringify(arguments[i]);
        } else {
            str += xml2string(arguments[i]);
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
// https://www.html5rocks.com/en/tutorials/cors/
/**
 * @param method
 * @param url
 * @returns {{withCredentials}|XDomainRequest}
 */
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url, true);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}
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
!function(E,t,e){"use strict";var r=function(){if(!(this instanceof r)){var e=new r;return e.init.call(e,Array.prototype.slice.call(arguments))}var o,n=null,l={includeEmptyValuedElements:!1,w3cSuccessfulControlsOnly:!1},i=/[^\[\]]+|\[\]/g,a=null;function f(e){if(e&&"object"==typeof e)return Object.keys(e).filter(function(e){return!isNaN(parseInt(e,10))}).splice(-1)[0]}function c(e){var n=f(e);return"string"==typeof n?parseInt(n,10)+1:0}function s(e){if("object"!=typeof e||null===e)return 0;var n,t=0;if("function"==typeof Object.keys)t=Object.keys(e).length;else for(n in e)e.hasOwnProperty(n)&&t++;return t}function p(e){return"INPUT"===e.nodeName&&"radio"===e.type}function v(e){return"INPUT"===e.nodeName&&"checkbox"===e.type}function d(e){return"SELECT"===e.nodeName&&"select-multiple"===e.type}function y(e){return e.checked}function m(e){if(p(e))return!!y(e)&&e.value;if(v(e))return!!y(e)&&e.value;if("INPUT"===(t=e).nodeName&&"file"===t.type)return!(!a.enctype||"multipart/form-data"!==a.enctype)&&(n=e,E.FileList&&n.files instanceof E.FileList&&0<e.files.length?e.files:!(!e.value||""===e.value)&&e.value);var n,t,r,u;if("TEXTAREA"===e.nodeName)return!(!e.value||""===e.value)&&e.value;if("SELECT"===(r=e).nodeName&&"select-one"===r.type)return e.value&&""!==e.value?e.value:!(!e.options||!e.options.length||""===e.options[0].value)&&e.options[0].value;if(d(e)){if(e.options&&0<e.options.length){var i=[];return function(e,n){if([].forEach)return[].forEach.call(e,n);var t;for(t=0;t<e.length;t++)n.call(e,e[t],t)}(e.options,function(e){e.selected&&i.push(e.value)}),l.includeEmptyValuedElements?i:!!i.length&&i}return!1}return"BUTTON"===(u=e).nodeName&&"submit"===u.type?e.value&&""!==e.value?e.value:!(!e.innerText||""===e.innerText)&&e.innerText:void 0!==e.value&&(l.includeEmptyValuedElements?e.value:""!==e.value&&e.value)}function h(e,n,t,r){var u,i=n[0];if(p(e))return!1!==t?r[i]=t:void 0;if(v(e)){if(!1===t)return;if(u=e.name,1<Array.prototype.filter.call(o,function(e){return e.name===u}).length)return r[i]||(r[i]=[]),r[i].push(t);r[i]=t}if(d(e)){if(!1===t)return;r[i]=t}return r[i]=t}function g(e,n,t,r){var u,i,o=n[0];return 1<n.length?"[]"===o?(r[c(r)]={},g(e,n.splice(1,n.length),t,r[(u=r,i=f(u),"string"==typeof i?parseInt(i,10):0)])):(r[o]&&0<s(r[o])||(r[o]={}),g(e,n.splice(1,n.length),t,r[o])):1===n.length?("[]"===o?r[c(r)]=t:h(e,n,t,r),r):void 0}return{init:function(e){return!(!e||"object"!=typeof e||!e[0])&&(n=e[0],void 0!==e[1]&&0<s(e[1])&&function(e,n){var t;for(t in n)n.hasOwnProperty(t)&&(e[t]=n[t])}(l,e[1]),!!function(){switch(typeof n){case"string":a=t.getElementById(n);break;case"object":(e=n)&&"object"==typeof e&&"nodeType"in e&&1===e.nodeType&&(a=n)}var e;return a}()&&!!(o=a.querySelectorAll("input, textarea, select")).length&&function(){var e,n,t,r=0,u={};for(r=0;r<o.length;r++)!(n=o[r]).name||""===n.name||n.disabled||p(n)&&!y(n)||(!1!==(t=m(n))||l.includeEmptyValuedElements)&&(1===(e=n.name.match(i)).length&&h(n,e,t||"",u),1<e.length&&g(n,e,t||"",u));return 0<s(u)&&u}())}}};"function"==typeof define&&define.amd?define(function(){return r}):"object"==typeof module&&module.exports?module.exports=r:E.formToObject=r}(window,document);// get-file-extension.js
jlogs('exist?', 'getFileExtension');

/**
 *
 * @param filename
 * @returns {string}
 */
function getFileExtension(filename) {
    return filename.split("?")[0].split("#")[0].split('.').pop();
}
// has-domain.js
jlogs('exist?','hasDomain');
/**
 * @param url
 * @returns {boolean}
 */
var hasDomain = function (url) {
    return url.indexOf('//') === 0 || url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
}
// is-array.js
jlogs('exist?','isArrayMany');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isArrayMany(val) {
    return val !== null &&
        (val instanceof Array && Object.keys(val).length > 1)
    // obj.constructor.toString().indexOf("Array") != -1
        ;
}
// is-array.js
jlogs('exist?','isArrayNotEmpty');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isArrayNotEmpty(val) {
    return val !== null &&
        (val instanceof Array && Object.keys(val).length > 0)
        ;
}
// is-array.js
jlogs('exist?','isArrayOne');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isArrayOne(val) {
    return val !== null &&
        (val instanceof Array && Object.keys(val).length === 1)
    // obj.constructor.toString().indexOf("Array") != -1
        ;
}
// is-array.js
jlogs('exist?','isArray');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isArray(val) {
    return val !== null &&
        (val instanceof Array)
    // obj.constructor.toString().indexOf("Array") != -1
        ;
}
// is-array.js
jlogs('exist?','isBoolean');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isBoolean(val) {
    return val !== null &&
        (typeof val === 'boolean')
        ;
}
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
// is-array.js
jlogs('exist?','isNumberGt');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isNumberGt(val, number) {
    return val !== null &&
        (typeof val === 'number' && val > number)
        ;
}
// is-array.js
jlogs('exist?','isNumberLt');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isNumberLt(val, number) {
    return val !== null &&
        (typeof val === 'number' && val < number)
        ;
}
// is-array.js
jlogs('exist?','isNumber');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isNumber(val) {
    return val !== null &&
        (typeof val === 'number')
        ;
}
// is-array.js
jlogs('exist?','isObject');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isObject(val) {
    return val !== null &&
        !(val instanceof Array) &&
        (typeof val === 'object' && Object.keys(val).length > 0)
        ;
}
// is-array.js
jlogs('exist?','isStringEncoded');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isStringEncoded(val, type) {
    // base64, md5
    return val !== null &&
        (typeof val === 'string' && val.length > 0)
        ;
}
// is-array.js
jlogs('exist?','isString');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isString(val, type) {
    // base64, md5
    return val !== null &&
        (typeof val === 'string' && val.length > 0)
        ;
}
// is-array.js
jlogs('exist?','isString');
/**
 *
 * @param val
 * @returns {boolean}
 */
function isString(val) {
    return val !== null &&
        (typeof val === 'string' && val.length > 0)
        ;
}
//time.js
jlogs('exist?','time');

var time = Date.now || function () {
    return +new Date;
};
// xhr.js
jlogs('exist?','getXHRObject');
/**
 * @returns {boolean}
 */
function getXHRObject() {
    var xhrObj = false;
    try {
        xhrObj = new XMLHttpRequest();
    } catch (e) {
        var progid = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
            'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var i = 0; i < progid.length; ++i) {
            try {
                xhrObj = new ActiveXObject(progid[i]);
            } catch (e) {
                continue;
            }
            break;
        }
    } finally {

        return xhrObj;
    }
}
// xml2string.js
function xml2string(node) {
    if (typeof (XMLSerializer) !== 'undefined') {
        var serializer = new XMLSerializer();
        return serializer.serializeToString(node);
    } else if (node.xml) {
        return node.xml;
    }
}
// include-html.js
jlogs('exist?', 'includeHtml');

/**
 *
 * @param url
 * @param target
 * @param replace
 * @param success
 * @param error
 * @returns {includeHtml|boolean}
 */
function includeHtml(url, target, replace, success, error) {
    var f = 'includeHtml';

    if (typeof replace === 'number' && replace === 1) {
        replace = true;
    }

    if (typeof success !== 'function') {
        success = function () {
            jlogs(f, ' success ', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            jlogs(f, ' error ', "Page not found.");
        }
    }
    jlogs(f, ' url ', url);
    // if html content, NOT URL
    jlogs(f, ' includeHtml HTML target : ', target, getTarget(target));

    if (url.length > 100) {
        getTarget(target).insertAdjacentHTML('beforeend', url);
        return success(this);
    } else if (url) {
        /* Make an HTTP request using the attribute value as the url name: */
        var xhrObj = getXHRObject();
        // xhrObj.setRequestHeader("Content-Type","text/html; charset=UTF-8");
        // xhrObj.setRequestHeader("Content-Type","multipart/form-data; boundary=something");
        xhrObj.onreadystatechange = function () {

            jlogs(f, ' getXHRObject target: ', target);

            if (this.readyState == 4) {
                // document.onload =
                loadHtmlByStatus(this.status, this.responseText, target, replace, success, error);

                /* Remove the attribute, and call this function once more: */
                // includeHtml(url, success, error);
            }
        }
        xhrObj.open("GET", url, true);
        // xhrObj.responseType = 'text';
        xhrObj.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhrObj.send();
        /* Exit the function: */
        return this;
    }
    return false;

}

// include-image.js
jlogs('exist?', 'includeImage');

/**
 *
 * @param url
 * @param target
 * @param replace
 * @param success
 * @param error
 */
function includeImage(url, target, replace, success, error) {
    var f = 'includeImage';

    jlogs(f, ' includeImg url: ', url);
    jlogs(f, ' includeImg target: ', target);


    // img.onload = function () {
    // jlogs(f, "include Image onload url: ", url);
    // jlogs(f, "include Image replace: ", replace);

    if (typeof replace === 'number' && replace === 1) {
        replace = true;
    }
    // JLOADS_DEBUG ||jlogs('typeof self.cfg.replace', typeof self.cfg.replace);
    jlogs(f, "include Image replace: ", replace);


    if (replace) {
        jlogs(f, 'includeImage getTarget(target): ', getTarget(target));
        jlogs(f, 'includeImage getTarget(target) firstChild: ', getTarget(target).firstChild);
        // getTarget(target).removeChild(getTarget(target).firstChild);

        onSelector(target, function (selector, element) {
            jlogs(f, 'onSelector insertAdjacentHTML selector, element ', selector, target, element);
            // element.removeChild(element);
            getTarget(target).removeChild(getTarget(target).firstChild);
            var img = new Image;
            img.src = url;  // erst nach dem Event Listener!
            element.appendChild(img);
        });
        return success(this);
        // var element = document.getElementById("top");
        // while (element.firstChild) {
        //     element.removeChild(element.firstChild);
        // }
    }
    // getTarget(target).appendChild(img);

    onSelector(target, function (selector, element) {
        jlogs(f, 'onSelector insertAdjacentHTML selector, element ', selector, target, element);
        var img = new Image;
        img.src = url;  // erst nach dem Event Listener!
        element.appendChild(img);
    });
    // };

}
// include-script.js
jlogs('exist?', 'includeScript');

/**
 *
 * @param url
 * @param target
 * @param success
 * @param error
 * @returns {HTMLScriptElement}
 */
function includeScript(url, target, replace, success, error) {
    var f = 'includeScript';
    if (typeof replace === 'number' && replace === 1) {
        replace = true;
    }

    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.defer = true;
    // scriptTag.setAttribute('defer','');
    // scriptTag.async = true;
    scriptTag.type = 'text/javascript';

    scriptTag.onerror = error;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;

    if (replace) {
        jlogs(f, ' replace getTarget(target): ', getTarget(target));
        jlogs(f, ' replace getTarget(target) firstChild: ', getTarget(target).firstChild);
        // getTarget(target).removeChild(getTarget(target).firstChild);
        onSelector(target, function (selector, element) {
            jlogs('onSelector includeScript target getTarget(target) selector element: ', selector, element);
            getTarget(selector).removeChild(getTarget(selector).firstChild);
            getTarget(selector).appendChild(scriptTag);
        });
        return success(this);
    }
    onSelector(target, function (selector, element) {
        jlogs('onSelector includeScript target getTarget(target) selector element: ', selector, element);
        getTarget(selector).appendChild(scriptTag);
    });
    // return getTarget(target).appendChild(scriptTag);
}
// include-style.js
jlogs('exist?', 'includeStyle');
/**
 *
 * @param url
 * @param target
 * @param success
 * @param error
 * @returns {HTMLLinkElement}
 */
function includeStyle(url, target, replace, success, error) {
    var f = 'includeStyle';
    if (typeof replace === 'number' && replace === 1) {
        replace = true;
    }

    var link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';

    link.onerror = error;
    link.onload = success;
    link.onreadystatechange = success;

    if (replace) {
        jlogs(f, ' replace getTarget(target): ', getTarget(target));
        jlogs(f, ' replace getTarget(target) firstChild: ', getTarget(target).firstChild);
        // getTarget(target).removeChild(getTarget(target).firstChild);


        onSelector(target, function (selector, element) {
            jlogs('onSelector includeStyle target, getTarget(target), selector, element ',  selector, element);
            // getTarget(selector).appendChild(link);
            getTarget(selector).removeChild(getTarget(selector).firstChild);
            getTarget(selector).appendChild(link);
        });
        return success(this);
    }

    onSelector(target, function (selector, element) {
        jlogs('onSelector includeStyle target, getTarget(target), selector, element ',  selector, element);
        getTarget(selector).appendChild(link);
    });
    // return getTarget(target).appendChild(link);
}
// TODO: replce path to id name and check if ID exist
// FASTEST loading:
// https://www.oreilly.com/library/view/even-faster-web/9780596803773/ch04.html
// document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);
// window.addEventListener("load", pageFullyLoaded, false);
//
// function theDomHasLoaded(e) {
//     // do something
// }
//
// function pageFullyLoaded(e) {
//     // do something again
// }

//
// runScript();
//
// function runScript() {
//     // Script that does something and depends on jQuery being there.
//     if (window.$) {
//         // do your action that depends on jQuery.
//     } else {
//         // wait 50 milliseconds and try again.
//         window.setTimeout(runScript, 50);
//     }
// }

/*

// end of first.js

var execute;

// saving our position
var scripts = document.getElementsByTagName("script");
var i = scripts.length;

// breaking getElementById
var byId = document.getElementById;
document.getElementById = null;

var interval = setInterval(function () {
    if (i != scripts.length) {
        var second = scripts[i];
        // stop polling
        clearInterval(interval);
        // fix getElementById
        document.getElementById = byId;
        // set the delayed callback
        execute = function (onload) {
            var script = document.createElement("script");
            script.src = second.src;
            script.onload = script.onreadystatechange = onload;
            document.getElementsByTagName("head")[0].appendChild(script);
        };
    }
}, 100);
// anytime you wanna execute second.js

execute(function(){
    // second.js dependant code goes here...
});
*/

// https://medium.com/snips-ai/how-to-block-third-party-scripts-with-a-few-lines-of-javascript-f0b08b9c4c0

// https://requirejs.org/docs/jquery.html
// e.js
jlogs('exist?', 'E');
/**
 *
 * @param selector
 * @param area
 * @param error
 * @param success
 * @returns {E}
 * @constructor
 */
var E = function (selector, area, error, success) {

    this.cfg = {};
    this.cfg.area = document;
    this.cfg.selector = selector;
    this.cfg.exist = false;

    if (typeof success === 'function') {
        this.success = success;
    } else {
        this.success = function (elem) {
            jlogs(this.constructor.name, " Element func success(): ", elem);
        };
    }

    if (typeof error === 'function') {
        this.error = error;
    } else {
        this.error = function (elem) {
            jlogs(this.constructor.name, "! Element func error(): ", elem);
        };
    }

    if (typeof this.cfg.selector !== 'string') {
        jlogs(this.constructor.name, "! Element selector: ", elem);
    }


    var self = this;


    self.selector = function (selector) {
        self.cfg.selector = selector;
        return self;
    }

    self.first = function (success, error) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }
        if (typeof self.cfg.selector !== 'string') {
            self.cfg.exist = false;
            error();
        }
        var elem = document.querySelector(self.cfg.selector);

        jlogs(this.constructor.name, ' first self.cfg.selector ', self.cfg.selector);
        jlogs(this.constructor.name, ' first elem ', elem);

        if (elem !== null) {
            self.cfg.exist = true;
            success(elem);
            return elem;
        } else {
            self.cfg.exist = false;
            error();
        }

        return elem;
    }

    self.all = function (error, success) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }

        var elem = document.querySelectorAll(self.cfg.selector);

        jlogs(this.constructor.name, ' all self.cfg.selector ', self.cfg.selector);
        jlogs(this.constructor.name, ' all elem ', elem);

        if (elem !== null) {
            self.cfg.exist = true;
            success(elem);
        } else {
            self.cfg.exist = false;
            error(elem);
        }

        return elem;
    }

    return self;
};
// event-response.js

/**
 *
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 * @constructor
 */
jlogs('exist?', 'eventResponse');
if (typeof eventResponse !== 'function') eventResponse = function (selector, event, response) {
    var f = 'jloadsEvent eventResponse';
    jlogs(f, ' selector ', selector);
    jlogs(f, ' event ', event);

    var success = function (data) {
        console.table('FORM success', data);
    };
    var error = function (data) {
        console.error('!FORM', data);
    }


    var form = new RestForm(selector, response, error, success);

    form.cfg({
        "target": selector,
        "url": "//api.paas.info/index.php",
        "method": "GET",
        "event": "submit"
    });

    form.url((window.location.hostname === 'localhost') ? "//localhost:8000/index.php" : "//php.jloads.com/index.php");

    form.submit();
}
// get-target.js
jlogs('exist?', 'getTarget');

/**
 *
 * @param selector
 * @returns {HTMLHeadElement}
 */
function getTarget(selector) {
    var f = 'getTarget';

    if(typeof selector === 'string'){
        if(selector === 'html'){
            return document;
        }
        jlogs(f, 'str selector', selector);
        var target = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector) || document.getElementsByTagName('head')[0] || document.body;
        jlogs(f, 'target', target, typeof target);
        return target;
    }

    jlogs(f, 'obj selector', selector);
    //jlogs(f, ' target ', target);
    // if (isEmpty(target)) {
    //     target = document.getElementsByTagName('head')[0];
    //     jlogs(f, ' isEmpty HEAD ', target, typeof target, target.innerHTML !== 'undefined', target.innerHTML.length, Object.keys(target));
    //     if (isEmpty(target)) {
    //         target = document.body;
    //         jlogs(f, ' isEmpty BODY ', target);
    //     }
    // }
    // jlogs(f, 'target', target);

    return selector;
}
// jloads-event.js
/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
jlogs('exist?', 'jloadsEvent');
if (typeof jloadsEvent !== 'function') jloadsEvent = function (json, success, error, mapFunction) {
    var f = 'jloadsEvent';

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
    }

    if (typeof error !== 'function' && (typeof error !== 'object' || error === null)) {
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }

    if (typeof mapFunction !== 'object' && typeof map === 'object') {
        // Configuration
        mapFunction = map;
    }
    jlogs(' jloadsEvent', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    // jlogs('jloadsEvent selectorEvent ', ' elem ', elem, !isEmpty(elem));
    jlogs('jloadsEvent selectorEvent selector', selector);
    var jloads = new Load({
        target: selector,
        success: success,
        error: error,
        //replace: 1,
    });

    if (Object.keys(json).length === 1) {
        var selector = Object.keys(json)[0];
        var event = json[selector];
        selectorEvent(jloads, selector, event, mapFunction, success, error)
    } else {
        for (var selector in json) {
            var event = json[selector];
            selectorEvent(jloads, selector, event, mapFunction, success, error)
        }
    }
    // success(json);

    return jloads;
}

// load-url-data.js

/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'loadUrlData');
if (typeof loadUrlData !== 'function') loadUrlData = function (jloads, object, mapFunction, success, error) {

    var f = 'jloadsEvent loadUrlData';

    jlogs(f, ' isArray object, elem, mapFunction', object, isArray(object), mapFunction);

    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            jlogs(f, ' isArray', ' id ', id);
            url = object[id];
            jlogs(f, ' isArray', ' url ', url);

            if (typeof url === 'string') {
                try {
                    // base64 in url
                    if (url.length > 200) {
                        jloads['img'](url);
                    } else {
                        var funcName = getFunctionName(url, mapFunction, 'loadUrlData');
                        jlogs(f, ' funcName ', funcName);
                        //jlogs(funcName, url, elem);
                        jloads[funcName](url);
                    }
                    success(url);
                } catch (e) {
                    //jlogs(f, ' ERROR elem ', elem);
                    jlogs(f, ' ERROR e ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    } else {
        jlogs(f, ' isArray ERROR object', object);
        error(object);
    }
}
// get-target.js
jlogs('exist?', 'getTarget');

/**
 *
 * @param selector
 * @returns {HTMLHeadElement}
 */
function onSelector(selector, callback) {
    var f = 'onSelector';

    jlogs(f, 'selector typeof', selector, typeof selector);

    if (typeof selector === 'string') {

        var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
        // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector) || document.getElementsByTagName('head')[0] || document.body;
        jlogs(f, ' elem ', elem);

        if (!isEmpty(elem)) {
            return callback(selector, elem);
        } else {
            // if (i === 'head') {
            //     loadContentByUrls(jloads, object, mapFunction, success, error);
            //     success(jloads.getTarget());
            // } else if (i === 'body') {
            //     jlogs(f, ' wait for body i ', i);
            //     jlogs(f, ' wait for body target ', jloads.getTarget());
            //     document.addEventListener("DOMContentLoaded", function () {
            //         ReadyHtml(object, i, mapFunction, success, error);
            //     });
            // } else {
            //     jlogs(f, ' wait for element i ', i);
            //     jlogs(f, ' wait for element target ', jloads.getTarget());
            //
            //     try {
            //         // set up the mutation observer
            //         var observer = new MutationObserver(function (mutations, me) {
            //             // `mutations` is an array of mutations that occurred
            //             // `me` is the MutationObserver instance
            //             // var canvas = document.getElementById('my-canvas');
            //             var canvas = document.querySelectorAll(i)[0] || document.querySelectorAll(i)
            //             if (canvas) {
            //                 // callback executed when canvas was found
            //                 ReadyHtml(object, i, mapFunction, success, error);
            //                 me.disconnect(); // stop observing
            //                 return;
            //             }
            //         });
            //
            //         // start observing
            //         observer.observe(document, {
            //             childList: true,
            //             subtree: true
            //         });
            //
            //     } catch (e) {
            //         //jlogs(f, ' ERROR elem ', elem);
            //         jlogs(f, ' getOne ERROR e ', e);
            //         error(e);
            //     }
            // }
            waitFor(selector, 40, function (selector) {
                var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
                // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
                jlogs('onSelector waitFor selector', selector);
                jlogs('onSelector waitFor document.querySelectorAll', document.querySelectorAll(selector));
                return callback(selector, elem);
            });
            return;
        }

    } else {

        jlogs(f, 'elem NOT', selector);
        selector = 'body';
        // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
        // document.addEventListener("DOMContentLoaded", function () {
        //     var elem = document.body;
        //     jlogs(f, 'elem NOT DOMContentLoaded', selector);
        //     callback(selector, elem);
        // });
        // waitFor(selector, 40, function (selector) {
        //     var elem = document.body;
        //     // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
        //     console.log('onSelector waitFor selector', selector);
        // });


        document.addEventListener("DOMContentLoaded", function(event) {
            var elem = document.body;
            jlogs(f, 'elem NOT DOMContentLoaded selector', selector, elem);
            jlogs(f, 'elem NOT DOMContentLoaded elem',  elem);
            callback(selector, elem);
        });

    }
}
// ready-html.js
/**
 *
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 * @constructor
 */
jlogs('exist?', 'ReadyHtml');
if (typeof ReadyHtml !== 'function') ReadyHtml = function (url, selector, mapFunction, success, error) {
    var f = 'jloadsTarget ReadyHtml';

    jlogs(f, 'url:', url);
    jlogs(f, 'selector:', selector);
    // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector) || document.body;
    var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);

    console.log(f, ' elem ', elem);
    // jlogs(f, ' elem ', elem);

    var l = new Load({
        target: selector,
        success: success,
        error: error,
       // replace: 1,
    });

    if (!isEmpty(elem)) {
        // loadContentByUrls(jloads, object, mapFunction, success, error);
        var funcName = getFunctionName(url, mapFunction, 'ReadyHtml');
        jlogs(f, ' funcName ', funcName);
        //jlogs(funcName, url, elem);
        l[funcName](url);

        return success(elem);
    } else {
        waitFor(selector, 40, function (i) {
            // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
            var l = new Load({
                target: i,
                success: success,
                error: error,
                //replace: 1,
            });
            loadContentByUrls(l, url, mapFunction, success, error);
        });
        // error(elem);
    }
}
// selector-event-target.js

// TODO: base lib APIFUNC, with E

/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'selectorEventTarget');
if (typeof selectorEventTarget !== 'function') selectorEventTarget = function (selector, event, targets, success, error) {

    var f = 'jloadsForm selectorEventTarget';

    var target = Object.keys(targets)[0];
    jlogs(f, 'selector event target', selector, event, target);

    var n = target.indexOf(">");
    if (n > 0) {
        var se = target.split(">", 2);
        var target_group = se[0];
        var target_task = "append";
        var target_item = se[1];
    }

    jlogs(f, 'target_group, target_task, target_item', target_group, target_task, target_item);

    // jlogs(f, ' isArray target', target, isArray(target));
    console.log(f, ' getTarget(selector)', selector, getTarget(selector));
    if (selector === 'html' && event === 'onload') {
        event = "DOMContentLoaded";
    }
    // var element = new E(selector);
    // console.log(f, ' E', selector, element.first());

    // if (typeof selector === 'string') {
    try {

        if (typeof getTarget(selector) !== 'undefined') {
            append(targets, target, selector, event, target_group, target_item, f)
        } else {
            getTarget(selector).addEventListener(event, function () {
                append(targets, target, selector, event, target_group, target_item, f)
            });
        }

    } catch (e) {
        //jlogs(f, ' ERROR elem ', elem);
        jlogs(f, ' ERROR e ', e);
        error(e);
    }

    // jloads.js([selector]);
    // elem.appendChild(selector, funcName);
    // }

}
// selector-event.js


/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'selectorEvent');
if (typeof selectorEvent !== 'function') selectorEvent = function (jloads, selector, event, mapFunction, success, error) {
    var f = 'jloadsEvent selectorEvent';

    jlogs(f, ' event ', event);
    jlogs(f, ' selector ', selector);

    document.addEventListener("DOMContentLoaded", function () {
        jlogs(f, ' addEventListener eventResponse');

        eventResponse(selector, event, function (xhr) {
            console.log("xhr", xhr);
            AddMessage(xhr.status);
            AddMessage(xhr.statusText);
            AddMessage(xhr.response);
        });
    });
    /*
} else {
    jlogs(f, ' wait for element i ', i);
    jlogs(f, ' wait for element target ', jloads.getTarget());

    try {
        // set up the mutation observer
        var observer = new MutationObserver(function (mutations, me) {
            // `mutations` is an array of mutations that occurred
            // `me` is the MutationObserver instance
            // var canvas = document.getElementById('my-canvas');
            var canvas = document.querySelectorAll(i)[0] || document.querySelectorAll(i)
            jlogs(f, ' canvas ', canvas);

            if (canvas) {
                // callback executed when canvas was found
                ReadyHtml(object, i, mapFunction, success, error);
                me.disconnect(); // stop observing
                return;
            }
        });

        // start observing
        observer.observe(document, {
            childList: true,
            subtree: true
        });

    } catch (e) {
        //jlogs(f, ' ERROR elem ', elem);
        jlogs(f, ' selectorEvent ERROR e ', e);
        error(e);
    }
}
*/
    // error(elem);
}


// wait-for-selector.js

/**
 *
 * @param url
 * @param selector
 * @param mapFunction
 * @param success
 * @param error
 */
function waitForSelector(url, selector, mapFunction, success, error) {
    var f = 'jloadsTarget waitForSelector';

    if (isEmpty(url) || url.length < 2) {
        throw new Error('url not exits');
    }

    if (isEmpty(selector) || selector.length < 2) {
        throw new Error('map not exits');
    }

    try {
        jlogs(f, ' url: ', url);
        jlogs(f, ' selector: ', selector);
        // set up the mutation observer
        var observer = new MutationObserver(function (mutations, me) {
            // `mutations` is an array of mutations that occurred
            // `me` is the MutationObserver instance
            var l = new Load({
                target: selector,
                success: success,
                error: error,
                //replace: 1,
            });

            // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
            // if (elem) {
                // callback executed when canvas was found

                // loadContentByUrls(jloads, object, mapFunction, success, error);
                var funcName = getFunctionName(url, mapFunction, f);
                jlogs(f, ' funcName ', funcName);
                //jlogs(funcName, url, elem);
                l[funcName](url);


                me.disconnect(); // stop observing
                // return;
                return success(elem);

            // }

            // setTimeout(function () {
            //         jlogs(f, ' stop observing ', url);
            //         me.disconnect(); // stop observing
            //     },
            //     2000
            // )

        });

        // start observing
        observer.observe(document, {
            childList: true,
            subtree: false
        });

    } catch (e) {
        //jlogs(f, ' ERROR elem ', elem);
        jlogs(f, ' getOne ERROR e ', e);
        error(e);
    }
}
// wait-for.js
jlogs('exist?', 'waitFor');

/**
 *
 * @param selector
 * @param time
 * @param callback
 * @returns {*}
 */
function waitFor(selector, time, callback) {
    var f = 'waitFor';
    jlogs(f, ' selector ', selector);
    // console.log(f, ' selector document.querySelector(selector) ', typeof document.querySelector(selector), document.querySelector(selector));
    // console.log(f, ' selector document.querySelectorAll(selector) ', typeof document.querySelectorAll(selector), document.querySelectorAll(selector), document.querySelectorAll(selector).length);
    if (typeof document.querySelectorAll(selector) === 'object' && document.querySelectorAll(selector).length > 0) {
        // alert("The element is displayed, you can put your code instead of this alert.")
        return callback(selector);
    } else {
        setTimeout(function () {
            waitFor(selector, time, callback);
        }, time);
    }
}
// get-function-name.js
jlogs('exist?', 'getFunctionName');

/**
 *
 * @param url
 * @param map
 * @returns {*}
 */
function getFunctionName(url, map, parent) {
    var f = 'getFunctionName / ' + parent;

    if (isEmpty(url) || url.length < 2) {
        throw new Error('url not exits');
    }

    if (isEmpty(map) || map.length < 2) {
        throw new Error('map not exits');
    }

    var ext = getFileExtension(url);
    // jlogs(f, ' map ', map);
    jlogs(f, ' url ', url);
    jlogs(f, ' ext ', ext);
    var result = map[ext];
    jlogs(f, ' result ', result);

    if (isEmpty(result)) {
        throw new Error('key or Value Is Empty or Key not exits in Map');
    }

    return result;
}
// get-one.js
/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'getOne');
if (typeof getOne !== 'function') getOne = function (load, url, selector, mapFunction, success, error) {
    var f = 'jloadsTarget getOne';

    jlogs(f, ' load.getTarget() ', load.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (selector === 'head' || !isEmpty(load.getTarget())) {
    jlogs(f, ' selector ', selector);
    jlogs(f, ' url 1', url, typeof url, isString(url), Object.keys(url).length);

    if (isArray(url) && Object.keys(url).length === 1 && isString(url[0])) {
        url = url[0];
    }

    jlogs(f, ' url 2 ', url, typeof url, isString(url));

    if (isString(url)) {
        // if (selector === 'head') {
        //     loadContentByUrls(load, url, mapFunction, success, error);
        //     success(load.getTarget(selector));
        // } else if (selector === 'body') {
        //     jlogs(f, ' wait for body selector ', selector);
        //     jlogs(f, ' wait for body target ', load.getTarget(selector));

        // var reload = document.querySelector(selector);
        // reload.addEventListener("load", function (event) {
        //
        //     console.log(f, 'event::', event);
        //
        //     ReadyHtml(url, selector, mapFunction, success, error);
        // });
        // } else {
        jlogs(f, ' wait for element selector ', selector);
        jlogs(f, ' wait for element url ', url);
        // console.log(f, ' wait for element target ', load.getTarget(selector));

        // waitForSelector(url, selector, mapFunction, success, error)
        // waitForSelector(url, selector, mapFunction, success, error);

        var l = new Load({
            target: selector,
            success: success,
            error: error,
            replace: 0,
        });
        //l.replaceOff();
        // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
        // if (elem) {
        // callback executed when canvas was found

        // loadContentByUrls(jloads, object, mapFunction, success, error);
        var funcName = getFunctionName(url, mapFunction, f);
        jlogs(f, ' funcName ', funcName);
        //jlogs(funcName, url, elem);
        l[funcName](url);
        // }



    } else {
        var list = url;
        jlogs(f, ' url4 ', url);
        jlogs(f, ' list ', list);
        jlogs(f, ' list isArray', isArray(list));
        jlogs(f, ' list isObject', isObject(list));


        //
        if (isArray(list)) {
            for (var i in list) {
                var url = list[i];

                jlogs(f, 'isArray url5 ', url);
                jlogs(f, 'isArray list ', list);
                jlogs(f, 'isArray selector ', selector);

                getOne(load, url, selector, mapFunction, success, error);

                // waitForSelector(url, selector, mapFunction, success, error);
                //

            }//for
        } else if (isObject(list)) {

            url = Object.keys(list)[0];
            jlogs(f, 'isObject url5 ', url);
            jlogs(f, 'isObject list ', list);
            jlogs(f, 'isObject selector ', selector);

            getOne(load, url, selector, mapFunction, function () {
                for (var i in list) {
                    var object = list[i];
                    jlogs(f, 'isObject url6 i ', i);
                    jlogs(f, 'isObject url6 object ', object);
                    for (var ii in object) {
                        jlogs(f, 'isObject url5 object[ii], ii ', object[ii], ii);
                        getOne(load, object[ii], selector, mapFunction, success, error);
                    }
                }//for
            }, error);

        }
    }
    // error(elem);
}


// load.js
jlogs('exist?', 'Load');
/**
 *
 * @param cfg
 * @returns {Load}
 * @constructor
 */
var Load = function (cfg) {
    var f = 'Load';

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    this.cfg = {};
    this.cfg.env = {};
    this.cfg.env_id = 0;
    this.cfg.domain = {};
    this.cfg.target = 'body';
    this.cfg.delay = 0;
    this.cfg.cache = 1;
    this.cfg.replace = 0;
    this.cfg.success = 0;
    this.cfg.error = 0;

    if(!isEmpty(cfg)) {
        if(!isEmpty(cfg.env)) this.cfg.env = cfg.env;
        if(!isEmpty(cfg.env_id)) this.cfg.env_id = cfg.env_id;
        if(!isEmpty(cfg.domain)) this.cfg.domain = cfg.domain;
        if(!isEmpty(cfg.target)) this.cfg.target = cfg.target;
        if(!isEmpty(cfg.delay)) this.cfg.delay = cfg.delay;
        if(!isEmpty(cfg.cache)) this.cfg.cache = cfg.cache;
        if(!isEmpty(cfg.replace)) this.cfg.replace = cfg.replace;
        if(!isEmpty(cfg.success)) success = cfg.success;
        if(!isEmpty(cfg.error)) error = cfg.error;
    }

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        //throw new TypeError('Object success called on non-object');
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
    }

    if (typeof error !== 'function' && (typeof error !== 'object' || error === null)) {
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }

    this.success = success;
    this.error = error;



    var self = this;


    self.env = function (domain, name, callback) {
        self.cfg.env_id++;
        self.cfg.env[self.cfg.env_id] = {};
        self.cfg.env[self.cfg.env_id]['domain'] = domain;
        self.cfg.env[self.cfg.env_id]['name'] = name;
        self.cfg.env[self.cfg.env_id]['exist'] = callback;

        return self;
    };

    self.hasEnv = function () {
        return typeof self.cfg.env === 'object' && typeof self.cfg.env[1] !== 'undefined';
    };

    self.hasDomain = function () {
        return !isEmpty(self.getDomain());
    };

    self.getEnv = function (url) {
        jlogs(this.constructor.name, '.getEnv() url: ', url);

        if (hasDomain(url)) {
            jlogs(this.constructor.name, ' url has now own domain: ', url);
            return {
                'domain': ''
            };
        }
        if (self.hasEnv()) {
            jlogs(this.constructor.name, ' url has env:', self.cfg.env);
            for (var index in self.cfg.env) {
                if (self.cfg.env.hasOwnProperty(index)) {
                    jlogs(this.constructor.name, '.getEnv() function check: ', self.cfg.env[index]['name']);

                    var callback = self.cfg.env[index]['exist'];
                    if (typeof callback === 'function' && callback(self)) {
                        jlogs(this.constructor.name, '.getEnv() url use env: ', self.cfg.env[index]['name']);
                        return self.cfg.env[index];
                    }
                }
            }
        }
        if (self.getDomain()) {
            jlogs(this.constructor.name, '.getEnv() cfg domain exist ', self.cfg.domain);
            return {
                'domain': self.getDomain()
            };
        }

        // Has own domain ENV OR DOMAIN not exist
        return {
            'domain': ''
        };
    };

    // this.getEnvById = function (env_id) {
    //
    //     if (typeof self.cfg.env !== 'function' && (typeof self.cfg.env !== 'object' || self.cfg.env === null)) {
    //         throw new TypeError('Object self.cfg.env called on non-object');
    //     }
    //
    //     return self.cfg.env[env_id];
    // };


    self.getDomain = function () {
        //jlogs(this.constructor.name, '.getDomain() self.cfg.domain',
        //     self.cfg.domain, typeof self.cfg.domain === 'object' , Object.keys(self.cfg.domain).length === 0);

        if (isEmpty(self.cfg.domain)) {
            jlogs(this.constructor.name, '.getDomain() isEmpty');
            return false;
        }

        for (var index in self.cfg.domain) {

            jlogs(this.constructor.name, '.getDomain() function check: ', index, self.cfg.domain);
            return self.cfg.domain[index];
            /*
                        if (self.cfg.domain.hasOwnProperty(index)) {
                            console.log('self.cfg.', self.cfg, self.cfg.domain, index);
                            // var callback = self.cfg.domain[index]['exist'];
                            // if (typeof callback === 'function' && callback()) {
                            //    jlogs(this.constructor.name, '.getDomain() url use env:', self.cfg.domain[index]);
                            return self.cfg.domain[index];
                            // }
                        }
                        */

        }
        jlogs(this.constructor.name, '.getDomain() for not');
        return false;
    };

    self.addDomain = function (domain, id) {
        var obj = {}
        if (isEmpty(id)) {
            id = time();
        }
        obj[id] = domain;
        Object.assign(self.cfg.domain, obj);

        jlogs(this.constructor.name, '.addDomain() cfg domain', self.cfg.domain);
        jlogs(this.constructor.name, '.addDomain() cfg getDomain()', self.getDomain());

        // self.cfg.domain = domain;
        return self;
    };

    self.domain = function (domain, id) {
        return self.addDomain(domain, id);
    };


    self.target = function (target) {
        self.cfg.target = target;
        return self;
    };
    self.getTarget = function () {
        return self.cfg.target;
    };

    self.delay = function (delay) {
        self.cfg.delay = delay;
        return this;
    };


    self.cache = function (cache) {
        self.cfg.cache = cache;
        return self;
    };
    self.cacheOff = function () {
        self.cfg.cache = 0;
        return self;
    };
    self.cacheOn = function () {
        self.cfg.cache = 1;
        return self;
    };
    self.hasCache = function () {
        return typeof self.cfg.cache === 'number' && self.cfg.cache !== 1;
    };
    self.getSuffix = function () {
        var suffix = '';
        if (self.hasCache()) {
            suffix = '?' + time();
        }
        return suffix;
    };
    self.getEnvDomain = function (url) {
        return self.getEnv(url).domain;
    };
    self.getEnvUrl = function (url) {
        return self.getEnvDomain(url) + url + self.getSuffix();
    };


    self.replace = function (replace) {
        self.cfg.replace = replace;
        return self;
    };
    self.replaceOff = function () {
        self.cfg.replace = 0;
        return self;
    };
    self.replaceOn = function () {
        self.cfg.replace = 1;
        return self;
    };


    self.loadJs = function (url, target, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' js url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' js script_url ', script_url);

                try {
                    if (last) {
                        includeScript(script_url, target,  self.cfg.replace, success, error);
                    } else {
                        includeScript(script_url, target, self.cfg.replace);
                    }
                    jlogs(this.constructor.name, ' js ', script_url);
                } catch (e) {
                    err('! js ', script_url, e);
                    // error();
                }
            }
        } else {
            includeScript(self.getEnvUrl(url), target,  self.cfg.replace, success, error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };
    self.js = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' js delayed ', self.cfg.delay, url);
                    self.loadJs(url, self.cfg.target, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' js url ', url);
            self.loadJs(url, self.cfg.target, self.success, self.error);
        }
        return self;
    };
    self.javascript = self.js;
    self.script = self.js;


    self.loadCss = function (url, target, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);

            for (var i in url) {
                //jlogs(this.constructor.name, ' url:', url, i, url[i]);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' loadCss script_url ', script_url);

                try {
                    var exe = includeStyle(script_url, target,  self.cfg.replace, success, error);
                    jlogs(this.constructor.name, ' loadCss exe ', exe);
                } catch (e) {
                    err('!load CSS ', script_url, e);
                }
            }
        } else {
            includeStyle(self.getEnvUrl(url), target,  self.cfg.replace, success, error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };

    self.css = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' css delayed ', self.cfg.delay, url);
                    self.loadCss(url, self.cfg.target, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' css loaded ', url);
            self.loadCss(url, self.cfg.target, self.success, self.error);
        }
        return self;
    };
    self.style = self.css;


    self.html = function (url) {
        jlogs(this.constructor.name, ' self.cfg.delay ', self.cfg.delay);

        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' html delayed ', self.cfg.delay, url);
                    self.loadHtml(url);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' html url ', url);
            self.loadHtml(url);
        }
        return self;
    };

    self.loadHtml = function (url) {
        jlogs(this.constructor.name, ' self.cfg.target ', self.cfg.target);

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' html url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' html script_url ', script_url);

                try {
                    // if (last) {
                    includeHtml(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // } else {
                    //     var exe = includeHtml(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // }
                    jlogs(this.constructor.name, ' html ', script_url);
                } catch (e) {
                    err('! html ', script_url, e);
                    // error();
                }
            }
        } else {
            includeHtml(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };


    self.img = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' image delayed', self.cfg.delay, url);
                    self.loadImage(url);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' image loaded ', url, self.cfg.delay);
            self.loadImage(url);
        }
        return self;
    };

    self.loadImage = function (url, target, replace, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);

            for (var i in url) {

                jlogs(this.constructor.name, ' img url[i]', url[i]);
                var script_url = self.getEnvUrl(url[i]);

                try {
                    includeImage(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    jlogs(this.constructor.name, ' img ', script_url);
                } catch (e) {
                    err('! img ', script_url, e);
                }
            }
        } else {
            includeImage(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }
        return self;
    };


    self.json = function (url) {
        jlogs(this.constructor.name, ' self.cfg.delay ', self.cfg.delay);

        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' json delayed ', self.cfg.delay, url);
                    self.loadJson(url);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' json url ', url);
            self.loadJson(url);
        }
        return self;
    };

    self.loadJson = function (url) {
        jlogs(this.constructor.name, ' self.cfg.target ', self.cfg.target);

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' json url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' json script_url ', script_url);

                try {
                    // if (last) {
                    includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // } else {
                    //     var exe = includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // }
                    jlogs(this.constructor.name, ' json ', script_url);
                } catch (e) {
                    err('! json ', script_url, e);
                    // error();
                }
            }
        } else {
            loadJson(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };

    self.text = function (url) {
        jlogs(this.constructor.name, ' self.cfg.delay ', self.cfg.delay);

        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' text delayed ', self.cfg.delay, url);
                    self.loadJson(url);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' text url ', url);
            self.loadJson(url);
        }
        return self;
    };

    self.loadJson = function (url) {
        jlogs(this.constructor.name, ' self.cfg.target ', self.cfg.target);

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' text url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' text script_url ', script_url);

                try {
                    // if (last) {
                    includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // } else {
                    //     var exe = includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // }
                    jlogs(this.constructor.name, ' text ', script_url);
                } catch (e) {
                    err('! text ', script_url, e);
                    // error();
                }
            }
        } else {
            loadJson(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };

    return self;
};
/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'loadContentByUrls');
if (typeof loadContentByUrls !== 'function') loadContentByUrls = function (load, object, mapFunction, success, error) {

    var f = 'jloadsTarget loadContentByUrls';

    jlogs(f, ' isArray object: ', object);
    jlogs(f, ' isArray array: ', isArray(object));

    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            jlogs(f, ' isArray', ' id ', id);
            url = object[id];
            jlogs(f, ' isArray', ' url ', url);

            if (typeof url === 'string') {
                try {
                    // base64 in url
                    if (url.length > 200) {
                        load['img'](url);
                    } else {
                        var funcName = getFunctionName(url, mapFunction, 'loadContentByUrls');
                        jlogs(f, ' funcName ', funcName);
                        //jlogs(funcName, url, elem);
                        load[funcName](url);
                    }
                    success(url);
                } catch (e) {
                    //jlogs(f, ' ERROR elem ', elem);
                    jlogs(f, ' ERROR e ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    } else {
        jlogs(f, ' isArray ERROR object', object);
        error(object);
    }
}
// load-html-by-status.js
jlogs('exist?', 'loadHtmlByStatus');

/**
 *
 * @param status
 * @param responseText
 * @param target
 * @param success
 * @param error
 * @returns {*}
 */
function loadHtmlByStatus(status, responseText, target, replace, success, error) {
    var f = 'loadHtmlByStatus';

    jlogs(f, ' includeHtml waiting for DOM tree ', target);

    if (status == 200) {
        jlogs(f, ' includeHtml loaded: ', target);
        onSelector(target, function (selector, element) {
            jlogs(f, 'onSelector insertAdjacentHTML selector, element ', selector, target, element);
            // jlogs('onSelector insertAdjacentHTML responseText  ', responseText);
            if (replace) {
                jlogs(f, 'replaced', replace);
                element.innerHTML = '';
            }
            element.insertAdjacentHTML('beforeend', responseText);

        });
        return success(this);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "includeHtml Page not found.";
        return error(this, status);
    }
    return error(this);
}
// load-json-by-status.js
jlogs('exist?', 'loadJsonByStatus');

/**
 * @param status
 * @param responseText
 * @param url
 * @param success
 * @param error
 * @returns {*}
 */
function loadJsonByStatus(status, responseText, url, success, error) {
    var f = 'loadJsonByStatus';

    if (status == 200) {
        jlogs(f, ' loadJson loaded HTML: ', responseText);
        return success(JSON.parse(responseText), url);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "loadJson Page not found.";
        return error(this, status);
    }
    return error(responseText);
}
// load-json.js
jlogs('exist?', 'loadJson');

/**
 *
 * @param url
 * @param success
 * @param error
 * @returns {html|boolean}
 */
function loadJson(url, success, error) {
    var f = 'loadJson';


    if (typeof success !== 'function') {
        success = function () {
            jlogs(f, ' success ', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            jlogs(f, ' error ', "Page not found.");
        }
    }
    jlogs(f, ' url ', url);

    if (url.length > 5) {

        /* Make an HTTP request using the attribute value as the url name: */
        var xhrObj = getXHRObject();
        // xhrObj.setRequestHeader("Content-Type","text/html; charset=UTF-8");
        // xhrObj.setRequestHeader("Content-Type","multipart/form-data; boundary=something");
        xhrObj.onreadystatechange = function () {

            if (this.readyState == 4) {
                // document.onload =
                loadJsonByStatus(this.status, this.responseText, url, success, error);

                /* Remove the attribute, and call this function once more: */
                // loadJson(url, success, error);
            }
        }
        xhrObj.open("GET", url, true);
        // xhrObj.responseType = 'text';
        xhrObj.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhrObj.send();
        /* Exit the function: */
        return success(this);
    }
    return false;
}
// load-text-by-status.js
jlogs('exist?', 'loadTextByStatus');

/**
 * @param status
 * @param responseText
 * @param url
 * @param success
 * @param error
 * @returns {*}
 */
function loadTextByStatus(status, responseText, url, success, error) {
    var f = 'loadTextByStatus';

    if (status == 200) {
        jlogs(f, ' loadText loaded: ', responseText);
        return success(responseText, url);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "loadText Page not found.";
        return error(this, status);
    }
    return error(responseText);
}
// load-text.js
jlogs('exist?', 'loadText');

/**
 *
 * @param url
 * @param success
 * @param error
 * @returns {html|boolean}
 */
function loadText(url, success, error) {
    var f = 'loadText';


    if (typeof success !== 'function') {
        success = function () {
            jlogs(f, ' success ', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            jlogs(f, ' error ', "Page not found.");
        }
    }
    jlogs(f, ' url ', url);

    if (url.length > 5) {

        /* Make an HTTP request using the attribute value as the url name: */
        var xhrObj = getXHRObject();
        // xhrObj.setRequestHeader("Content-Type","text/html; charset=UTF-8");
        // xhrObj.setRequestHeader("Content-Type","multipart/form-data; boundary=something");
        xhrObj.onreadystatechange = function () {

            if (this.readyState == 4) {
                // document.onload =
                loadTextByStatus(this.status, this.responseText, url, success, error);

                /* Remove the attribute, and call this function once more: */
                // loadText(url, success, error);
            }
        }
        xhrObj.open("GET", url, true);
        // xhrObj.responseType = 'text';
        xhrObj.setRequestHeader('Content-type', 'application/text; charset=utf-8');

        xhrObj.send();
        /* Exit the function: */
        return success(this);
    }
    return false;

}

// jloads.js
jlogs('exist?', 'jl');

var jl = new jloads();
// jloads-file.js
/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
jlogs('exist?', 'jloadsFile');
if (typeof jloadsFile !== 'function') waitForSelector = function (json, success, error, mapFunction) {
    var f = 'jloadsFile';

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
    }

    if (typeof error !== 'function' && (typeof error !== 'object' || error === null)) {
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }


    if (typeof mapFunction !== 'object' && typeof map === 'object') {
        // Configuration
        mapFunction = map;
    }
    jlogs(' jloadsFile', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    var url = Object.keys(json)[0];
    jlogs('jloadsFile getOne ', ' url ', url);
    var jloads = new Load({
        target: i,
        success: success,
        error: error,
        //replace: 1,
    });

    console.log('!!!', Object.keys(json), json[url], url);
    if (Object.keys(json).length === 1) {

        //getOne(jloads, json[i], i, mapFunction, success, error)

        var funcName = getFunctionName(url, mapFunction, 'waitForSelector1');
        jlogs(f, ' funcName ', funcName, url);
        jloads[funcName](url);

        for (var i in json[url]) {
            var url2 = json[url][i];
            // getOne(jloads, object, i, mapFunction, success, error)
            var funcName = getFunctionName(url2, mapFunction, 'waitForSelector2');
            jlogs(f, ' funcName ', funcName, url2);
            jloads[funcName](url2);
        }

    // } else {
    //     for (var i in json) {
    //         var object = json[i];
    //         getOne(jloads, object, i, mapFunction, success, error)
    //     }
    }
    // success(json);

    return jloads;
}
// jloads-target.js

/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
jlogs('exist?', 'jloadsTarget');
if (typeof jloadsTarget !== 'function') jloadsTarget = function (json, success, error, mapFunction) {
    var f = 'jloadsTarget';

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
    }

    if (typeof error !== 'function' && (typeof error !== 'object' || error === null)) {
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }


    if (typeof mapFunction !== 'object' && typeof map === 'object') {
        // Configuration
        mapFunction = map;
    }
    jlogs(' jloadsTarget', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    // jlogs('jloadsTarget getOne ', ' elem ', elem, !isEmpty(elem));

    var i = Object.keys(json)[0];
    jlogs('jloadsTarget getOne ', ' i ', i);
    var jloads = new Load({
        target: i,
        success: success,
        error: error,
        replace: 1,
    });
    if (Object.keys(json).length === 1) {
        getOne(jloads, json[i], i, mapFunction, success, error)
    } else {
        for (var i in json) {
            var object = json[i];
            getOne(jloads, object, i, mapFunction, success, error)
        }
    }
    // success(json);

    return jloads;
}
