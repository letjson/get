// jloads.js
jlogs('exist?', 'jloads');
/**
 *
 * @param selector
 * @returns {jloads}
 */
var jloads = function (selector) {
    const f = 'jloads';

    this.cfg = {};
    this.cfg.area = document;
    this.cfg.selector = selector;
    this.cfg.exist = false;

    var self = this;


    self.selector = function (selector) {
        self.cfg.selector = selector;
        return self;
    }

    var success = function (data) {
        console.log(f, ' loaded ', data);
    };

    var error = function (data) {
        console.error(f, ' !loaded ', data);
    };

    var mapFunction = map;

    self.jloads = new Load(selector, success, error); //.domain('localhost');


    self.form = function (json, success, error) {
        const f = 'jloads.form';

        jlogs(' jloadsForm', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);

        // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
        // jlogs('jloadsForm selectorEvent1 ', ' elem ', elem, !isEmpty(elem));

        // var jloads = new Load(selector, success, error);

        jlogs('jloadsForm Object.keys(json).length', Object.keys(json).length);

        if (Object.keys(json).length === 1) {

            var selector_event = Object.keys(json)[0];
            var se = selector_event.split(":", 2);
            var selector = se[0];
            var event = se[1];
            var targets = json[selector_event];
            jlogs('jloadsForm selector event targets', selector, event, targets);

            onSelector(selector, function (select, element) {
                jlogs(f, 'elem wait DOMContentLoaded select element', select, element);
                selectorEventTarget(selector, event, targets, success, error);
            });

            // document.addEventListener("DOMContentLoaded", function(event) {
            //     jlogs(f, 'elem wait DOMContentLoaded selector event', selector, event);
            //     selectorEventTarget(selector, event, targets, success, error);
            // });

        } else {
            for (var selector in json) {
                var event = json[selector];
                // selectorEvent1(jloads, selector, event, mapFunction, success, error)
            }
        }
        // success(json);

        // return jloads;
    }

    self.obj = function (url, success, error) {
        const f = 'jloads.obj';

        if (typeof url === 'string') {
            try {
                // base64 in url
                if (url.length > 2) {
                    return loadJson(url, success);
                }
                // success(json, url);
                // return json;
            } catch (e) {
                //jlogs(f, ' ERROR elem ', elem);
                jlogs(f, ' ERROR e ', e);
                return error(e, url);
            }
        }
        return null;
    }

    self.file = function (json) {
        const f = 'jloads.file';

        jlogs(' jloadsFile', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


        // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
        var url = Object.keys(json)[0];
        jlogs('jloadsFile getOne ', ' url ', url);

        if (Object.keys(json).length === 1) {

            const funcName = getFunctionName(url, mapFunction);
            jlogs(f, ' funcName ', funcName, url);
            self.jloads[funcName](url);

            for (var i in json[url]) {
                var url2 = json[url][i];
                // getOne(jloads, object, i, mapFunction, success, error)
                const funcName = getFunctionName(url2, mapFunction);
                jlogs(f, ' funcName ', funcName, url2);
                self.jloads[funcName](url2);
            }
        }
        return self;
    }


    self.target = function (json) {
        const f = 'jloads.target';

        jlogs(' jloadsTarget', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);

        // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
        // jlogs('jloadsTarget getOne ', ' elem ', elem, !isEmpty(elem));

        var i = Object.keys(json)[0];
        jlogs('jloadsTarget getOne ', ' i ', i);

        if (Object.keys(json).length === 1) {
            getOne(self.jloads, json[i], i, mapFunction, success, error)
        } else {
            for (var i in json) {
                var object = json[i];
                getOne(self.jloads, object, i, mapFunction, success, error)
            }
        }
        // success(json);

        return self;
    }

    return self;
};
