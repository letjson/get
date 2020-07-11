// jloads.js
jlogs('exist?', 'jloads');
/**
 *
 * @param selector
 * @param area
 * @param error
 * @param success
 * @returns {E}
 * @constructor
 */
var jloads = function (selector, area, error, success) {

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


    self.all = function (error, success) {
        if (typeof success !== 'function') {
            success = self.success;
        }
        if (typeof error !== 'function') {
            error = self.error;
        }

        const elem = document.querySelectorAll(self.cfg.selector);

        jlogs(this.constructor.name, ' all self.cfg.selector ', self.cfg.selector);
        jlogs(this.constructor.name, ' all elem ', elem);

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
