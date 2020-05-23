// include-style.js
/**
 *
 * @param url
 * @param target
 * @param success
 * @param error
 * @returns {HTMLLinkElement}
 */
function includeStyle(url, target, success, error) {
    var link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';

    link.onerror = error;
    link.onload = success;
    link.onreadystatechange = success;

    return getTarget(target).appendChild(link);
}
// TODO: replce path to id name and check if ID exist
// FASTEST loading:
// https://www.oreilly.com/library/view/even-faster-web/9780596803773/ch04.html
