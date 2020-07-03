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
