// load.js
jlogs('exist?', 'Load');
/**
 *
 * @param cfg
 * @returns {Load}
 * @constructor
 */
var Load = function (cfg) {
    var f = 'Load';
    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    this.cfg = {};
    this.cfg.env = {};
    this.cfg.env_id = 0;
    this.cfg.domain = {};
    this.cfg.target = 'body';
    this.cfg.delay = 0;
    this.cfg.cache = 1;
    this.cfg.replace = 0;
    this.cfg.success = 0;
    this.cfg.error = 0;

    if (isEmpty(cfg)) {
        cfg = {};
    }
    console.log(f, ' cfg ', cfg);

    if (!isEmpty(cfg.env)) this.cfg.env = cfg.env;
    if (!isEmpty(cfg.env_id)) this.cfg.env_id = cfg.env_id;
    if (!isEmpty(cfg.domain)) this.cfg.domain = cfg.domain;
    if (!isEmpty(cfg.target)) this.cfg.target = cfg.target;
    if (!isEmpty(cfg.delay)) this.cfg.delay = cfg.delay;
    if (!isEmpty(cfg.cache)) this.cfg.cache = cfg.cache;
    if (!isEmpty(cfg.replace)) this.cfg.replace = cfg.replace;
    if (!isEmpty(cfg.success)) success = cfg.success;
    if (!isEmpty(cfg.error)) error = cfg.error;

    console.log(f, ' cfg updated:', this.cfg);

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        //throw new TypeError('Object success called on non-object');
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
    }

    if (typeof error !== 'function' && (typeof error !== 'object' || error === null)) {
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }

    this.success = success;
    this.error = error;


    var self = this;


    self.env = function (domain, name, callback) {
        self.cfg.env_id++;
        self.cfg.env[self.cfg.env_id] = {};
        self.cfg.env[self.cfg.env_id]['domain'] = domain;
        self.cfg.env[self.cfg.env_id]['name'] = name;
        self.cfg.env[self.cfg.env_id]['exist'] = callback;

        return self;
    };

    self.hasEnv = function () {
        return typeof self.cfg.env === 'object' && typeof self.cfg.env[1] !== 'undefined';
    };

    self.hasDomain = function () {
        return !isEmpty(self.getDomain());
    };

    self.getEnv = function (url) {
        jlogs(this.constructor.name, '.getEnv() url: ', url);

        if (hasDomain(url)) {
            jlogs(this.constructor.name, ' url has now own domain: ', url);
            return {
                'domain': ''
            };
        }
        if (self.hasEnv()) {
            jlogs(this.constructor.name, ' url has env:', self.cfg.env);
            for (var index in self.cfg.env) {
                if (self.cfg.env.hasOwnProperty(index)) {
                    jlogs(this.constructor.name, '.getEnv() function check: ', self.cfg.env[index]['name']);

                    var callback = self.cfg.env[index]['exist'];
                    if (typeof callback === 'function' && callback(self)) {
                        jlogs(this.constructor.name, '.getEnv() url use env: ', self.cfg.env[index]['name']);
                        return self.cfg.env[index];
                    }
                }
            }
        }
        if (self.getDomain()) {
            jlogs(this.constructor.name, '.getEnv() cfg domain exist ', self.cfg.domain);
            return {
                'domain': self.getDomain()
            };
        }

        // Has own domain ENV OR DOMAIN not exist
        return {
            'domain': ''
        };
    };

    // this.getEnvById = function (env_id) {
    //
    //     if (typeof self.cfg.env !== 'function' && (typeof self.cfg.env !== 'object' || self.cfg.env === null)) {
    //         throw new TypeError('Object self.cfg.env called on non-object');
    //     }
    //
    //     return self.cfg.env[env_id];
    // };


    self.getDomain = function () {
        //jlogs(this.constructor.name, '.getDomain() self.cfg.domain',
        //     self.cfg.domain, typeof self.cfg.domain === 'object' , Object.keys(self.cfg.domain).length === 0);

        if (isEmpty(self.cfg.domain)) {
            jlogs(this.constructor.name, '.getDomain() isEmpty');
            return false;
        }

        for (var index in self.cfg.domain) {

            jlogs(this.constructor.name, '.getDomain() function check: ', index, self.cfg.domain);
            return self.cfg.domain[index];
            /*
                        if (self.cfg.domain.hasOwnProperty(index)) {
                            console.log('self.cfg.', self.cfg, self.cfg.domain, index);
                            // var callback = self.cfg.domain[index]['exist'];
                            // if (typeof callback === 'function' && callback()) {
                            //    jlogs(this.constructor.name, '.getDomain() url use env:', self.cfg.domain[index]);
                            return self.cfg.domain[index];
                            // }
                        }
                        */

        }
        jlogs(this.constructor.name, '.getDomain() for not');
        return false;
    };

    self.addDomain = function (domain, id) {
        var obj = {}
        if (isEmpty(id)) {
            id = time();
        }
        obj[id] = domain;
        Object.assign(self.cfg.domain, obj);

        jlogs(this.constructor.name, '.addDomain() cfg domain', self.cfg.domain);
        jlogs(this.constructor.name, '.addDomain() cfg getDomain()', self.getDomain());

        // self.cfg.domain = domain;
        return self;
    };

    self.domain = function (domain, id) {
        return self.addDomain(domain, id);
    };


    self.target = function (target) {
        self.cfg.target = target;
        return self;
    };
    self.getTarget = function () {
        return self.cfg.target;
    };

    self.delay = function (delay) {
        self.cfg.delay = delay;
        return this;
    };


    self.cache = function (cache) {
        self.cfg.cache = cache;
        return self;
    };
    self.cacheOff = function () {
        self.cfg.cache = 0;
        return self;
    };
    self.cacheOn = function () {
        self.cfg.cache = 1;
        return self;
    };
    self.hasCache = function () {
        return typeof self.cfg.cache === 'number' && self.cfg.cache !== 1;
    };
    self.getSuffix = function () {
        var suffix = '';
        if (self.hasCache()) {
            suffix = '?' + time();
        }
        return suffix;
    };
    self.getEnvDomain = function (url) {
        return self.getEnv(url).domain;
    };
    self.getEnvUrl = function (url) {
        return self.getEnvDomain(url) + url + self.getSuffix();
    };


    self.replace = function (replace) {
        self.cfg.replace = replace;
        return self;
    };
    self.replaceOff = function () {
        self.cfg.replace = 0;
        return self;
    };
    self.replaceOn = function () {
        self.cfg.replace = 1;
        return self;
    };
    self.isReplaceOn = function () {
        return self.cfg.replace == 1;
    };
    self.getReplace = function () {
        return self.cfg.replace;
    };

    self.loadJs = function (url, target, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' js url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' js script_url ', script_url);

                try {
                    if (last) {
                        includeScript(script_url, target, self.cfg.replace, success, error);
                    } else {
                        includeScript(script_url, target, self.cfg.replace);
                    }
                    jlogs(this.constructor.name, ' js ', script_url);
                } catch (e) {
                    err('! js ', script_url, e);
                    // error();
                }
            }
        } else {
            includeScript(self.getEnvUrl(url), target, self.cfg.replace, success, error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };
    self.js = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' js delayed ', self.cfg.delay, url);
                    self.loadJs(url, self.cfg.target, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' js url ', url);
            self.loadJs(url, self.cfg.target, self.success, self.error);
        }
        return self;
    };
    self.javascript = self.js;
    self.script = self.js;


    self.loadCss = function (url, target, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);

            for (var i in url) {
                //jlogs(this.constructor.name, ' url:', url, i, url[i]);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' loadCss script_url ', script_url);

                try {
                    var exe = includeStyle(script_url, target, self.cfg.replace, success, error);
                    jlogs(this.constructor.name, ' loadCss exe ', exe);
                } catch (e) {
                    err('!load CSS ', script_url, e);
                }
            }
        } else {
            includeStyle(self.getEnvUrl(url), target, self.cfg.replace, success, error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };

    self.css = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' css delayed ', self.cfg.delay, url);
                    self.loadCss(url, self.cfg.target, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' css loaded ', url);
            self.loadCss(url, self.cfg.target, self.success, self.error);
        }
        return self;
    };
    self.style = self.css;


    self.html = function (url) {
        jlogs(this.constructor.name, ' self.cfg.delay ', self.cfg.delay);

        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' html delayed ', self.cfg.delay, url);
                    self.loadHtml(url);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' html url ', url);
            self.loadHtml(url);
        }
        return self;
    };

    self.loadHtml = function (url) {
        jlogs(this.constructor.name, ' self.cfg.target ', self.cfg.target, url, typeof url);

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' html url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' html script_url ', script_url);

                try {
                    // if (last) {
                    includeHtml(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // } else {
                    //     var exe = includeHtml(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // }
                    jlogs(this.constructor.name, ' html ', script_url);
                } catch (e) {
                    err('! html ', script_url, e);
                    // error();
                }
            }
        } else {
            includeHtml(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };


    self.img = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' image delayed', self.cfg.delay, url);
                    self.loadImage(url);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' image loaded ', url, self.cfg.delay);
            self.loadImage(url);
        }
        return self;
    };

    self.loadImage = function (url, target, replace, success, error) {

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);

            for (var i in url) {

                jlogs(this.constructor.name, ' img url[i]', url[i]);
                var script_url = self.getEnvUrl(url[i]);

                try {
                    includeImage(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    jlogs(this.constructor.name, ' img ', script_url);
                } catch (e) {
                    err('! img ', script_url, e);
                }
            }
        } else {
            includeImage(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }
        return self;
    };


    self.json = function (url) {
        jlogs(this.constructor.name, ' self.cfg.delay ', self.cfg.delay);

        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' json delayed ', self.cfg.delay, url);
                    self.loadJson(url);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' json url ', url);
            self.loadJson(url);
        }
        return self;
    };

    self.loadJson = function (url) {
        jlogs(this.constructor.name, ' self.cfg.target ', self.cfg.target);

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' json url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' json script_url ', script_url);

                try {
                    // if (last) {
                    includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // } else {
                    //     var exe = includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // }
                    jlogs(this.constructor.name, ' json ', script_url);
                } catch (e) {
                    err('! json ', script_url, e);
                    // error();
                }
            }
        } else {
            loadJson(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };

    self.text = function (url) {
        jlogs(this.constructor.name, ' self.cfg.delay ', self.cfg.delay);

        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    jlogs(this.constructor.name, ' text delayed ', self.cfg.delay, url);
                    self.loadJson(url);
                },
                self.cfg.delay
            );
        } else {
            jlogs(this.constructor.name, ' text url ', url);
            self.loadJson(url);
        }
        return self;
    };

    self.loadJson = function (url) {
        jlogs(this.constructor.name, ' self.cfg.target ', self.cfg.target);

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' text url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' text script_url ', script_url);

                try {
                    // if (last) {
                    includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // } else {
                    //     var exe = includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // }
                    jlogs(this.constructor.name, ' text ', script_url);
                } catch (e) {
                    err('! text ', script_url, e);
                    // error();
                }
            }
        } else {
            loadJson(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
    };

    return self;
};
