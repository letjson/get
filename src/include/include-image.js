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
