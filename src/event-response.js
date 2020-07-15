// event-response.js

/**
 *
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 * @constructor
 */
jlogs('exist?', 'eventResponse');
if (typeof eventResponse !== 'function') eventResponse = function (selector, event, response) {
    const f = 'jloadsEvent eventResponse';
    jlogs(f, ' selector ', selector);
    jlogs(f, ' event ', event);

    var success = function (data) {
        console.table('FORM success', data);
    };
    var error = function (data) {
        console.error('!FORM', data);
    }


    var form = new RestForm(selector, response, error, success);

    form.cfg({
        "target": selector,
        "url": "//api.paas.info/index.php",
        "method": "GET",
        "event": "submit"
    });

    form.url((window.location.hostname === 'localhost') ? "//localhost:8000/index.php" : "//php.jloads.com/index.php");

    form.submit();
}
