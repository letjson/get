//time.js
jlogs('exist?','time');

var time = Date.now || function () {
    return +new Date;
};
