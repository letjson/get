// message.js
/**
 *
 * @param class
 * @constructor
 */
var Message = function (cfg) {
    // this.selector = selector;
    // if (typeof this.selector !== 'string') {
    //     console.error("is emptz selector for message");
    // }

    // RESET if not exist
    if (typeof cfg !== 'object') {
        var cfg = {};
        cfg.class = 'home-messages';
        cfg.id = 'home-messages';
        cfg.element = {};
        cfg.message = '';
    }


    this.getClassname = function () {
        if (typeof cfg.class !== 'string') {
            cfg.class = 'home-messages';
        }
        return cfg.class;
    }


    this.getElement = function () {
        if(self.getClassname()){
            cfg.element = document.getElementsByClassName(self.getClassname())
        }
        return cfg.element;
    }

    var self = this;


    this.getMessage = function () {
        if (typeof cfg.message !== 'string') {
            cfg.message = 'Message is empty!';
        }
        return cfg.message;
    }

    this.add = function (message) {
        console.log(message);

        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(message);         // Create a text node
        node.appendChild(textnode);

        if (self.getElement()) {
            self.getElement()[0].appendChild(node);
        } else {
            console.error('handle element not exist for message');
        }

    }

    return self;
}
