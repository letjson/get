// include-image.js
if (typeof log !== 'function') {
    const log = console.log;
}
/**
 *
 * @param url
 * @param target
 * @param replace
 * @param success
 * @param error
 * @returns {boolean|*}
 */
const includeImage = function (url, target, replace, success, error) {

    log(this, 'includeImg url: ', url);
    // JLOADS_DEBUG || log('el', el);
    try {
        var el = new E(target);
    } catch (err) {
        console.error('!Element not exist  ', target);
        error();
        return false;
    }
    var elmnt = el.first();
    log(this.constructor.name,'include Image elmnt :', elmnt);

    let img = new Image;
    img.onload = function () {
        log(this.constructor.name, "include Image onload url: ", url);
        log(this.constructor.name, "include Image replace: ", replace);

        if (typeof replace === 'number' && replace === 1) {
            replace = true;
        }
        // JLOADS_DEBUG || log('typeof self.cfg.replace', typeof self.cfg.replace);
        log(this.constructor.name, "include Image replace: ", replace);


        if (replace) {
            log(this.constructor.name, 'includeImage elmnt firstChild :', elmnt.firstChild);
            elmnt.removeChild(elmnt.firstChild);
            // let element = document.getElementById("top");
            // while (element.firstChild) {
            //     element.removeChild(element.firstChild);
            // }
        }
        elmnt.appendChild(img);
    };

    return img.src = url;  // erst nach dem Event Listener!
}
