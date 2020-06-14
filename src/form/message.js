// message.js
/**
 *
 * @param class
 * @constructor
 */
var Message = function (selector, error, success) {

    this.selector = selector || 'body';
    this.message = '';
    this.error = error;
    this.success = success;

    var self = this;


    // this.getMessage = function () {
    //     if (typeof cfg.message !== 'string') {
    //         cfg.message = 'Message is empty!';
    //     }
    //     return cfg.message;
    // }

    this.add = function (message) {
        console.log(message);

        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(message);         // Create a text node
        node.appendChild(textnode);

        try {
            console.log('self.selector', self.selector, getTarget(self.selector));
            getTarget(self.selector).appendChild(node);
            // success(selector, message);
        } catch (e) {
            // error(err);
            console.error(e);
            console.error('handle element not exist for message');
        }

    }

    return self;
}
