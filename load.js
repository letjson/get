// TODO: if function not exist try to load from main folder with the name {NameOfFunction}.js

var Load = function (target, success, error) {
    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        throw new TypeError('Object success called on non-object');
    }

    var cfg = {};
    cfg.env = {};
    cfg.env_id = 0;
    cfg.domain = "";
    cfg.target = target;
    cfg.delay = 0;
    cfg.cache = 1;

    this.success = success;
    this.error = error;

    var self = this;

    this.env = function (domain, name, callback) {
        cfg.env_id++;
        cfg.env[cfg.env_id] = {};
        cfg.env[cfg.env_id]['domain'] = domain;
        cfg.env[cfg.env_id]['name'] = name;
        cfg.env[cfg.env_id]['exist'] = callback;
        return this;
    };

    this.getEnv = function (url) {

        if (hasDomain(url)) {
            console.log('url has now own domain:', url);
            return {
                'domain': ''
            };
        }
        // console.log('typeof ===', typeof cfg.env, cfg.env, cfg.env.length);
        if (typeof cfg.env !== 'object' || typeof cfg.env.length === 'undefined' || cfg.env.length < 1 ) {
            console.log('environment not exist');
            return {
                'domain': cfg.domain
            };
        }

        for (var index in cfg.env) {
            if (cfg.env.hasOwnProperty(index)) {
                // console.log("o." + index + " = " + cfg.env[index]);
                var callback = cfg.env[index]['exist'];
                if (typeof callback === 'function' && callback()) {
                    console.log('url use env:', cfg.env[index]['name']);
                    return cfg.env[index];
                }
            }
        }
    };

    this.getEnvById = function (env_id) {

        if (typeof cfg.env !== 'function' && (typeof cfg.env !== 'object' || cfg.env === null)) {
            throw new TypeError('Object cfg.env called on non-object');
        }

        return cfg.env[env_id];
    };

    this.domain = function (domain) {
        cfg.domain = domain;
        return this;
    };

    this.target = function (target) {
        cfg.target = target;
        return this;
    };

    this.delay = function (delay) {
        cfg.delay = delay;
        return this;
    };

    this.cache = function (cache) {
        cfg.cache = cache;
        return this;
    };

    this.cacheOff = function () {
        cfg.cache = 0;

        return this;
    };

    this.cacheOn = function () {
        cfg.cache = 1;

        return this;
    };

    this.js = function (url) {
        if (typeof cfg.delay === 'number' && cfg.delay > 1) {
            setTimeout(function () {
                    console.log('delayed', cfg.delay, url);
                    self.loadJs(url, cfg.target, self.success, self.error);
                },
                cfg.delay
            );
        } else {
            console.log('loaded', url);
            self.loadJs(url, cfg.target, self.success, self.error);
        }
        return this;
    };
    this.javascript = this.js;
    this.script = this.js;


    this.css = function (url) {
        if (typeof cfg.delay === 'number' && cfg.delay > 1) {
            setTimeout(function () {
                    console.log('delayed', cfg.delay, url);
                    self.loadCss(url, cfg.target, self.success, self.error);
                },
                cfg.delay
            );
        } else {
            console.log('loaded', url);
            self.loadCss(url, cfg.target, self.success, self.error);
        }
        return this;
        //
        // if (typeof url === 'object') {
        //     //console.log('obj:', obj);
        //
        //     for (var i in url) {
        //
        //         console.log('load js url[i]', url[i]);
        //
        //         try {
        //             var exe = includeStyle(url[i], cfg.target, success, error);
        //             console.log('load js ', url[i], exe);
        //         } catch (err) {
        //             console.error('!load js ', url[i], err);
        //         }
        //     }
        // } else {
        //     includeHtml(url, cfg.target, success, error);
        //     // console.error('apiunit obj: is not object:', obj);
        // }
        // return this;
    };
    this.style = this.css;

    // TODO: check if is loaded
    this.loadJs = function (url, target, success, error) {

        var suffix = '';
        if (typeof cfg.cache === 'number' && cfg.cache !== 1) {
            suffix = '?' + time();
        }

        if (typeof url === 'object') {
            //console.log('obj:', obj);

            for (var i in url) {
                var domain = self.getEnv(url[i]).domain;
                var script_url = domain + url[i] + suffix;
                console.log('load js script_url', script_url);

                try {
                    var exe = includeJs(script_url, target, success, error);
                    console.log('load js ', script_url, exe);
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

        return this;
    };

    this.loadCss = function (url, target, success, error) {
        var suffix = '';
        if (typeof cfg.cache === 'number' && cfg.cache !== 1) {
            suffix = '?' + time();
        }

        if (typeof url === 'object') {
            //console.log('obj:', obj);

            for (var i in url) {
                // console.log('url:', url, i, url[i]);
                var domain = self.getEnv(url[i]).domain;
                var script_url = domain + url[i] + suffix;
                console.log('load js script_url', script_url);

                try {
                    var exe = includeStyle(script_url, target, success, error);
                    console.log('load CSS ', script_url, exe);
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

        return this;
    };


    this.html = function (url) {
        if (typeof url === 'object') {
            //console.log('obj:', obj);

            for (var i in url) {

                var domain = self.getEnv(url[i]).domain;
                var script_url = domain + url[i] + suffix;
                console.log('load js script_url', script_url);
                try {
                    var exe = includeHtml(script_url, cfg.target, success, error);
                    console.log('load js ', script_url, exe);
                } catch (err) {
                    console.error('!load js ', script_url, err);
                }
            }
        } else {
            var domain = self.getEnv(url).domain;
            var script_url = domain + url + suffix;
            includeHtml(script_url, cfg.target, success, error);
            // console.error('apiunit obj: is not object:', obj);
        }
        return this;
    };


    this.image = function (url) {
        if (typeof cfg.delay === 'number' && cfg.delay > 1) {
            setTimeout(function () {
                    console.log('image delayed', cfg.delay, url);
                    self.loadImage(url, cfg.target, self.success, self.error);
                },
                cfg.delay
            );
        } else {
            console.log('image loaded', url, cfg.delay);
            self.loadImage(url, cfg.target, self.success, self.error);
        }
        return this;
    };

    this.loadImage = function (url, target, success, error) {
        if (typeof url === 'object') {
            //console.log('obj:', obj);

            for (var i in url) {

                console.log('load js url[i]', url[i]);

                try {
                    var exe = includeImage(url[i], target, success, error);
                    console.log('load js ', url[i], exe);
                } catch (err) {
                    console.error('!load js ', url[i], err);
                }
            }
        } else {
            includeImage(url, cfg.target, success, error);
            // console.error('apiunit obj: is not object:', obj);
        }
        return this;
    };

    this.img = this.image;

    return this;
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
    if (isEmpty(target)) {
        console.log('HEAD');
        target = document.getElementsByTagName('head')[0];
        if (isEmpty(target)) {
            console.log('BODY');
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
    // console.log(target, target == null);
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


function includeHtml(url, target, success, error) {
    var xhttp;

    var el = new E(target);
    var elmnt = el.first();

    if (typeof success !== 'function') {
        success = function () {
            console.log('includeHtml success', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            console.log('includeHtml error', "Page not found.");
        }
    }
    console.log('includeHtml url', url);

    if (url) {
        /* Make an HTTP request using the attribute value as the url name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            console.log('includeHtml el_id', target);

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

function includeImage(url, target) {
    console.log('includeImg url: ', url);
    var el = new E(target);
    var elmnt = el.first();

    let img = new Image;
    img.onload = function () {
        console.log("includeImg onload: ", url);
        elmnt.appendChild(img);
    };

    return img.src = url;  // erst nach dem Event Listener!

}


var time = Date.now || function () {
    return +new Date;
};


var E = function (selector, area, error, success) {
    var cfg = {};
    cfg.area = document;
    cfg.selector = selector;
    cfg.exist = false;

    this.success = function (elem) {
        console.log("Element elem: ", elem);
    };

    this.error = function (elem) {
        console.error("! Element elem: ", elem);
    };

    if (typeof success === 'function') {
        this.success = success;
    }

    if (typeof error === 'function') {
        this.error = error;
    }


    var self = this;

    this.selector = function (selector) {
        cfg.selector = selector;
        return this;
    }

    this.first = function (error, success) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }

        const elem = document.querySelector(cfg.selector);

        console.log('E first cfg.selector', cfg.selector);
        console.log('E first elem', elem);

        if (elem !== null) {
            cfg.exist = true;
            success(elem);
            return elem;
        } else {
            cfg.exist = false;
            error();
        }

        return elem;
    }

    this.all = function (error, success) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }

        const elem = document.querySelectorAll(cfg.selector);

        console.log('E all cfg.selector', cfg.selector);
        console.log('E all elem', elem);

        if (elem !== null) {
            cfg.exist = true;
            success(elem);
        } else {
            cfg.exist = false;
            error(elem);
        }

        return elem;
    }
};

var hasDomain = function (url) {
    return url.indexOf('//') === 0 || url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
}
