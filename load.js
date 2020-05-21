// TODO: if function not exist try to load from main folder with the name {NameOfFunction}.js
JLOADS_DEBUG = true;
var Load = function (target, success, error) {
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

    this.getEnv = function (url) {

        if (hasDomain(url)) {
            JLOADS_DEBUG || console.log('url has now own domain:', url);
            return {
                'domain': ''
            };
        }
        // JLOADS_DEBUG || console.log('typeof ===', typeof self.cfg.env, self.cfg.env, self.cfg.env.length);
        if (typeof self.cfg.env !== 'object') {
            JLOADS_DEBUG || console.log('environment not exist', self.cfg.env);
            if(isEmpty(self.cfg.domain)){
                return {
                    'domain': ''
                };
            }
            return {
                'domain': self.cfg.domain
            };
        }

        for (var index in self.cfg.env) {
            if (self.cfg.env.hasOwnProperty(index)) {
                // JLOADS_DEBUG || console.log("o." + index + " = " + self.cfg.env[index]);
                var callback = self.cfg.env[index]['exist'];
                if (typeof callback === 'function' && callback()) {
                    JLOADS_DEBUG || console.log('url use env:', self.cfg.env[index]['name']);
                    return self.cfg.env[index];
                }
            }
        }
    };

    this.getEnvById = function (env_id) {

        if (typeof self.cfg.env !== 'function' && (typeof self.cfg.env !== 'object' || self.cfg.env === null)) {
            throw new TypeError('Object self.cfg.env called on non-object');
        }

        return self.cfg.env[env_id];
    };

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


    // TODO: check if is loaded
    self.loadJs = function (url, target, success, error) {

        var suffix = '';
        if (typeof self.cfg.cache === 'number' && self.cfg.cache !== 1) {
            suffix = '?' + time();
        }

        if (typeof url === 'object') {
            //JLOADS_DEBUG || console.log('obj:', obj);

            for (var i in url) {
                var domain = self.getEnv(url[i]).domain;
                var script_url = domain + url[i] + suffix;
                JLOADS_DEBUG || console.log('load js script_url', script_url);

                try {
                    var exe = includeJs(script_url, target, success, error);
                    JLOADS_DEBUG || console.log('load js ', script_url, exe);
                } catch (err) {
                    console.error('!load js ', script_url, err);
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

function includeJs(url, target, success, error) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.type = 'text/javascript';

    scriptTag.onerror = error;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;

    return getTarget(target).appendChild(scriptTag);
}

function isEmpty(val) {
    return val == null || typeof val === 'undefined' || val.length < 1;
}

function getTarget(target) {

    JLOADS_DEBUG || console.log('target',target);
    if (isEmpty(target)) {
        JLOADS_DEBUG || console.log('HEAD');
        target = document.getElementsByTagName('head')[0];
        if (isEmpty(target)) {
            JLOADS_DEBUG || console.log('BODY');
            target = document.body;
        }
    }
    return target;
}

function createTagLink(url, success, error) {
    var link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';

    link.onerror = error;
    link.onload = success;
    link.onreadystatechange = success;

    return link;
}


function getXHRObject() {
    var xhrObj = false;
    try {
        xhrObj = new XMLHttpRequest();
    } catch (e) {
        var progid = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
            'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var i = 0; i < progid.length; ++i) {
            try {
                xhrObj = new ActiveXObject(progid[i]);
            } catch (e) {
                continue;
            }
            break;
        }
    } finally {
        return xhrObj;
    }
}

// TODO: replce path to id name and check if ID exist
// FASTEST loading:
// https://www.oreilly.com/library/view/even-faster-web/9780596803773/ch04.html
function includeStyle(url, target, success, error) {
    // JLOADS_DEBUG || console.log(target, target == null);
    // return false;

    // var xhrObj = getXHRObject(); // defined in the previous example
    // xhrObj.onreadystatechange =
    //     function () {
    //         if (xhrObj.readyState == 4) {
    //             // var scriptElem = document.createElement('script');
    //             var scriptElem = document.createElement('style');
    //             document.getElementsByTagName('head')[0].appendChild(scriptElem);
    //             scriptElem.text = xhrObj.responseText;
    //         }
    //     };
    // xhrObj.open('GET', url, true); // must be same domain as main page
    // return xhrObj.send('');


    var link = createTagLink(url, success, error);
    return getTarget(target).appendChild(link);
}


function includeHtml(url, target, replace, success, error) {
    var xhttp;

    try {
        var el = new E(target);
    } catch (err) {
        console.error('!Element not exist  ', target);
        return false;
    }

    var elmnt = el.first();

    if (typeof success !== 'function') {
        success = function () {
            JLOADS_DEBUG || console.log('includeHtml success', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            JLOADS_DEBUG || console.log('includeHtml error', "Page not found.");
        }
    }
    JLOADS_DEBUG || console.log('includeHtml url', url);

    if (url) {
        /* Make an HTTP request using the attribute value as the url name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            JLOADS_DEBUG || console.log('includeHtml el_id', target);

            if (this.readyState == 4) {
                if (this.status == 200) {

                    elmnt.insertAdjacentHTML('beforeend', this.responseText);

                    success(this);
                }
                if (this.status == 404) {
                    elmnt.innerHTML = "includeHtml Page not found.";
                    error(this);
                }
                /* Remove the attribute, and call this function once more: */
                // includeHtml(url, success, error);
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
        /* Exit the function: */
        return this;
    }
    return false;

}

// function includeImage(url, target, success, error) {

function includeImage(url, target, replace, success, error) {
    JLOADS_DEBUG || console.log('includeImg url: ', url);
    // JLOADS_DEBUG || console.log('el', el);
    try {
        var el = new E(target);
    } catch (err) {
        console.error('!Element not exist  ', target);
        error();
        return false;
    }
    var elmnt = el.first();
    JLOADS_DEBUG || console.log('include Image elmnt :', elmnt);

    let img = new Image;
    img.onload = function () {
        JLOADS_DEBUG || console.log("include Image onload url: ", url);
        JLOADS_DEBUG || console.log("include Image replace: ", replace );

        if (typeof replace === 'number' && replace === 1) {
            replace = true;
        }
        // JLOADS_DEBUG || console.log('typeof self.cfg.replace', typeof self.cfg.replace);
        JLOADS_DEBUG || console.log("include Image replace: ", replace );


        if(replace){
            JLOADS_DEBUG || console.log('includeImage elmnt firstChild :', elmnt.firstChild);
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


var time = Date.now || function () {
    return +new Date;
};


var E = function (selector, area, error, success) {

    this.cfg = {};
    this.cfg.area = document;
    this.cfg.selector = selector;
    this.cfg.exist = false;


    this.success = function (elem) {
        JLOADS_DEBUG || console.log("Element func success(): ", elem);
    };

    this.error = function (elem) {
        console.error("! Element func error(): ", elem);
    };

    if (typeof this.cfg.selector !== 'string') {
        console.error("! Element selector: ", elem);
    }

    if (typeof success === 'function') {
        this.success = success;
    }

    if (typeof error === 'function') {
        this.error = error;
    }

    var self = this;


    self.selector = function (selector) {
        self.cfg.selector = selector;
        return self;
    }

    self.first = function (error, success) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }
        if (typeof self.cfg.selector !== 'string') {
            self.cfg.exist = false;
            error();
        }
        const elem = document.querySelector(self.cfg.selector);

        JLOADS_DEBUG || console.log('E first self.cfg.selector', self.cfg.selector);
        JLOADS_DEBUG || console.log('E first elem', elem);

        if (elem !== null) {
            self.cfg.exist = true;
            success(elem);
            return elem;
        } else {
            self.cfg.exist = false;
            error();
        }

        return elem;
    }

    self.all = function (error, success) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }

        const elem = document.querySelectorAll(self.cfg.selector);

        JLOADS_DEBUG || console.log('E all self.cfg.selector', self.cfg.selector);
        JLOADS_DEBUG || console.log('E all elem', elem);

        if (elem !== null) {
            self.cfg.exist = true;
            success(elem);
        } else {
            self.cfg.exist = false;
            error(elem);
        }

        return elem;
    }

    return self;
};

var hasDomain = function (url) {
    return url.indexOf('//') === 0 || url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
}
