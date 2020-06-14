// rest-form.js
if (typeof RESTFORM_DEBUG === 'undefined') {
    var RESTFORM_DEBUG = true;
}
/**
 *
 * @param target
 * @param response
 * @param error
 * @param success
 * @returns {RestForm}
 * @constructor
 */
var RestForm = function (target, response, error, success) {

    this.cfg = {};
    this.cfg.target = target;
    this.cfg.method = "GET";
    this.cfg.url = "";
    this.cfg.event = "submit";

    // this.cfg.event = "submit";

    // var elmnt = el.first();

    var self = this;

    self.url = function (url) {
        self.cfg.url = url;
        return self;
    }

    self.cfg = function (cfg) {
        if (typeof cfg === 'undefined') {
            return self;
        }
        if (typeof cfg.target === 'string') {
            self.cfg.target = cfg.target;
        }
        if (typeof cfg.method === 'string') {
            self.cfg.method = cfg.method;
        }
        if (typeof cfg.url === 'string') {
            self.cfg.url = cfg.url;
        }
        if (typeof cfg.event === 'string') {
            self.cfg.event = cfg.event;
        }
        return self;
    }

    self.target = function (target) {
        self.cfg.target = target;
        return self;
    }

    self.submit = function () {

        self.cfg.element = new E(self.cfg.target);
        !RESTFORM_DEBUG || console.log('.submit() self.cfg.target', self.cfg.target);
        !RESTFORM_DEBUG || console.log('.submit() self.cfg.event', self.cfg.event);

        self.cfg.element.all('', function (forms) {

            var rest_form = new Rest(self.cfg.url, '?', response, error, success);

            // var forms = element.getElementsByTagName('form');
            // var forms = element.getElementsByTagName('form');

            for (var i = 0; i < forms.length; i++) {

                var form = forms[i];
                //formEvent(forms[i], rest_form, error, success);
                form.addEventListener(self.cfg.event, function (event) {
                    event.preventDefault();

                    !RESTFORM_DEBUG || console.log(this);

                    var data = formToObject(this);
                    var method = data.method;

                    delete data.method;
                    delete data.submit;

                    !RESTFORM_DEBUG || console.log(method);

                    rest_form.byMethod(method, data);
                    !RESTFORM_DEBUG || console.log(data);

                    success(event);


                });
            }
        });
        // cfg.url;
        // cfg.method;
    }

    return self;
}
