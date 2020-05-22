// include-style.js
/**
 *
 * @param url
 * @param success
 * @param error
 * @returns {HTMLLinkElement}
 */
function createTagLink(url, success, error) {
    var link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';

    link.onerror = error;
    link.onload = success;
    link.onreadystatechange = success;

    return link;
}

// TODO: replce path to id name and check if ID exist
// FASTEST loading:
// https://www.oreilly.com/library/view/even-faster-web/9780596803773/ch04.html
function includeStyle(url, target, success, error) {
    // JLOADS_DEBUG || log(target, target == null);
    // return false;

    // var xhrObj = getXHRObject(); // defined in the previous example
    // xhrObj.onreadystatechange =
    //     function () {
    //         if (xhrObj.readyState == 4) {
    //             // var scriptElem = document.createElement('script');
    //             var scriptElem = document.createElement('style');
    //             document.getElementsByTagName('head')[0].appendChild(scriptElem);
    //             scriptElem.text = xhrObj.responseText;
    //         }
    //     };
    // xhrObj.open('GET', url, true); // must be same domain as main page
    // return xhrObj.send('');


    var link = createTagLink(url, success, error);
    return getTarget(target).appendChild(link);
}

