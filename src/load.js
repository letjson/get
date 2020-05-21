// load.js
/**
 * @param target
 * @param success
 * @param error
 * @returns {Load}
 * @constructor
 */
var Load = function (target, success, error) {

    if (typeof JLOADS_DEBUG === 'undefined') {
        var JLOADS_DEBUG = true;
    }

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        throw new TypeError('Object success called on non-object');
    }

    this.success = success;
    this.error = error;


    this.cfg = {};
    this.cfg.env = {};
    this.cfg.env_id = 0;
    this.cfg.domain = "";
    this.cfg.target = target;
    this.cfg.delay = 0;
    this.cfg.cache = 1;
    this.cfg.replace = 0;


    var self = this;


    this.env = function (domain, name, callback) {
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
        return !isEmpty(self.cfg.domain);
    };

    self.getEnv = function (url) {
        JLOADS_DEBUG || console.log('.getEnv() url:', url);

        if (hasDomain(url)) {
            JLOADS_DEBUG || console.log('url has now own domain:', url);
            return {
                'domain': ''
            };
        }
        if (self.hasEnv()) {
            JLOADS_DEBUG || console.log('url has env:', self.cfg.env);
            for (var index in self.cfg.env) {
                if (self.cfg.env.hasOwnProperty(index)) {
                    JLOADS_DEBUG || console.log('.getEnv() function check:', self.cfg.env[index]['name']);

                    var callback = self.cfg.env[index]['exist'];
                    if (typeof callback === 'function' && callback()) {
                        JLOADS_DEBUG || console.log('.getEnv() url use env:', self.cfg.env[index]['name']);
                        return self.cfg.env[index];
                    }
                }
            }
        }
        if (self.hasDomain()) {
            JLOADS_DEBUG || console.log('.getEnv() cfg domain exist', self.cfg.domain);
            return {
                'domain': self.cfg.domain
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

    self.domain = function (domain) {
        self.cfg.domain = domain;
        return self;
    };

    self.target = function (target) {
        self.cfg.target = target;
        return self;
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


    self.loadJs = function (url, target, success, error) {

        var suffix = '';
        if (typeof self.cfg.cache === 'number' && self.cfg.cache !== 1) {
            suffix = '?' + time();
        }

        if (typeof url === 'object') {
            //JLOADS_DEBUG || console.log('obj:', obj);
            var last = false;
            var len = url.length;
            for (var i in url) {
                last = len == i;
                JLOADS_DEBUG || console.log('load js url.length', len, i, last);

                var domain = self.getEnv(url[i]).domain;
                var script_url = domain + url[i] + suffix;
                JLOADS_DEBUG || console.log('load js script_url', script_url);

                try {
                    if(last){
                        var exe = includeJs(script_url, target, success, error);
                    } else {
                        var exe = includeJs(script_url, target);
                    }
                    JLOADS_DEBUG || console.log('load js ', script_url, exe);
                } catch (err) {
                    console.error('!load js ', script_url, err);
                    error();
                }
            }
        } else {
            var domain = self.getEnv(url).domain;
            var script_url = domain + url + suffix;
            includeJs(script_url, target, success, error);
            // console.error('apiunit obj: is not object:', obj);
        }

        return self;
    };
    self.js = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    JLOADS_DEBUG || console.log('delayed', self.cfg.delay, url);
                    self.loadJs(url, self.cfg.target, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            JLOADS_DEBUG || console.log('loaded', url);
            self.loadJs(url, self.cfg.target, self.success, self.error);
        }
        return self;
    };
    self.javascript = self.js;
    self.script = self.js;


    self.loadCss = function (url, target, success, error) {

        var suffix = '';
        if (typeof self.cfg.cache === 'number' && self.cfg.cache !== 1) {
            suffix = '?' + time();
        }

        if (typeof url === 'object') {
            //JLOADS_DEBUG || console.log('obj:', obj);

            for (var i in url) {
                // JLOADS_DEBUG || console.log('url:', url, i, url[i]);
                var domain = self.getEnv(url[i]).domain;
                var script_url = domain + url[i] + suffix;
                JLOADS_DEBUG || console.log('load CSS script_url', script_url);

                try {
                    var exe = includeStyle(script_url, target, success, error);
                    JLOADS_DEBUG || console.log('load CSS ', script_url, exe);
                } catch (err) {
                    console.error('!load CSS ', script_url, err);
                }
            }
        } else {
            var domain = self.getEnv(url).domain;
            var script_url = domain + url + suffix;
            includeStyle(script_url, target, success, error);
            // console.error('apiunit obj: is not object:', obj);
        }

        return self;
    };

    self.css = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    JLOADS_DEBUG || console.log('delayed', self.cfg.delay, url);
                    self.loadCss(url, self.cfg.target, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            JLOADS_DEBUG || console.log('loaded', url);
            self.loadCss(url, self.cfg.target, self.success, self.error);
        }
        return self;
    };
    self.style = self.css;


    self.html = function (url) {
        var suffix = '';
        if (typeof self.cfg.cache === 'number' && self.cfg.cache !== 1) {
            suffix = '?' + time();
        }

        if (typeof url === 'object') {
            //JLOADS_DEBUG || console.log('obj:', obj);

            for (var i in url) {

                var domain = self.getEnv(url[i]).domain;
                var script_url = domain + url[i] + suffix;
                JLOADS_DEBUG || console.log('load html script_url', script_url);
                try {
                    var exe = includeHtml(script_url, self.cfg.target, self.cfg.replace, success, error);
                    JLOADS_DEBUG || console.log('load html ', script_url, exe);
                } catch (err) {
                    console.error('!load html ', script_url, err);
                }
            }
        } else {
            var domain = self.getEnv(url).domain;
            var script_url = domain + url + suffix;
            includeHtml(script_url, self.cfg.target, self.cfg.replace, success, error);
            // console.error('apiunit obj: is not object:', obj);
        }
        return self;
    };


    self.img = function (url) {
        if (typeof self.cfg.delay === 'number' && self.cfg.delay > 1) {
            setTimeout(function () {
                    JLOADS_DEBUG || console.log('image delayed', self.cfg.delay, url);
                    self.loadImage(url, self.cfg.target, self.cfg.replace, self.success, self.error);
                },
                self.cfg.delay
            );
        } else {
            JLOADS_DEBUG || console.log('image loaded', url, self.cfg.delay);
            self.loadImage(url, self.cfg.target, self.cfg.replace, self.success, self.error);
        }
        return self;
    };

    self.loadImage = function (url, target, replace, success, error) {

        var suffix = '';
        if (typeof self.cfg.cache === 'number' && self.cfg.cache !== 1) {
            suffix = '?' + time();
        }

        if (typeof url === 'object') {
            //JLOADS_DEBUG || console.log('obj:', obj);

            for (var i in url) {
                var domain = self.getEnv(url[i]).domain;
                var script_url = domain + url[i] + suffix;
                JLOADS_DEBUG || console.log('load img url[i]', url[i]);

                try {
                    var exe = includeImage(script_url, target, replace, success, error);
                    JLOADS_DEBUG || console.log('load img ', script_url, exe);
                } catch (err) {
                    console.error('!load img ', script_url, err);
                }
            }
        } else {
            var domain = self.getEnv(url).domain;
            var script_url = domain + url + suffix;
            includeImage(script_url, target, replace, success, error);
            // console.error('apiunit obj: is not object:', obj);
        }
        return self;
    };


    return self;
};


