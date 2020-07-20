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

                if(selector !== 'head' && selector !== 'body' && (selector.indexOf('#') === 0 || selector.indexOf('.') === 0)){
                    getTarget(selector).innerHTML = '';
                }

                var l = new Load(selector, success, error); //.domain('localhost');
                l.replaceOn();
                // console.log(f, '!!!4 l: ', l, self.mapFunction);
                console.log(f, '!!!4 selector: ', selector, l, self.mapFunction);

                var url = list[selector];
                console.log(f, '!!!4 url: ', url);

                getOne(l, url, selector, self.mapFunction, success, error);
                //
                // for (var id in list[selector]) {
                //     var url = list[selector][id];
                //     console.log(f, '!!!4 url: ', url);
                //     // getOne(self.jloads, url, selector, self.mapFunction, success, error)
                //     // loadContentByUrls(l, url, self.mapFunction, success, error);
                //     var funcName = getFunctionName(url, self.mapFunction, 'self.url');
                //     jlogs(f, '!!!4 funcName ', funcName);
                //     //jlogs(funcName, url, elem);
                //     l[funcName](url);
                // }
            }
        }

    }
}
