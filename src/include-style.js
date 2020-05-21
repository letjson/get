function includeStyle(src, target) {
    if (typeof target === 'undefined') {
        // target = document.body;
        target = document.getElementsByTagName('head')[0];
    }

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = src;
    target.appendChild(link);
}
