// include-image.js
/**
 *
 * @param url
 * @param target
 * @param replace
 * @param success
 * @param error
 * @returns {boolean|*}
 */
function includeImage(url, target, replace, success, error) {

    if (typeof IMAGE_DEBUG === 'undefined') {
        var IMAGE_DEBUG = true;
    }

    IMAGE_DEBUG || console.log('includeImg url: ', url);
    // JLOADS_DEBUG || console.log('el', el);
    try {
        var el = new E(target);
    } catch (err) {
        console.error('!Element not exist  ', target);
        error();
        return false;
    }
    var elmnt = el.first();
    IMAGE_DEBUG || console.log('include Image elmnt :', elmnt);

    let img = new Image;
    img.onload = function () {
        IMAGE_DEBUG || console.log("include Image onload url: ", url);
        IMAGE_DEBUG || console.log("include Image replace: ", replace);

        if (typeof replace === 'number' && replace === 1) {
            replace = true;
        }
        // JLOADS_DEBUG || console.log('typeof self.cfg.replace', typeof self.cfg.replace);
        IMAGE_DEBUG || console.log("include Image replace: ", replace);


        if (replace) {
            IMAGE_DEBUG || console.log('includeImage elmnt firstChild :', elmnt.firstChild);
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
