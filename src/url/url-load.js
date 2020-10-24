// url-load.js
/**
 *
 * @param self
 * @param json
 * @param success
 * @param error
 * @returns {boolean}
 */
function urlLoad(self, json, success, error) {
    var f = 'jloads.url urlLoad';

    if (!isString(window.location.hash)) {
        return false;
    }

    for (var hash in json) {

        var list = json[hash];
        console.log(f, '!!!3', self.jloads, list, hash);

        if (window.location.hash === hash) {

            for (var selector in list) {

                if (selector !== 'head' && selector !== 'body' && (selector.indexOf('#') === 0 || selector.indexOf('.') === 0)) {
                    getTarget(selector).innerHTML = '';
                }

                // var l = new Load(selector, success, error); //.domain('localhost');
                var l = new Load({
                    target: selector,
                    success: success,
                    error: error,
                    replace: 1,
                });

                // console.log(f, '!!!4 l: ', l, self.mapFunction);
                console.log(f, '!!!4 selector: ', selector, l, self.mapFunction);

                var url = list[selector];
                console.log(f, '!!!4 url: ', url);

                getOne(l, url, selector, self.mapFunction, success, error);

            }
        }

    }
}
