// e.js
if (typeof log !== 'function') {
    const log = console.log;
}

if (typeof warning !== 'function') {
    var warning = console.error;
}
/**
 *
 * @param selector
 * @param area
 * @param error
 * @param success
 * @returns {E}
 * @constructor
 */
var E = function (selector, area, error, success) {



    this.cfg = {};
    this.cfg.area = document;
    this.cfg.selector = selector;
    this.cfg.exist = false;


    this.success = function (elem) {
        log(this.constructor.name, " Element func success(): ", elem);
    };

    this.error = function (elem) {
        warning(this.constructor.name, "! Element func error(): ", elem);
    };

    if (typeof this.cfg.selector !== 'string') {
        warning(this.constructor.name, "! Element selector: ", elem);
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

        log(this.constructor.name, ' first self.cfg.selector ', self.cfg.selector);
        log(this.constructor.name, ' first elem ', elem);

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

        log(this.constructor.name, ' all self.cfg.selector ', self.cfg.selector);
        log(this.constructor.name, ' all elem ', elem);

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
