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

    self.mapFunction = map;

    self.jloads = new Load(selector, success, error); //.domain('localhost');


    self.form = function (json, success, error) {
        const f = 'jloads.form';

        jlogs(' jloads.form', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);

        // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
        // jlogs('jloads.form selectorEvent1 ', ' elem ', elem, !isEmpty(elem));

        // var jloads = new Load(selector, success, error);

        jlogs('jloads.form Object.keys(json).length', Object.keys(json).length);

        if (Object.keys(json).length === 1) {

            var selector_event = Object.keys(json)[0];
            var se = selector_event.split(":", 2);
            var selector = se[0];
            var event = se[1];
            var targets = json[selector_event];
            jlogs('jloads.form selector event targets', selector, event, targets);

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
                // selectorEvent1(jloads, selector, event, self.mapFunction, success, error)
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

        // jlogs(' jloadsFile', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);
        var url = Object.keys(json)[0];
        jlogs(f, ' url ', url);

        if (Object.keys(json).length === 1) {


            var success1 = function () {
                var jloads2 = new Load('head');

                const f = 'jloads.file';
                // jlogs(f, ' success json[url]', json[url]);
                for (var i in json[url]) {
                    var url2 = json[url][i];
                    jlogs(f, ' success url2', url2);
                    const funcName = getFunctionName(url2, self.mapFunction, 'self.file');
                    jlogs(f, ' funcName ', funcName);
                    jloads2[funcName](url2);
                }
            }

            var jloads1 = new Load('head', success1);

            const funcName = getFunctionName(url, self.mapFunction, 'self.file');
            jlogs(f, ' funcName ', funcName, url);
            jloads1[funcName](url);

        }
        return self;
    }


    self.event = function (json) {
        const f = 'jloads.event';

        jlogs(f, ' json ', json, Object.keys(json).length, Object.keys(json)[0]);

        if (Object.keys(json).length === 1) {
            var selector = Object.keys(json)[0];
            var event = json[selector];
            selectorEvent(self.jloads, selector, event, self.mapFunction, success, error)
        } else {
            for (var selector in json) {
                var event = json[selector];
                selectorEvent(self.jloads, selector, event, self.mapFunction, success, error)
            }
        }

        return self;
    }

    self.target = function (json) {
        const f = 'jloads.target';

        jlogs(f, ' json ', json, Object.keys(json).length, Object.keys(json)[0]);

        // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
        // jlogs('jloadsTarget getOne ', ' elem ', elem, !isEmpty(elem));

        var i = Object.keys(json)[0];
        jlogs(f, ' i ', i);

        if (Object.keys(json).length === 1) {
            getOne(self.jloads, json[i], i, self.mapFunction, success, error)
        } else {
            for (var i in json) {
                var object = json[i];
                getOne(self.jloads, object, i, self.mapFunction, success, error)
            }
        }
        // success(json);

        return self;
    }
    // Load files by path in url bar, similar such event loading, check if url value is changed
    self.url = function (json) {
        const f = 'jloads.url';

        jlogs(f, ' json ', json, Object.keys(json).length, Object.keys(json)[0]);

        // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
        // jlogs('jloadsTarget getOne ', ' elem ', elem, !isEmpty(elem));

        var i = Object.keys(json)[0];
        jlogs(f, ' getOne ', ' i ', i);

        // Dynamic loading
        document.addEventListener("DOMContentLoaded", function (event) {
            // loadDefaultCss();
        });
        // function hashHandler(){
        //     this.oldHash = window.location.hash;
        //     this.Check;
        //
        //     var that = this;
        //     var detect = function(){
        //         if(that.oldHash!=window.location.hash){
        //             alert("HASH CHANGED - new has" + window.location.hash);
        //             that.oldHash = window.location.hash;
        //         }
        //     };
        //     this.Check = setInterval(function(){ detect() }, 100);
        // }
        //
        // var hashDetection = new hashHandler();
        // window.addEventListener('locationchange', function(){
        //     console.log('location changed!');
        // })
        // if (Object.keys(json).length === 1) {
        window.addEventListener('popstate', function (event) {
            // Log the state data to the console
            console.log(f, window.location.hash);
            console.log(f, self.jloads);

            for (var hash in json) {
                var list = json[hash];
                console.log(f, '!!!3', self.jloads, list, hash);

                if (window.location.hash === hash) {
                    for (var selector in list) {
                        var l = new Load(selector, success, error); //.domain('localhost');
                        l.replaceOn();
                        console.log(f, '!!!4 selector: ', selector, l, self.mapFunction);

                        for (var id in list[selector]) {
                            var url = list[selector][id];
                            console.log(f, '!!!4 url: ', url);
                            // getOne(self.jloads, url, selector, self.mapFunction, success, error)
                            // loadContentByUrls(l, url, self.mapFunction, success, error);
                            const funcName = getFunctionName(url, self.mapFunction, 'self.url');
                            jlogs(f, '!!!4 funcName ', funcName);
                            //jlogs(funcName, url, elem);
                            l[funcName](url);
                        }
                    }
                }

            }
            // getOne(self.jloads, json[i], i, self.mapFunction, success, error)

        });
        // } else {

        // }
        // success(json);

        return self;
    }

    return self;
};
