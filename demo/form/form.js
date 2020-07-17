/**
 *
 * @param text
 * @constructor
 */
function AddMessage(text) {
    var message = new Message('#messages');
    message.add(text);
}

var response = function (xhr) {
    console.log("xhr", xhr);
    // console.log("b", b);
    // console.log("c", c);
    // alert("OK RESPONSE");
    AddMessage(xhr.status);
    AddMessage(xhr.statusText);
    AddMessage(xhr.response);
}

var success = function (data) {
    console.table('FORM success', data);
};

var error = function (data) {
    console.error('!FORM', data);
}
