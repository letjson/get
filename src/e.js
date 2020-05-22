// e.js
if (typeof E_DEBUG === 'undefined') {
    var E_DEBUG = true;
}
if (typeof log !== 'function') {
    var log = console.log;
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
        !E_DEBUG || log("Element func success(): ", elem);
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

        !E_DEBUG || log('E first self.cfg.selector', self.cfg.selector);
        !E_DEBUG || log('E first elem', elem);

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

        !E_DEBUG || log('E all self.cfg.selector', self.cfg.selector);
        !E_DEBUG || log('E all elem', elem);

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
