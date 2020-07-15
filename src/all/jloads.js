// jloads.js
jlogs('exist?', 'jloads');
/**
 *
 * @param selector
 * @returns {jloads}
 */
var jloads = function (selector) {

    this.cfg = {};
    this.cfg.area = document;
    this.cfg.selector = selector;
    this.cfg.exist = false;

    if (typeof success === 'function') {
        this.success = success;
    } else {
        this.success = function (elem) {
            jlogs(this.constructor.name, " Element func success(): ", elem);
        };
    }

    if (typeof error === 'function') {
        this.error = error;
    } else {
        this.error = function (elem) {
            jlogs(this.constructor.name, "! Element func error(): ", elem);
        };
    }

    if (typeof this.cfg.selector !== 'string') {
        jlogs(this.constructor.name, "! Element selector: ", elem);
    }


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

    var jloads = new Load(selector, success, error); //.domain('localhost');


    self.obj = function (url, success, error) {
        const f = 'jloadsObj';

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
        const f = 'jloadsFile';

        jlogs(' jloadsFile', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


        // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
        var url = Object.keys(json)[0];
        jlogs('jloadsFile getOne ', ' url ', url);

        if (Object.keys(json).length === 1) {

            const funcName = getFunctionName(url, mapFunction);
            jlogs(f, ' funcName ', funcName, url);
            jloads[funcName](url);

            for (var i in json[url]) {
                var url2 = json[url][i];
                // getOne(jloads, object, i, mapFunction, success, error)
                const funcName = getFunctionName(url2, mapFunction);
                jlogs(f, ' funcName ', funcName, url2);
                jloads[funcName](url2);
            }
        }
        return jloads;
    }


    self.target = function (json) {
        const f = 'jloadsTarget';

        jlogs(' jloadsTarget', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);

        // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
        // jlogs('jloadsTarget getOne ', ' elem ', elem, !isEmpty(elem));

        var i = Object.keys(json)[0];
        jlogs('jloadsTarget getOne ', ' i ', i);

        if (Object.keys(json).length === 1) {
            getOne(jloads, json[i], i, mapFunction, success, error)
        } else {
            for (var i in json) {
                var object = json[i];
                getOne(jloads, object, i, mapFunction, success, error)
            }
        }
        // success(json);

        return jloads;
    }

    return self;
};
